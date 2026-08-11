// Free practice. Nothing here is scheduled or written to your progress —
// it's the place to hammer one verb or one unit as often as you like.

import { VERBS, TENSES, PERSONS, hasTense } from '../../data/verbs.js';
import { UNITS } from '../../data/vocab.js';
import { conjugate } from '../conjugator.js';
import { checkAnswer, shortGloss } from '../text.js';
import { settings } from '../store.js';
import { speak, speakerButton } from '../audio.js';
import { mount, $, $$, delegate, escapeHtml } from './dom.js';

let mode = 'conj';
let verbInf = 'essere';
let tenseId = 'presente';
let unitId = 'u1';
let sprint = null;

export function render() {
  mount(`
    <section class="drill" id="drill">
      <h2>Practice</h2>
      <nav class="tabs">
        <button class="tab ${mode === 'conj' ? 'on' : ''}" data-mode="conj">Conjugation table</button>
        <button class="tab ${mode === 'sprint' ? 'on' : ''}" data-mode="sprint">Vocabulary sprint</button>
      </nav>
      <div id="drill-body">${mode === 'conj' ? conjHtml() : sprintHtml()}</div>
    </section>
  `);

  const root = $('#drill');
  delegate(root, '[data-mode]', 'click', (e, t) => { mode = t.dataset.mode; sprint = null; render(); });
  delegate(root, '[data-speak]', 'click', (e, t) => speak(t.dataset.speak, { force: true }));
  wire();
}

function redraw() {
  $('#drill-body').innerHTML = mode === 'conj' ? conjHtml() : sprintHtml();
  wire();
}

function wire() {
  const root = $('#drill-body');
  if (mode === 'conj') {
    $('#verb-pick').addEventListener('change', (e) => { verbInf = e.target.value; redraw(); });
    $('#tense-pick').addEventListener('change', (e) => { tenseId = e.target.value; redraw(); });
    delegate(root, '[data-act="check"]', 'click', checkTable);
    delegate(root, '[data-act="random"]', 'click', () => {
      const pool = VERBS.filter((v) => settings().verbTiers.includes(v.tier));
      verbInf = (pool.length ? pool : VERBS)[Math.floor(Math.random() * (pool.length || VERBS.length))].inf;
      redraw();
    });
    root.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const inputs = $$('.conj-input', root);
      const i = inputs.indexOf(e.target);
      if (i > -1 && i < inputs.length - 1) inputs[i + 1].focus();
      else checkTable();
    });
    const first = $('.conj-input', root);
    if (first) first.focus();
  } else {
    $('#unit-pick').addEventListener('change', (e) => { unitId = e.target.value; sprint = null; redraw(); });
    delegate(root, '[data-act="start"]', 'click', () => { startSprint(); redraw(); });
    delegate(root, '[data-act="submit"]', 'click', submitSprint);
    delegate(root, '[data-act="next"]', 'click', () => { sprint.index += 1; sprint.checked = false; redraw(); });
    const input = $('#sprint-input', root);
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (sprint.checked) { sprint.index += 1; sprint.checked = false; redraw(); }
        else submitSprint();
      });
    }
  }
}

// ---- conjugation table ---------------------------------------------------

function conjHtml() {
  const verb = VERBS.find((v) => v.inf === verbInf) || VERBS[0];
  // Not every verb takes every tense — a modal has no progressive. Offer only
  // what this verb actually does, and fall back if the current pick isn't one
  // of them (you can switch to essere while "progressivo" is selected).
  const offered = TENSES.filter((t) => hasTense(verb, t.id));
  const tense = offered.find((t) => t.id === tenseId) || offered[0];
  tenseId = tense.id;
  return `
    <div class="drill-controls">
      <label>Verb
        <select id="verb-pick">
          ${VERBS.slice().sort((a, b) => a.inf.localeCompare(b.inf)).map((v) =>
            `<option value="${v.inf}" ${v.inf === verb.inf ? 'selected' : ''}>${escapeHtml(v.inf)} — ${escapeHtml(v.en)}</option>`).join('')}
        </select>
      </label>
      <label>Tense
        <select id="tense-pick">
          ${offered.map((t) => `<option value="${t.id}" ${t.id === tense.id ? 'selected' : ''}>${escapeHtml(t.label)}</option>`).join('')}
        </select>
      </label>
      <button class="button" data-act="random">Random verb</button>
    </div>

    <table class="conj-table" id="conj-table">
      <caption>${escapeHtml(verb.inf)} · ${escapeHtml(tense.label)}<span class="cap-gloss">${escapeHtml(verb.en)}</span></caption>
      ${PERSONS.map((p) => `
        <tr data-person="${p.id}">
          <th>${escapeHtml(p.label)}<em>${escapeHtml(p.en)}</em></th>
          <td><input class="conj-input" data-person="${p.id}" type="text" autocomplete="off"
              autocapitalize="off" autocorrect="off" spellcheck="false"></td>
          <td class="conj-result"></td>
        </tr>`).join('')}
    </table>
    <div class="drill-actions">
      <button class="primary" data-act="check">Check table</button>
      <span class="muted" id="conj-score"></span>
    </div>`;
}

