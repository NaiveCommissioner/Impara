// Pacing for the long-form lessons.
//
// The interval is a *recommendation*, not a lock. Reading is not the kind of
// thing that benefits from being forbidden — if you want to read four lessons
// on a rainy afternoon you should be able to. What the setting controls is how
// many are surfaced as "today's", which is what actually drives the habit.
//
// The other half of the pacing is relevance. A flat one-a-day counter empties
// the section in a few weeks while the deck itself runs for months, and it
// hands you the piacere lesson on day fourteen whether or not you have met a
// single piacere card. So a lesson that drills a grammar id waits until at
// least one card from that id has been introduced. Lessons with nothing to
// drill — pronunciation, tu/Lei, ci/ne — keep the plain calendar behaviour.

import { LESSONS_LONG } from '../data/lessons.js';
import { settings, lessonsRead, lessonsReadToday, allCardStates } from './store.js';
import { activeCards } from './cards.js';

/**
 * Which grammar ids the learner has already met a card from, and which ones
 * the current settings have switched off entirely.
 *
 * The second set matters as much as the first: a requirement pointing at cards
 * that aren't in the deck can never be satisfied, so — exactly as pickNew()
 * does with its card prerequisites — we ignore it rather than let a switched-off
 * drill silently retire a third of the reading list.
 */
function grammarReach() {
  const started = new Set();
  for (const id of Object.keys(allCardStates())) {
    if (id.startsWith('g:')) started.add(id.split(':')[1]);
  }
  const active = new Set();
  for (const card of activeCards(settings())) {
    if (card.kind === 'grammar') active.add(card.group);
  }
  return { started, active };
}

/** Has the learner reached the material this lesson is about? */
function eligible(lesson, reach) {
  if (!lesson.practise) return true;
  if (!reach.active.has(lesson.practise)) return true;
  return reach.started.has(lesson.practise);
}

export function lessonStatus() {
  const perDay = settings().lessonsPerDay;
  const read = lessonsRead();
  const unread = LESSONS_LONG.filter((l) => !read[l.id]);
  const readToday = lessonsReadToday();
  const remainingToday = Math.max(0, perDay - readToday);

  // Still in curriculum order — eligibility filters the queue, it doesn't
  // reshuffle it.
  const reach = grammarReach();
  const ready = unread.filter((l) => eligible(l, reach));

  return {
    enabled: perDay > 0,
    perDay,
    total: LESSONS_LONG.length,
    totalRead: LESSONS_LONG.length - unread.length,
    unread,
    // Unread, but waiting on material you haven't reached yet. Readable
    // whenever you like; just not offered as today's.
    waiting: unread.length - ready.length,
    readToday,
    remainingToday,
    // What to put in front of you right now.
    dueToday: perDay > 0 ? ready.slice(0, remainingToday) : [],
    nextUp: ready[0] || unread[0] || null,
    finished: unread.length === 0,
  };
}

/** Lessons in order, each tagged with how it should be displayed. */
export function lessonList() {
  const read = lessonsRead();
  const status = lessonStatus();
  const dueIds = new Set(status.dueToday.map((l) => l.id));
  return LESSONS_LONG.map((lesson, i) => ({
    lesson,
    index: i + 1,
    read: !!read[lesson.id],
    readAt: read[lesson.id] || null,
    due: dueIds.has(lesson.id),
  }));
}
