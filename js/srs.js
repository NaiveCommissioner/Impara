// Spaced repetition scheduler: an SM-2 variant with short learning steps,
// the same shape Anki users will recognise.
//
// Ratings: 0 Again · 1 Hard · 2 Good · 3 Easy

export const AGAIN = 0;
export const HARD = 1;
export const GOOD = 2;
export const EASY = 3;

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

const CONFIG = {
  learnSteps: [1 * MINUTE, 10 * MINUTE],
  relearnSteps: [10 * MINUTE],
  graduatingInterval: 1,   // days, after finishing the learning steps
  easyInterval: 4,         // days, when a new card is rated Easy
  startingEase: 2.5,
  minEase: 1.3,
  hardFactor: 1.2,
  easyBonus: 1.3,
  lapseFactor: 0.4,        // how much of the old interval survives a lapse
  maxInterval: 365,
  fuzz: 0.05,
};

export function newCard(id) {
  return {
    id,
    state: 'new',
    step: 0,
    ease: CONFIG.startingEase,
    interval: 0,   // days
    due: 0,
    reps: 0,
    lapses: 0,
    seen: null,
  };
}

function fuzzed(days) {
  if (days < 2.5) return days;
  const spread = days * CONFIG.fuzz;
  return days + (Math.random() * 2 - 1) * spread;
}

function capped(days) {
  return Math.min(CONFIG.maxInterval, Math.max(1, days));
}

/**
 * Apply a rating and return the updated card state (a new object).
 */
export function applyRating(card, rating, now = Date.now()) {
  const c = { ...card };
  c.reps += 1;
  c.seen = now;

  const learning = c.state === 'new' || c.state === 'learning' || c.state === 'relearn';

  if (learning) {
    const steps = c.state === 'relearn' ? CONFIG.relearnSteps : CONFIG.learnSteps;

    if (rating === AGAIN) {
      c.state = c.state === 'relearn' ? 'relearn' : 'learning';
      c.step = 0;
      c.due = now + steps[0];
      return c;
    }

    if (rating === HARD) {
      c.state = c.state === 'relearn' ? 'relearn' : 'learning';
      c.due = now + steps[Math.min(c.step, steps.length - 1)];
      return c;
    }

    if (rating === EASY) {
      // A relearning card keeps the (already reduced) interval it had; a brand
      // new card jumps straight past the ladder.
      const interval = card.state === 'relearn'
        ? capped(Math.max(c.interval, 2))
        : CONFIG.easyInterval;
      c.state = 'review';
      c.step = 0;
      c.interval = interval;
      c.due = now + interval * DAY;
      return c;
    }

    // GOOD: advance a step, graduating off the end of the ladder.
    const next = c.step + 1;
    if (next < steps.length) {
      c.state = c.state === 'relearn' ? 'relearn' : 'learning';
      c.step = next;
      c.due = now + steps[next];
      return c;
    }
    const graduated = card.state === 'relearn'
      ? capped(c.interval || 1)   // the lapse already shortened it
      : CONFIG.graduatingInterval;
    c.state = 'review';
    c.step = 0;
    c.interval = graduated;
    c.due = now + graduated * DAY;
    return c;
  }

  // --- a card in the review pile ---
  if (rating === AGAIN) {
    c.lapses += 1;
    c.ease = Math.max(CONFIG.minEase, c.ease - 0.2);
    c.interval = capped(Math.round(c.interval * CONFIG.lapseFactor));
    c.state = 'relearn';
    c.step = 0;
    c.due = now + CONFIG.relearnSteps[0];
    return c;
  }

  let interval;
  if (rating === HARD) {
    c.ease = Math.max(CONFIG.minEase, c.ease - 0.15);
    interval = c.interval * CONFIG.hardFactor;
  } else if (rating === GOOD) {
    interval = c.interval * c.ease;
  } else {
    c.ease += 0.15;
    interval = c.interval * c.ease * CONFIG.easyBonus;
  }

  c.interval = capped(Math.round(fuzzed(Math.max(interval, c.interval + 1))));
  c.due = now + c.interval * DAY;
  return c;
}

/** What each button will do, for the labels under the answer buttons. */
export function previewIntervals(card, now = Date.now()) {
  return [AGAIN, HARD, GOOD, EASY].map((r) => {
    const next = applyRating(card, r, now);
    return formatDelay(next.due - now);
  });
}

export function formatDelay(ms) {
  const mins = ms / MINUTE;
  if (mins < 1) return '<1 min';
  if (mins < 60) return `${Math.round(mins)} min`;
  const hours = mins / 60;
  if (hours < 24) return `${Math.round(hours)} h`;
  const days = hours / 24;
  if (days < 31) return `${Math.round(days)} d`;
  const months = days / 30.4;
  if (months < 12) return `${months.toFixed(months < 2 ? 1 : 0)} mo`;
  return `${(days / 365).toFixed(1)} y`;
}

export function isDue(card, now = Date.now()) {
  return card.state !== 'new' && card.due <= now;
}

/** True once a card has a real interval behind it — used for the "known" count. */
export function isMature(card) {
  return card.state === 'review' && card.interval >= 21;
}