function checkTable() {
  const verb = VERBS.find((v) => v.inf === verbInf);
  const forms = conjugate(verb, tenseId);
  let right = 0;
  PERSONS.forEach((p) => {
    const input = $(`.conj-input[data-person="${p.id}"]`);
    const cell = input.closest('tr').querySelector('.conj-result');
    const verdict = checkAnswer(input.value, forms[p.id].form, forms[p.id].alts, settings().strictAccents);
    input.classList.remove('ok', 'bad', 'warn');
    if (verdict === 'correct') {
      right += 1;
      input.classList.add('ok');
      cell.innerHTML = `<span class="ok">✓</span>`;
    } else if (verdict === 'wrong') {
      input.classList.add('bad');
      cell.innerHTML = `<span class="bad">${escapeHtml(forms[p.id].form)}</span> ${speakerButton(forms[p.id].form)}`;
    } else {
      right += 1;
      input.classList.add('warn');
      cell.innerHTML = `<span class="warn">${escapeHtml(forms[p.id].form)}</span> <em class="muted">accents</em>`;
    }
  });
  $('#conj-score').textContent = `${right} of 6 correct`;
}

// ---- vocabulary sprint ---------------------------------------------------

function startSprint() {
  const unit = UNITS.find((u) => u.id === unitId) || UNITS[0];
  const items = unit.items.slice();
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  sprint = { items: items.slice(0, 10), index: 0, right: 0, checked: false, verdict: null, given: '' };
}

function submitSprint() {
  const input = $('#sprint-input');
  const item = sprint.items[sprint.index];
  sprint.given = input.value;
  sprint.verdict = checkAnswer(input.value, item.it, [item.it.replace(/’/g, "'")], settings().strictAccents);
  if (sprint.verdict !== 'wrong') sprint.right += 1;
  sprint.checked = true;
  speak(item.it);
  redraw();
}

function sprintHtml() {
  const picker = `
    <div class="drill-controls">
      <label>Unit
        <select id="unit-pick">
          ${UNITS.map((u) => `<option value="${u.id}" ${u.id === unitId ? 'selected' : ''}>${escapeHtml(u.title)}</option>`).join('')}
        </select>
      </label>
      <button class="button" data-act="start">${sprint ? 'Restart' : 'Start'} · 10 words</button>
    </div>`;

  if (!sprint) {
    return `${picker}<p class="muted">Ten random words from the unit, English to Italian. Untimed and untracked.</p>`;
  }

  if (sprint.index >= sprint.items.length) {
    return `${picker}
      <div class="sprint-done">
        <h3>${sprint.right} / ${sprint.items.length}</h3>
        <p class="muted">Nice work. Start again for a fresh ten.</p>
      </div>`;
  }

  const item = sprint.items[sprint.index];
  const feedback = sprint.checked ? `
    <div class="verdict ${sprint.verdict === 'correct' ? 'ok' : sprint.verdict === 'wrong' ? 'bad' : 'warn'}">
      <b>${escapeHtml(item.it)}</b> ${speakerButton(item.it)}
      ${sprint.verdict === 'correct' ? '' : `<span class="yours">you wrote “${escapeHtml(sprint.given)}”</span>`}
    </div>
    ${item.ex ? `<p class="example"><span class="it">${escapeHtml(item.ex)}</span><span class="en">${escapeHtml(item.exEn || '')}</span></p>` : ''}
    <button class="primary" data-act="next">Next <kbd>↵</kbd></button>` : `
    <button class="primary" data-act="submit">Check <kbd>↵</kbd></button>`;

  return `${picker}
    <div class="sprint">
      <p class="muted">${sprint.index + 1} of ${sprint.items.length} · ${sprint.right} correct</p>
      <div class="prompt-main">${escapeHtml(shortGloss(item.en))}</div>
      <input id="sprint-input" class="answer-input" type="text" autocomplete="off"
        autocapitalize="off" autocorrect="off" spellcheck="false"
        value="${sprint.checked ? escapeHtml(sprint.given) : ''}" ${sprint.checked ? 'disabled' : ''}>
      ${feedback}
    </div>`;
}
