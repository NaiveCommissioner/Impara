// Home: what's waiting today, and one button that starts it.

import { overview } from '../session.js';
import { lessonStatus } from '../lessons.js';
import { streak, settings, updateSettings, PACE_PRESETS } from '../store.js';
import { mount, $, delegate, escapeHtml } from './dom.js';

/** "in 3 hours", "tomorrow", "in 4 days" — for the next-due note. */
function relative(ts) {
  const mins = (ts - Date.now()) / 60000;
  if (mins < 60) return `in ${Math.max(1, Math.round(mins))} min`;
  if (mins < 20 * 60) return `in ${Math.round(mins / 60)} hour${Math.round(mins / 60) === 1 ? '' : 's'}`;
  const days = Math.round(mins / (60 * 24));
  if (days <= 1) return 'tomorrow';
  return `in ${days} days`;
}

/**
 * Today's reading, surfaced above the fold. Silent when lessons are switched
 * off, already done for today, or finished entirely — there's no value in a
 * panel that only ever says "nothing".
 */
function lessonPanel() {
  const s = lessonStatus();
  if (!s.enabled || s.finished) return '';

  if (s.dueToday.length) {
    const lesson = s.dueToday[0];
    return `
      <a class="panel lesson-today" href="#/lessons?id=${lesson.id}">
        <span class="tag tag-learn">Today’s lesson</span>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p class="panel-sub">${escapeHtml(lesson.subtitle)}</p>
        <p class="panel-foot">${lesson.minutes} min read${
          s.dueToday.length > 1 ? ` · ${s.dueToday.length} ready today` : ''} →</p>
      </a>`;
  }

  // Nothing due can mean two different things, and saying the wrong one is
  // worse than saying nothing: either you've done today's reading, or the
  // lessons still ahead are waiting on drills you haven't reached yet.
  if (!s.readToday && s.waiting) {
    return `
      <div class="panel lesson-done">
        <p class="panel-sub">No lesson today — the ones left explain material you haven’t
          reached yet, and they’ll appear as you get there.
          <a href="#/lessons">Read ahead</a> if you’d rather not wait.</p>
      </div>`;
  }

  return `
    <div class="panel lesson-done">
      <p class="panel-sub">Today’s lesson is done — ${s.totalRead} of ${s.total} read.
        <a href="#/lessons">Read ahead</a> if you like.</p>
    </div>`;
}

/**
 * Why today is offering fewer new cards than the pace promises. Nothing at all
 * on an ordinary day — but a bare "0 new" after a week away looks like a bug,
 * and a learner who thinks the app is broken doesn't come back to find out.
 */
function backlogNote(o) {
  if (!o.newHeldBack) return '';
  const reviews = `${o.backlog} review${o.backlog === 1 ? '' : 's'}`;
  return o.newPaused
    ? `<p class="hero-note hero-note-held">New cards are paused — ${reviews} to clear first.
       Work the pile down and they start again on their own; there's nothing to change.</p>`
    : `<p class="hero-note hero-note-held">Going easy on new cards while you catch up:
       ${o.newToday} today instead of ${o.newIfCaughtUp}, with ${reviews} waiting.
       Full pace comes back on its own.</p>`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buongiorno';
  if (h < 18) return 'Buon pomeriggio';
  return 'Buonasera';
}

