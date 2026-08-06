// Persistence. Everything lives in one localStorage blob: settings, per-card
// scheduling state, and a day-by-day history used for the streak and charts.

const KEY = 'italianlearner.v1';

export const PACE_PRESETS = {
  gentle: { label: 'Gentle', newPerDay: 5, maxReviews: 60, blurb: '≈5 min a day' },
  steady: { label: 'Steady', newPerDay: 10, maxReviews: 120, blurb: '≈10–15 min a day' },
  intense: { label: 'Intense', newPerDay: 20, maxReviews: 200, blurb: '≈25–30 min a day' },
};

const DEFAULTS = {
  settings: {
    pace: 'steady',
    newPerDay: 10,
    maxReviews: 120,
    units: null,        // null = all units active
    tenses: ['presente'],
    verbTiers: [1, 2],
    lessons: null,      // null = all lessons active
    dialogues: null,    // null = all conversations active
    listening: true,    // audio-only cards; needs an Italian voice to be usable
    lessonsPerDay: 1,   // long-form lessons surfaced per day; 0 turns them off
    audio: true,
    strictAccents: false,
    dayRollover: 4,     // a "day" starts at 4am, so a late session still counts as today
  },
  cards: {},
  history: {},
  lessons: {},        // { lessonId: timestamp read }
  createdAt: null,
};

let state = null;

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

export function load() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? JSON.parse(raw) : null;
  } catch {
    state = null;
  }
  if (!state) {
    state = clone(DEFAULTS);
    state.createdAt = Date.now();
  }
  // Fill in any setting added after this save was written.
  state.settings = { ...clone(DEFAULTS.settings), ...(state.settings || {}) };
  state.cards = state.cards || {};
  state.history = state.history || {};
  state.lessons = state.lessons || {};
  return state;
}

let saveTimer = null;
export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save progress:', e);
    }
  }, 150);
}

export function saveNow() {
  clearTimeout(saveTimer);
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

export function settings() {
  return load().settings;
}

export function updateSettings(patch) {
  Object.assign(load().settings, patch);
  save();
}

export function cardState(id) {
  return load().cards[id] || null;
}

export function putCardState(id, s) {
  load().cards[id] = s;
  save();
}

export function allCardStates() {
  return load().cards;
}

// ---- days ----------------------------------------------------------------

/**
 * Format a Date as YYYY-MM-DD in *local* time.
 *
 * Not `toISOString()`: that converts to UTC, and east of Greenwich it reports
 * yesterday's date for most of the morning. The rollover arithmetic below is
 * done in local hours, so the formatting has to be local too.
 */
export function localDayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** The "learning day" a timestamp belongs to, honouring the rollover hour. */
export function dayKey(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(d.getHours() - settings().dayRollover);
  return localDayKey(d);
}

export function today() {
  const h = load().history;
  const k = dayKey();
  if (!h[k]) h[k] = { new: 0, reviews: 0, correct: 0, again: 0 };
  return h[k];
}

export function recordAnswer({ isNew, rating }) {
  const t = today();
  if (isNew) t.new += 1;
  else t.reviews += 1;
  if (rating === 0) t.again += 1;
  else t.correct += 1;
  save();
}

export function history() {
  return load().history;
}

// ---- long-form lessons ---------------------------------------------------

export function lessonsRead() {
  return load().lessons;
}

export function markLessonRead(id) {
  const lessons = load().lessons;
  if (!lessons[id]) lessons[id] = Date.now();
  save();
}

export function unmarkLessonRead(id) {
  delete load().lessons[id];
  save();
}

/** How many lessons were read on today's learning day. */
export function lessonsReadToday() {
  const today = dayKey();
  return Object.values(load().lessons).filter((ts) => dayKey(ts) === today).length;
}

/** Consecutive days with at least one answer, counting back from today. */
export function streak() {
  const h = load().history;
  let n = 0;
  const d = new Date();
  d.setHours(d.getHours() - settings().dayRollover);
  for (;;) {
    const k = localDayKey(d);
    const day = h[k];
    const active = day && day.new + day.reviews > 0;
    if (!active) {
      // Today not being done yet shouldn't break a streak earned yesterday.
      if (n === 0 && k === dayKey()) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// ---- import / export / reset --------------------------------------------

export function exportJSON() {
  return JSON.stringify(load(), null, 2);
}

export function importJSON(text) {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object' || !('cards' in parsed)) {
    throw new Error('That file does not look like an Italian Learner backup.');
  }
  state = parsed;
  state.settings = { ...clone(DEFAULTS.settings), ...(state.settings || {}) };
  state.cards = state.cards || {};
  state.history = state.history || {};
  state.lessons = state.lessons || {};
  saveNow();
}

export function resetProgress() {
  const keep = clone(load().settings);
  state = clone(DEFAULTS);
  state.settings = keep;
  state.lessons = {};
  state.createdAt = Date.now();
  saveNow();
}
