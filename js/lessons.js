// Pacing for the long-form lessons.
//
// The interval is a *recommendation*, not a lock. Reading is not the kind of
// thing that benefits from being forbidden — if you want to read four lessons
// on a rainy afternoon you should be able to. What the setting controls is how
// many are surfaced as "today's", which is what actually drives the habit.

import { LESSONS_LONG } from '../data/lessons.js';
import { settings, lessonsRead, lessonsReadToday } from './store.js';

export function lessonStatus() {
  const perDay = settings().lessonsPerDay;
  const read = lessonsRead();
  const unread = LESSONS_LONG.filter((l) => !read[l.id]);
  const readToday = lessonsReadToday();
  const remainingToday = Math.max(0, perDay - readToday);

  return {
    enabled: perDay > 0,
    perDay,
    total: LESSONS_LONG.length,
    totalRead: LESSONS_LONG.length - unread.length,
    unread,
    readToday,
    remainingToday,
    // What to put in front of you right now.
    dueToday: perDay > 0 ? unread.slice(0, remainingToday) : [],
    nextUp: unread[0] || null,
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