export function render() {
  const o = overview();
  const s = settings();
  const days = streak();
  const waiting = o.newToday + o.reviewsToday;
  const pct = o.total ? Math.round(((o.known + o.inProgress) / o.total) * 100) : 0;

  mount(`
    <section class="home" id="home">
      <div class="hero">
        <p class="hero-greet">${greeting()}.</p>
        <h2 class="hero-line">${waiting
          ? `${waiting} card${waiting === 1 ? '' : 's'} ready for you.`
          : o.doneToday
            ? 'Today’s work is done. Bravo.'
            : 'Nothing due — study ahead if you like.'}</h2>
        <div class="hero-counts">
          <span class="pill ${o.newPaused ? 'pill-held' : 'pill-new'}">${o.newPaused
            ? 'new cards paused' : `${o.newToday} new`}</span>
          <span class="pill pill-due">${o.reviewsToday} review</span>
          ${days ? `<span class="pill pill-streak">🔥 ${days} day streak</span>` : ''}
        </div>
        <div class="hero-actions">
          <button class="primary big" data-act="${waiting ? 'study' : 'ahead'}"
            ${waiting || o.aheadAvailable ? '' : 'disabled'}>
            ${waiting ? 'Start studying' : 'Study ahead'}
          </button>
          <button class="ghost" data-act="reviews-only" ${o.reviewsToday ? '' : 'disabled'}>Reviews only</button>
        </div>
        ${backlogNote(o)}
        ${!waiting && o.aheadAvailable
          ? `<p class="hero-note">Studying ahead pulls in another ${Math.min(s.newPerDay, o.unseen)} new
             card${Math.min(s.newPerDay, o.unseen) === 1 ? '' : 's'} and anything due in the next few days.
             It doesn't disturb your schedule.</p>`
          : ''}
        ${!waiting && !o.aheadAvailable
          ? `<p class="hero-note">Nothing left to pull forward${o.nextDue
              ? ` — your next card is due ${relative(o.nextDue)}` : ''}.</p>`
          : ''}
      </div>

      ${lessonPanel()}

      <div class="grid">
        <div class="panel">
          <h3>Your pace</h3>
          <p class="panel-sub">The app never gives you more than this in a day.</p>
          <div class="pace-row">
            ${Object.entries(PACE_PRESETS).map(([k, p]) => `
              <button class="pace ${s.pace === k ? 'on' : ''}" data-act="pace" data-pace="${k}">
                <b>${p.label}</b>
                <span>${p.newPerDay} new / day</span>
                <span class="muted">${p.blurb}</span>
              </button>`).join('')}
          </div>
          ${s.pace === 'custom'
            ? `<p class="muted">Custom: ${s.newPerDay} new, up to ${s.maxReviews} reviews a day.</p>`
            : ''}
          <p class="panel-foot"><a href="#/settings">Fine-tune in settings →</a></p>
        </div>

        <div class="panel">
          <h3>Progress</h3>
          <div class="bar">
            <div class="bar-known" style="width:${o.total ? (o.known / o.total) * 100 : 0}%"></div>
            <div class="bar-progress" style="width:${o.total ? (o.inProgress / o.total) * 100 : 0}%"></div>
          </div>
          <ul class="legend">
            <li><i class="dot known"></i> ${o.known} known</li>
            <li><i class="dot progress"></i> ${o.inProgress} learning</li>
            <li><i class="dot unseen"></i> ${o.unseen} not started</li>
          </ul>
          <p class="panel-foot">${pct}% of your active deck introduced · <a href="#/progress">details →</a></p>
        </div>

        <div class="panel">
          <h3>Practise something specific</h3>
          <p class="panel-sub">Free practice — nothing is scheduled or graded.</p>
          <div class="link-row">
            <a class="button" href="#/drill">Conjugation drill</a>
            <a class="button" href="#/browse">Word &amp; grammar reference</a>
          </div>
        </div>
      </div>
    </section>
  `);

  delegate($('#home'), '[data-act]', 'click', (e, t) => {
    const act = t.dataset.act;
    if (act === 'study') location.hash = '#/study';
    else if (act === 'ahead') location.hash = '#/study?ahead=1';
    else if (act === 'reviews-only') location.hash = '#/study?new=0';
    else if (act === 'pace') {
      const preset = PACE_PRESETS[t.dataset.pace];
      updateSettings({ pace: t.dataset.pace, newPerDay: preset.newPerDay, maxReviews: preset.maxReviews });
      render();
    }
  });
}
