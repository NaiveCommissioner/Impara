// Reference: every word, every conjugation table, every grammar note.
// Read-only — nothing here touches the schedule.

import { UNITS } from '../../data/vocab.js';
import { VERBS, TENSES, PERSONS } from '../../data/verbs.js';
import { LESSONS } from '../../data/grammar.js';
import { DIALOGUES } from '../../data/dialogues.js';
import { glossSentence } from '../gloss.js';
import { paradigm } from '../conjugator.js';
import { allCardStates, settings } from '../store.js';
import { speak, speakerButton } from '../audio.js';
import { mount, $, $$, delegate, escapeHtml } from './dom.js';

let tab = 'words';
let verbFilter = '';
let openVerb = null;

export function render(which) {
  if (which) tab = which;
  mount(`
    <section class="browse" id="browse">
      <h2>Reference</h2>
      <nav class="tabs">
        <button class="tab ${tab === 'words' ? 'on' : ''}" data-tab="words">Words</button>
        <button class="tab ${tab === 'verbs' ? 'on' : ''}" data-tab="verbs">Verbs</button>
        <button class="tab ${tab === 'grammar' ? 'on' : ''}" data-tab="grammar">Grammar</button>
        <button class="tab ${tab === 'talk' ? 'on' : ''}" data-tab="talk">Conversations</button>
      </nav>
      <div id="tab-body">${body()}</div>
    </section>
  `);

  const root = $('#browse');
  delegate(root, '[data-tab]', 'click', (e, t) => render(t.dataset.tab));
  delegate(root, '[data-speak]', 'click', (e, t) => speak(t.dataset.speak, { force: true }));
  delegate(root, '[data-verb]', 'click', (e, t) => {
    openVerb = openVerb === t.dataset.verb ? null : t.dataset.verb;
    $('#tab-body').innerHTML = body();
  });
  const search = $('#verb-search');
  if (search) {
    search.addEventListener('input', (e) => {
      verbFilter = e.target.value.toLowerCase();
      $('#tab-body').innerHTML = body();
      const again = $('#verb-search');
      if (again) { again.value = verbFilter; again.focus(); }
    });
  }
}

function body() {
  if (tab === 'words') return wordsHtml();
  if (tab === 'verbs') return verbsHtml();
  if (tab === 'talk') return dialoguesHtml();
  return grammarHtml();
}

function glossRow(sentence) {
  const words = glossSentence(sentence);
  if (!words.some((w) => w.gloss)) return '';
  return `<div class="gloss">${words.map((w) => `
    <span class="gw${w.english ? ' gw-en' : ''}">
      <b>${escapeHtml(w.word)}</b><em>${w.gloss ? escapeHtml(w.gloss) : ''}</em>
    </span>`).join('')}</div>`;
}

function dialoguesHtml() {
  return DIALOGUES.map((d, i) => `
    <details class="lesson" ${i === 0 ? 'open' : ''}>
      <summary><b>${escapeHtml(d.title)}</b> <span class="muted">${escapeHtml(d.en)} · ${d.lines.length} lines</span></summary>
      <p class="muted">${escapeHtml(d.blurb)}</p>
      <div class="script">
        ${d.lines.map((l) => `
          <div class="say say-${l.s.toLowerCase()}">
            <span class="ctx-who">${l.s}</span>
            <div class="say-body">
              <span class="it">${escapeHtml(l.it)} ${speakerButton(l.it)}</span>
              <span class="en">${escapeHtml(l.en)}</span>
              ${glossRow(l.it)}
            </div>
          </div>`).join('')}
      </div>
    </details>`).join('');
}

// Small square showing how well a word is known, from either of its two cards.
function statusDot(unitId, index) {
  const states = allCardStates();
  const cards = [`v:${unitId}:${index}:r`, `v:${unitId}:${index}:p`];
  if (settings().listening) cards.push(`v:${unitId}:${index}:l`);
  const known = cards.filter((id) => {
    const s = states[id];
    return s && s.state === 'review' && s.interval >= 21;
  }).length;
  const seen = cards.filter((id) => states[id]).length;
  const all = cards.length;
  const cls = known === all ? 'known' : seen ? 'progress' : 'unseen';
  const title = known === all ? 'Known' : seen ? `${seen} of ${all} cards started` : 'Not started';
  return `<i class="dot ${cls}" title="${title}"></i>`;
}

function wordsHtml() {
  return UNITS.map((u) => `
    <details class="unit" ${u.id === 'u1' ? 'open' : ''}>
      <summary><b>${escapeHtml(u.title)}</b> <span class="muted">${u.items.length} words</span></summary>
      <table class="words">
        ${u.items.map((it, i) => `
          <tr>
            <td class="w-dot">${statusDot(u.id, i)}</td>
            <td class="w-it">${escapeHtml(it.it)} ${speakerButton(it.it)}</td>
            <td class="w-en">${escapeHtml(it.en)}</td>
            <td class="w-ex">${it.ex ? `<span class="it">${escapeHtml(it.ex)}</span><span class="en">${escapeHtml(it.exEn || '')}</span>` : ''}</td>
          </tr>`).join('')}
      </table>
    </details>`).join('');
}

function verbsHtml() {
  const list = VERBS
    .filter((v) => !verbFilter || v.inf.includes(verbFilter) || v.en.toLowerCase().includes(verbFilter))
    .sort((a, b) => a.tier - b.tier || a.inf.localeCompare(b.inf));

  return `
    <input id="verb-search" class="search" type="search" placeholder="filter verbs…" value="${escapeHtml(verbFilter)}">
    <div class="verb-list">
      ${list.map((v) => `
        <div class="verb ${openVerb === v.inf ? 'open' : ''}">
          <button class="verb-head" data-verb="${v.inf}">
            <b>${escapeHtml(v.inf)}</b>
            <span class="muted">${escapeHtml(v.en)}</span>
            <span class="tag subtle">${v.pres || v.pp || v.futStem ? 'irregular' : `-${v.type === 'isc' ? 'ire (-isc-)' : v.type}`}</span>
            <span class="tag subtle">aux: ${v.aux}</span>
          </button>
          ${openVerb === v.inf ? verbTables(v) : ''}
        </div>`).join('')}
      ${list.length ? '' : '<p class="muted">No verbs match that.</p>'}
    </div>`;
}

function verbTables(v) {
  return `<div class="verb-tables">
    ${TENSES.map((t) => {
      const forms = paradigm(v, t.id);
      return `<table class="paradigm">
        <caption>${escapeHtml(t.label)}</caption>
        ${PERSONS.map((p, i) => `<tr><th>${escapeHtml(p.label)}<em>${escapeHtml(p.en)}</em></th><td>${escapeHtml(forms[i])} ${speakerButton(forms[i])}</td></tr>`).join('')}
      </table>`;
    }).join('')}
  </div>`;
}

function grammarHtml() {
  return LESSONS.map((l) => `
    <details class="lesson">
      <summary><b>${escapeHtml(l.title)}</b> <span class="muted">${l.exercises.length} exercises</span></summary>
      <div class="note">${l.note}</div>
      <table class="words">
        ${l.exercises.map((ex) => `
          <tr>
            <td class="w-it">${escapeHtml(ex.prompt.replace('___', '…'))}</td>
            <td class="w-en"><b>${escapeHtml(ex.answer)}</b></td>
          </tr>`).join('')}
      </table>
    </details>`).join('');
}
