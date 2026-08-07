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

// How many new cards may be "in flight" at once — introduced by a teaching pass
// but not yet answered as a real question. Without a cap, a first session is a
// wall of "Got it" clicks: every new card is taught, and only when the last one
// is done do the 10-minute steps start bringing them back as tests. Holding the
// rest in reserve turns that into teach → test → teach → test.
const MAX_IN_FLIGHT = 3;

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
    // Only the first few new cards go into the queue; the rest wait their turn
    // and are released one at a time as the ones ahead of them are tested. The
    // day's allowance is unchanged — reserved cards are still this session's.
    this.reserve = fresh.slice(MAX_IN_FLIGHT).map((c) => c.id);
    this.inFlight = new Set();  // taught this sitting, first test still to come
    this.queue = this._mix(shuffle(due), fresh.slice(0, MAX_IN_FLIGHT), fresh.length);
    this.learning = [];        // [{id, due}]
    this.startedAt = now;
    this.answered = 0;
    this.correct = 0;
    this.initialCount = this.queue.length + this.reserve.length;
  }

  /**
   * Spread the new cards evenly through the shuffled reviews. `spreadOver` is
   * how many new cards the spacing is meant for, which is more than are being
   * placed when the rest are still in reserve: the ones held back keep their
   * slots warm rather than leaving the first few stranded far apart.
   */
  _mix(reviews, fresh, spreadOver = fresh.length) {
    if (!fresh.length) return reviews.map((c) => c.id);
    if (!reviews.length) return fresh.map((c) => c.id);
    const out = [];
    const gap = reviews.length / spreadOver;
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

  /**
   * Let the next reserved new card into the queue, spaced through whatever
   * reviews are still waiting. With nothing else queued it goes straight to the
   * front, which is exactly the teach → test alternation we're after.
   */
  _release() {
    if (!this.reserve.length) return;
    const id = this.reserve.shift();
    const spaced = Math.floor(this.queue.length / (this.reserve.length + 1));
    // …but never ahead of a new card still waiting to be taught: pickNew handed
    // these over in an order that keeps produce behind recognise, and listening
    // behind produce, and that order has to survive the wait in reserve.
    let after = 0;
    this.queue.forEach((qid, i) => { if (this.newIds.has(qid)) after = i + 1; });
    this.queue.splice(Math.max(after, spaced), 0, id);
  }

  remaining() {
    return this.queue.length + this.learning.length + this.reserve.length;
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

    // A card with no stored state is being taught, not tested — that's what the
    // study screen shows for it — so this answer puts it in flight. Any later
    // answer is a real question: get it right and it frees its slot.
    if (isNew) this.inFlight.add(id);
    else if (this.inFlight.has(id) && rating > 0) {
      this.inFlight.delete(id);
      this._release();
    }

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
    // Burying a new card gives up its slot, or the reserve would never move.
    if (this.newIds.has(id)) {
      this.inFlight.delete(id);
      this._release();
    }
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
