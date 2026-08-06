// Settings: pace, what's in the deck, and your data.

import { UNITS } from '../../data/vocab.js';
import { TENSES, VERBS } from '../../data/verbs.js';
import { LESSONS } from '../../data/grammar.js';
import { DIALOGUES } from '../../data/dialogues.js';
import * as store from '../store.js';
import { available as audioAvailable } from '../audio.js';
import { mount, $, $$, delegate, escapeHtml } from './dom.js';

const TIERS = [
  { id: 1, label: 'Essential', note: 'essere, avere, fare, andare, stare + the first regulars' },
  { id: 2, label: 'Common', note: 'modals, dire, venire, uscire and everyday regulars' },
  { id: 3, label: 'Broadening', note: 'irregular participles, rimanere, scegliere, reflexives' },
];

function isOn(list, id) {
  return list === null || list.includes(id);
}

function toggleIn(list, all, id, on) {
  const current = list === null ? all.slice() : list.slice();
  const next = on ? [...new Set([...current, id])] : current.filter((x) => x !== id);
  return next.length === all.length ? null : next;
}

export function render() {
  const s = store.settings();
  const unitIds = UNITS.map((u) => u.id);
  const lessonIds = LESSONS.map((l) => l.id);
  const dialogueIds = DIALOGUES.map((d) => d.id);
  const verbCount = (tier) => VERBS.filter((v) => v.tier === tier).length;

  mount(`
    <section class="settings" id="settings">
      <h2>Settings</h2>

      <div class="panel">
        <h3>Daily pace</h3>
        <p class="panel-sub">New cards are the throttle: reviews follow from what you've learned.</p>
        <div class="pace-row">
          ${Object.entries(store.PACE_PRESETS).map(([k, p]) => `
            <button class="pace ${s.pace === k ? 'on' : ''}" data-act="pace" data-pace="${k}">
              <b>${p.label}</b><span>${p.newPerDay} new / day</span><span class="muted">${p.blurb}</span>
            </button>`).join('')}
          <button class="pace ${s.pace === 'custom' ? 'on' : ''}" data-act="pace" data-pace="custom">
            <b>Custom</b><span>your numbers</span><span class="muted">set below</span>
          </button>
        </div>
        <div class="field-row">
          <label>New cards a day
            <input type="number" id="newPerDay" min="0" max="100" value="${s.newPerDay}">
          </label>
          <label>Maximum reviews a day
            <input type="number" id="maxReviews" min="10" max="500" step="10" value="${s.maxReviews}">
          </label>
          <label>New day starts at
            <select id="rollover">
              ${[0, 2, 3, 4, 5, 6].map((h) => `<option value="${h}" ${h === s.dayRollover ? 'selected' : ''}>${String(h).padStart(2, '0')}:00</option>`).join('')}
            </select>
          </label>
        </div>
        <p class="muted">Falling behind? Drop the new-card number — reviews shrink on their own within a week.</p>
      </div>

      <div class="panel">
        <h3>Vocabulary units</h3>
        <p class="panel-sub">Units are introduced in order. Switch one off to keep it out of the queue.</p>
        <div class="check-grid">
          ${UNITS.map((u) => `
            <label class="check">
              <input type="checkbox" data-act="unit" data-id="${u.id}" ${isOn(s.units, u.id) ? 'checked' : ''}>
              <span><b>${escapeHtml(u.title)}</b><em>${u.items.length} words · ${escapeHtml(u.blurb)}</em></span>
            </label>`).join('')}
        </div>
      </div>

      <div class="panel">
        <h3>Conjugation drills</h3>
        <p class="panel-sub">Each tense × verb × person is its own card, so add tenses one at a time.</p>
        <div class="check-grid">
          ${TENSES.map((t) => `
            <label class="check">
              <input type="checkbox" data-act="tense" data-id="${t.id}" ${s.tenses.includes(t.id) ? 'checked' : ''}>
              <span><b>${escapeHtml(t.label)}</b><em>${escapeHtml(t.hint)}</em></span>
            </label>`).join('')}
        </div>
        <h4>Which verbs</h4>
        <div class="check-grid">
          ${TIERS.map((t) => `
            <label class="check">
              <input type="checkbox" data-act="tier" data-id="${t.id}" ${s.verbTiers.includes(t.id) ? 'checked' : ''}>
              <span><b>${t.label}</b><em>${verbCount(t.id)} verbs · ${escapeHtml(t.note)}</em></span>
            </label>`).join('')}
        </div>
      </div>

      <div class="panel">
        <h3>Grammar lessons</h3>
        <div class="check-grid">
          ${LESSONS.map((l) => `
            <label class="check">
              <input type="checkbox" data-act="lesson" data-id="${l.id}" ${isOn(s.lessons, l.id) ? 'checked' : ''}>
              <span><b>${escapeHtml(l.title)}</b><em>${l.exercises.length} exercises</em></span>
            </label>`).join('')}
        </div>
      </div>

      <div class="panel">
        <h3>Conversations</h3>
        <p class="panel-sub">Each line is rebuilt from word tiles. Lines come in order, so a conversation always makes sense.</p>
        <div class="check-grid">
          ${DIALOGUES.map((d) => `
            <label class="check">
              <input type="checkbox" data-act="dialogue" data-id="${d.id}" ${isOn(s.dialogues, d.id) ? 'checked' : ''}>
              <span><b>${escapeHtml(d.title)}</b><em>${escapeHtml(d.en)} · ${d.lines.length} lines</em></span>
            </label>`).join('')}
        </div>
      </div>

      <div class="panel">
        <h3>Answering</h3>
        <label class="check">
          <input type="checkbox" data-act="audio" ${s.audio ? 'checked' : ''}>
          <span><b>Speak Italian automatically</b><em>${audioAvailable()
            ? 'An Italian voice is available on this device.'
            : 'No Italian voice found — the 🔊 buttons may be silent.'}</em></span>
        </label>
        <label class="check">
          <input type="checkbox" data-act="strict" ${s.strictAccents ? 'checked' : ''}>
          <span><b>Require exact accents</b><em>Off: <i>perche</i> is accepted for <i>perché</i> with a nudge.</em></span>
        </label>
        <label class="check">
          <input type="checkbox" data-act="listening" ${s.listening ? 'checked' : ''}>
          <span><b>Listening cards</b><em>${audioAvailable()
            ? 'Hear a word or line with no text, and write what you heard.'
            : '⚠ No Italian voice on this device — these cards would be silent and unanswerable.'}</em></span>
        </label>
      </div>

      <div class="panel">
        <h3>Your data</h3>
        <p class="panel-sub">Progress lives in this browser only. Export before clearing site data.</p>
        <div class="link-row">
          <button class="button" data-act="export">Export backup</button>
          <button class="button" data-act="import">Import backup</button>
          <button class="button danger" data-act="reset">Reset progress</button>
        </div>
        <input type="file" id="import-file" accept="application/json" hidden>
        <p class="muted" id="data-msg"></p>
      </div>
    </section>
  `);

  const root = $('#settings');

  delegate(root, '[data-act]', 'change', (e, t) => {
    const act = t.dataset.act;
    const s2 = store.settings();
    if (act === 'unit') {
      store.updateSettings({ units: toggleIn(s2.units, unitIds, t.dataset.id, t.checked) });
    } else if (act === 'lesson') {
      store.updateSettings({ lessons: toggleIn(s2.lessons, lessonIds, t.dataset.id, t.checked) });
    } else if (act === 'dialogue') {
      store.updateSettings({ dialogues: toggleIn(s2.dialogues, dialogueIds, t.dataset.id, t.checked) });
    } else if (act === 'tense') {
      const next = t.checked
        ? [...new Set([...s2.tenses, t.dataset.id])]
        : s2.tenses.filter((x) => x !== t.dataset.id);
      store.updateSettings({ tenses: next });
    } else if (act === 'tier') {
      const id = Number(t.dataset.id);
      const next = t.checked
        ? [...new Set([...s2.verbTiers, id])]
        : s2.verbTiers.filter((x) => x !== id);
      store.updateSettings({ verbTiers: next });
    } else if (act === 'audio') {
      store.updateSettings({ audio: t.checked });
    } else if (act === 'strict') {
      store.updateSettings({ strictAccents: t.checked });
    } else if (act === 'listening') {
      store.updateSettings({ listening: t.checked });
    }
  });

  delegate(root, '[data-act="pace"]', 'click', (e, t) => {
    const key = t.dataset.pace;
    if (key === 'custom') store.updateSettings({ pace: 'custom' });
    else {
      const p = store.PACE_PRESETS[key];
      store.updateSettings({ pace: key, newPerDay: p.newPerDay, maxReviews: p.maxReviews });
    }
    render();
  });

  const numeric = () => {
    const newPerDay = Math.max(0, Number($('#newPerDay').value) || 0);
    const maxReviews = Math.max(10, Number($('#maxReviews').value) || 10);
    store.updateSettings({ newPerDay, maxReviews, pace: 'custom' });
    $$('.pace').forEach((b) => b.classList.toggle('on', b.dataset.pace === 'custom'));
  };
  $('#newPerDay').addEventListener('change', numeric);
  $('#maxReviews').addEventListener('change', numeric);
  $('#rollover').addEventListener('change', (e) => {
    store.updateSettings({ dayRollover: Number(e.target.value) });
  });

  delegate(root, '[data-act="export"]', 'click', () => {
    const blob = new Blob([store.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `italian-learner-${store.localDayKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  delegate(root, '[data-act="import"]', 'click', () => $('#import-file').click());
  $('#import-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      store.importJSON(await file.text());
      $('#data-msg').textContent = 'Backup restored.';
      setTimeout(() => render(), 600);
    } catch (err) {
      $('#data-msg').textContent = err.message;
    }
  });

  delegate(root, '[data-act="reset"]', 'click', () => {
    if (confirm('Delete all scheduling progress and history? Your settings are kept.')) {
      store.resetProgress();
      render();
    }
  });
}
