// The lessons screen: a list of everything, and a reader for one lesson.

import { LESSONS_LONG, findLesson } from '../../data/lessons.js';
import { LESSONS as GRAMMAR } from '../../data/grammar.js';
import { lessonList, lessonStatus } from '../lessons.js';
import { markLessonRead, unmarkLessonRead } from '../store.js';
import { speak, speakerButton } from '../audio.js';
import { glossSentence } from '../gloss.js';
import { mount, $, delegate, escapeHtml } from './dom.js';

export function render(params) {
  const id = params && params.get ? params.get('id') : null;
  if (id && findLesson(id)) renderReader(findLesson(id));
  else renderIndex();
}

// ---- index ---------------------------------------------------------------

function renderIndex() {
  const status = lessonStatus();
  const rows = lessonList();
  const pct = Math.round((status.totalRead / status.total) * 100);

  mount(`
    <section class="lessons" id="lessons">
      <h2>Lessons</h2>
      <p class="panel-sub">The explanations behind the drills — one at a time, in order.</p>

      <div class="panel">
        <div class="bar">
          <div class="bar-known" style="width:${pct}%"></div>
        </div>
        <p class="panel-foot">${status.totalRead} of ${status.total} read${
          status.finished
            ? ' — that’s all of them.'
            : status.enabled
              ? status.remainingToday
                ? ` · ${status.remainingToday} ready today`
                : ' · next one tomorrow'
              : ' · daily lessons are switched off'}</p>
      </div>

      <div class="lesson-list">
        ${rows.map(({ lesson, index, read, due }) => `
          <a class="lesson-row ${read ? 'is-read' : ''} ${due ? 'is-due' : ''}"
             href="#/lessons?id=${lesson.id}">
            <span class="lesson-num">${read ? '✓' : index}</span>
            <span class="lesson-meta">
              <b>${escapeHtml(lesson.title)}</b>
              <em>${escapeHtml(lesson.subtitle)}</em>
            </span>
            <span class="lesson-time">${lesson.minutes} min${due ? ' · today' : ''}</span>
          </a>`).join('')}
      </div>
    </section>
  `);
}

// ---- reader --------------------------------------------------------------

function exampleHtml(ex) {
  const words = glossSentence(ex.it);
  const gloss = words.some((w) => w.gloss)
    ? `<div class="gloss">${words.map((w) => `
        <span class="gw${w.english ? ' gw-en' : ''}">
          <b>${escapeHtml(w.word)}</b><em>${w.gloss ? escapeHtml(w.gloss) : ''}</em>
        </span>`).join('')}</div>`
    : '';
  return `<div class="l-example">
      <span class="it">${escapeHtml(ex.it)} ${speakerButton(ex.it)}</span>
      <span class="en">${escapeHtml(ex.en)}</span>
      ${ex.note ? `<span class="note">${escapeHtml(ex.note)}</span>` : ''}
      ${gloss}
    </div>`;
}

function tableHtml(t) {
  return `<div class="l-table-wrap"><table class="g-table">
      <tr>${t.head.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
      ${t.rows.map((r) => `<tr>${r.map((c, i) => (i === 0
        ? `<th>${escapeHtml(c)}</th>`
        : `<td>${escapeHtml(c)}</td>`)).join('')}</tr>`).join('')}
    </table></div>`;
}

function renderReader(lesson) {
  const rows = lessonList();
  const here = rows.findIndex((r) => r.lesson.id === lesson.id);
  const prev = here > 0 ? rows[here - 1].lesson : null;
  const next = here < rows.length - 1 ? rows[here + 1].lesson : null;
  const alreadyRead = rows[here].read;
  const drill = lesson.practise ? GRAMMAR.find((g) => g.id === lesson.practise) : null;

  mount(`
    <section class="lesson-reader" id="reader">
      <a class="ghost back" href="#/lessons">← All lessons</a>

      <header class="l-head">
        <p class="l-kicker">Lesson ${here + 1} of ${rows.length} · ${lesson.minutes} min read</p>
        <h2>${escapeHtml(lesson.title)}</h2>
        <p class="l-sub">${escapeHtml(lesson.subtitle)}</p>
      </header>

      ${lesson.sections.map((s) => `
        <section class="l-section">
          <h3>${escapeHtml(s.h)}</h3>
          ${s.p || ''}
          ${s.table ? tableHtml(s.table) : ''}
          ${(s.examples || []).map(exampleHtml).join('')}
        </section>`).join('')}

      ${lesson.watchOut ? `
        <aside class="watch-out">
          <b>Watch out</b>
          <p>${lesson.watchOut}</p>
        </aside>` : ''}

      ${lesson.keyPoints ? `
        <aside class="key-points">
          <b>In short</b>
          <ul>${lesson.keyPoints.map((k) => `<li>${escapeHtml(k)}</li>`).join('')}</ul>
        </aside>` : ''}

      <div class="l-actions">
        <button class="primary" data-act="done">
          ${alreadyRead ? 'Read again — mark done' : 'Mark as read'}
        </button>
        ${alreadyRead ? '<button class="button" data-act="unread">Mark unread</button>' : ''}
        ${drill ? `<a class="button" href="#/browse">Drill: ${escapeHtml(drill.title)}</a>` : ''}
      </div>

      <nav class="l-nav">
        ${prev ? `<a class="button" href="#/lessons?id=${prev.id}">← ${escapeHtml(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="button" href="#/lessons?id=${next.id}">${escapeHtml(next.title)} →</a>` : '<span></span>'}
      </nav>
    </section>
  `);

  const root = $('#reader');
  delegate(root, '[data-speak]', 'click', (e, t) => speak(t.dataset.speak, { force: true }));
  delegate(root, '[data-act="done"]', 'click', () => {
    markLessonRead(lesson.id);
    location.hash = next ? `#/lessons?id=${next.id}` : '#/lessons';
  });
  delegate(root, '[data-act="unread"]', 'click', () => {
    unmarkLessonRead(lesson.id);
    render(new URLSearchParams(`id=${lesson.id}`));
  });
}
