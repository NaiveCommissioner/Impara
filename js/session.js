// A study session: decides what to show next and writes the results back.
//
// Order of business at every step:
//   1. a learning card that has come due (short steps keep new material warm)
//   2. the pre-mixed queue of reviews with new cards spread through it
//   3. a learning card that isn't quite due yet, rather than end early

import { newCard, applyRating, previewIntervals } from './srs.js';
import * as store from './store.js';
import { activeCards, pickNew, getCard } from './cards.js';

const REQUEUE_HORIZON = 20 * 60 * 1000;

// "Study ahead" pulls forward reviews falling due inside this window, and
// grants one extra day's worth of new cards. Anything further out is left
// alone — reviewing a card weeks early just wastes the interval.
const AHEAD_HORIZON = 3 * 24 * 60 * 60 * 1000;

function shuffle(a) {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Everything the home screen needs, without building a session. */
export function overview(now = Date.now()) {
  const settings = store.settings();
  const states = store.allCardStates();
  const active = activeCards(settings);
  const t = store.today();

  let dueReviews = 0;
  let dueLearning = 0;
  let unseen = 0;
  let inProgress = 0;
  let known = 0;
  let soon = 0;              // scheduled inside the study-ahead window
  let nextDue = null;        // when the next card comes due, if none are now

  for (const c of active) {
    const s = states[c.id];
    if (!s) { unseen += 1; continue; }
    if (s.state === 'review') {
      if (s.interval >= 21) known += 1; else inProgress += 1;
      if (s.due <= now) dueReviews += 1;
    } else {
      inProgress += 1;
      if (s.due <= now) dueLearning += 1;
    }
    if (s.due > now) {
      if (s.due <= now + AHEAD_HORIZON) soon += 1;
      if (nextDue === null || s.due < nextDue) nextDue = s.due;
    }
  }

  const newAllowance = Math.max(0, settings.newPerDay - t.new);
  const reviewAllowance = Math.max(0, settings.maxReviews - t.reviews);

  return {
    total: active.length,
    unseen,
    inProgress,
    known,
    dueReviews,
    dueLearning,
    newToday: Math.min(newAllowance, unseen),
    reviewsToday: Math.min(reviewAllowance, dueReviews + dueLearning),
    doneToday: t.new + t.reviews,
    newDoneToday: t.new,
    nextDue,
    // What a "study ahead" session would actually find: a fresh batch of new
    // cards plus anything falling due in the next few days.
    aheadAvailable: Math.min(settings.newPerDay, unseen) + soon + dueReviews + dueLearning,
    settings,
  };
}

export class Session {
  /**
   * @param {{onlyKinds?: string[], includeNew?: boolean, ignoreLimits?: boolean}} opts
   */
  constructor(opts = {}) {
    const now = Date.now();
    const settings = store.settings();
    const states = store.allCardStates();
    let active = activeCards(settings);
    if (opts.onlyKinds) active = active.filter((c) => opts.onlyKinds.includes(c.kind));

    const t = store.today();
    // Studying ahead grants a fresh batch on top of whatever today already
    // used, and reaches forward for reviews that aren't due yet.
    const newAllowance = opts.ahead
      ? settings.newPerDay
      : Math.max(0, settings.newPerDay - t.new);
    const reviewAllowance = opts.ahead
      ? settings.maxReviews
      : Math.max(0, settings.maxReviews - t.reviews);
    const cutoff = opts.ahead ? now + AHEAD_HORIZON : now;

    const due = active
      .filter((c) => states[c.id] && states[c.id].due <= cutoff)
      .sort((a, b) => states[a.id].due - states[b.id].due)
      .slice(0, reviewAllowance);

    const fresh = opts.includeNew === false ? [] : pickNew(newAllowance, active, states);

    this.newIds = new Set(fresh.map((c) => c.id));
    this.queue = this._mix(shuffle(due), fresh);
    this.learning = [];        // [{id, due}]
    this.startedAt = now;
    this.answered = 0;
    this.correct = 0;
    this.initialCount = this.queue.length;
  }

  /** Spread the new cards evenly through the shuffled reviews. */
  _mix(reviews, fresh) {
    if (!fresh.length) return reviews.map((c) => c.id);
    if (!reviews.length) return fresh.map((c) => c.id);
    const out = [];
    const gap = reviews.length / fresh.length;
    let fi = 0;
    reviews.forEach((c, i) => {
      while (fi < fresh.length && fi * gap <= i) {
        out.push(fresh[fi].id);
        fi += 1;
      }
      out.push(c.id);
    });
    while (fi < fresh.length) { out.push(fresh[fi].id); fi += 1; }
    return out;
  }

  remaining() {
    return this.queue.length + this.learning.length;
  }

  /** @returns {{card, state, isNew, previews}|null} */
  peek() {
    const now = Date.now();
    this.learning.sort((a, b) => a.due - b.due);

    let id = null;
    if (this.learning.length && this.learning[0].due <= now) {
      id = this.learning[0].id;
    } else if (this.queue.length) {
      id = this.queue[0];
    } else if (this.learning.length) {
      id = this.learning[0].id;
    }
    if (!id) return null;

    const card = getCard(id);
    const state = store.cardState(id) || newCard(id);
    this.current = id;
    return {
      card,
      state,
      isNew: !store.cardState(id),
      previews: previewIntervals(state, now),
    };
  }

  answer(rating) {
    const id = this.current;
    if (!id) return;
    const now = Date.now();
    const existing = store.cardState(id);
    const isNew = !existing;
    const state = existing || newCard(id);
    const next = applyRating(state, rating, now);

    store.putCardState(id, next);
    store.recordAnswer({ isNew, rating });

    this.answered += 1;
    if (rating > 0) this.correct += 1;

    // Drop it from whichever queue it came from…
    this.queue = this.queue.filter((q) => q !== id);
    this.learning = this.learning.filter((l) => l.id !== id);
    // …and put it back if it's due again inside this sitting.
    if (next.due - now < REQUEUE_HORIZON) {
      this.learning.push({ id, due: next.due });
    }
    this.current = null;
  }

  /** Skip without scheduling — used by the "leech, bury it" action. */
  bury() {
    const id = this.current;
    this.queue = this.queue.filter((q) => q !== id);
    this.learning = this.learning.filter((l) => l.id !== id);
    this.current = null;
  }

  stats() {
    return {
      answered: this.answered,
      correct: this.correct,
      accuracy: this.answered ? Math.round((this.correct / this.answered) * 100) : 0,
      minutes: Math.max(1, Math.round((Date.now() - this.startedAt) / 60000)),
    };
  }
}
