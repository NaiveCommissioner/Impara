// Progress: what you've done, what's coming, and where the deck stands.

import { UNITS } from '../../data/vocab.js';
import { TENSES } from '../../data/verbs.js';
import { activeCards } from '../cards.js';
import { overview } from '../session.js';
import * as store from '../store.js';
import { mount, escapeHtml } from './dom.js';

const DAY = 24 * 60 * 60 * 1000;

function lastDays(n) {
  const h = store.history();
  const out = [];
  const d = new Date();
  d.setHours(d.getHours() - store.settings().dayRollover);
  for (let i = n - 1; i >= 0; i -= 1) {
    const day = new Date(d.getTime() - i * DAY);
    const key = store.localDayKey(day);
    const rec = h[key] || { new: 0, reviews: 0 };
    out.push({ key, label: day.toLocaleDateString(undefined, { weekday: 'narrow' }), ...rec });
  }
  return out;
}

/** How many reviews fall due on each of the next 14 days. */
function forecast(days = 14) {
  const states = store.allCardStates();
  const active = activeCards(store.settings());
  const buckets = new Array(days).fill(0);
  let overdue = 0;
  const now = Date.now();
  for (const c of active) {
    const s = states[c.id];
    if (!s || s.state === 'new') continue;
    const delta = s.due - now;
    if (delta <= 0) { overdue += 1; buckets[0] += 1; continue; }
    const idx = Math.floor(delta / DAY);
    if (idx < days) buckets[idx] += 1;
  }
  return { buckets, overdue };
}

function unitBreakdown() {
  const states = store.allCardStates();
  const listening = store.settings().listening;
  return UNITS.map((u) => {
    let known = 0;
    let started = 0;
    u.items.forEach((_, i) => {
      const ids = [`v:${u.id}:${i}:r`, `v:${u.id}:${i}:p`];
      if (listening) ids.push(`v:${u.id}:${i}:l`);
      const seen = ids.filter((id) => states[id]);
      const mature = ids.filter((id) => states[id] && states[id].state === 'review' && states[id].interval >= 21);
      if (mature.length === ids.length) known += 1;
      else if (seen.length) started += 1;
    });
    return { title: u.title, total: u.items.length, known, started };
  });
}

function tenseBreakdown() {
  const states = store.allCardStates();
  const s = store.settings();
  return TENSES.filter((t) => s.tenses.includes(t.id)).map((t) => {
    const cards = activeCards(s).filter((c) => c.kind === 'conj' && c.tense === t.id);
    const seen = cards.filter((c) => states[c.id]).length;
    const known = cards.filter((c) => states[c.id] && states[c.id].state === 'review' && states[c.id].interval >= 21).length;
    return { title: t.label, total: cards.length, known, started: seen - known };
  });
}

function dialogueBreakdown() {
  const states = store.allCardStates();
  const s = store.settings();
  const cards = activeCards(s).filter((c) => c.kind === 'sentence');
  const byDialogue = new Map();
  for (const c of cards) {
    if (!byDialogue.has(c.group)) byDialogue.set(c.group, { title: c.dialogueTitle, total: 0, known: 0, started: 0 });
    const row = byDialogue.get(c.group);
    row.total += 1;
    const st = states[c.id];
    if (st && st.state === 'review' && st.interval >= 21) row.known += 1;
    else if (st) row.started += 1;
  }
  return [...byDialogue.values()];
}

export function render() {
  const o = overview();
  const days = lastDays(30);
  const maxDay = Math.max(1, ...days.map((d) => d.new + d.reviews));
  const { buckets, overdue } = forecast();
  const maxF = Math.max(1, overdue, ...buckets);
  const totalAnswers = Object.values(store.history()).reduce((n, d) => n + d.new + d.reviews, 0);

  // The number counts everything you've begun, so it matches what the bar
  // draws; the solid segment inside it is the part that has gone long-term.
  const rows = (list) => list.map((b) => `
    <div class="row" title="${b.known} known · ${b.started} still learning · ${b.total - b.known - b.started} not started">
      <span class="row-label">${escapeHtml(b.title)}</span>
      <span class="bar">
        <span class="bar-known" style="width:${b.total ? (b.known / b.total) * 100 : 0}%"></span>
        <span class="bar-progress" style="width:${b.total ? (b.started / b.total) * 100 : 0}%"></span>
      </span>
      <span class="row-num muted">${b.known + b.started}/${b.total}</span>
    </div>`).join('');

  // A vocabulary word counts as known only when both of its cards are mature;
  // a conjugation form is a single card, so say so accordingly.
  const barLegend = (knownMeans) => `
    <ul class="legend legend-tight">
      <li><i class="dot known"></i> known — ${knownMeans}</li>
      <li><i class="dot progress"></i> still learning</li>
    </ul>`;

  mount(`
    <section class="progress-page">
      <h2>Progress</h2>

      <div class="stat-row">
        <div class="stat"><b>${store.streak()}</b><span>day streak</span></div>
        <div class="stat"><b>${o.known}</b><span>cards known</span></div>
        <div class="stat"><b>${o.inProgress}</b><span>in progress</span></div>
        <div class="stat"><b>${totalAnswers}</b><span>answers all time</span></div>
      </div>

      <div class="panel">
        <h3>Last 30 days</h3>
        <div class="chart">
          ${days.map((d) => `
            <div class="chart-col" title="${d.key}: ${d.new} new, ${d.reviews} reviews">
              <span class="chart-bar">
                <span class="seg seg-rev" style="height:${(d.reviews / maxDay) * 100}%"></span>
                <span class="seg seg-new" style="height:${(d.new / maxDay) * 100}%"></span>
              </span>
              <span class="chart-label">${d.label}</span>
            </div>`).join('')}
        </div>
        <ul class="legend">
          <li><i class="dot known"></i> reviews</li>
          <li><i class="dot progress"></i> new cards</li>
        </ul>
      </div>

      <div class="panel">
        <h3>Coming up</h3>
        <p class="panel-sub">${overdue ? `${overdue} due now · ` : ''}what the next fortnight looks like if you keep the pace.</p>
        <div class="chart">
          ${buckets.map((n, i) => `
            <div class="chart-col" title="in ${i} day(s): ${n} cards">
              <span class="chart-bar"><span class="seg seg-rev" style="height:${(n / maxF) * 100}%"></span></span>
              <span class="chart-label">${i === 0 ? 'today' : i}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="panel">
        <h3>Vocabulary by unit</h3>
        <p class="panel-sub">Words you've started, out of the words in the unit.</p>
        ${rows(unitBreakdown())}
        ${barLegend(store.settings().listening
          ? 'recognise, produce and hear — all at a 21+ day interval'
          : 'recognise and produce, both at a 21+ day interval')}
      </div>

      <div class="panel">
        <h3>Conversations</h3>
        <p class="panel-sub">Lines you've started, out of the lines in the conversation.</p>
        ${dialogueBreakdown().length
          ? rows(dialogueBreakdown()) + barLegend('at a 21+ day interval')
          : '<p class="muted">No conversations switched on yet.</p>'}
      </div>

      <div class="panel">
        <h3>Conjugation by tense</h3>
        <p class="panel-sub">Verb forms you've started, out of the forms in the tense.</p>
        ${tenseBreakdown().length
          ? rows(tenseBreakdown()) + barLegend('at a 21+ day interval')
          : '<p class="muted">No tenses switched on yet.</p>'}
      </div>
    </section>
  `);
}
