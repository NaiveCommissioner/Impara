// The card catalogue: every question the app can ask, derived from the data
// files. Card ids are stable strings so progress survives content edits as
// long as items aren't reordered within a unit.

import { UNITS } from '../data/vocab.js';
import { VERBS, TENSES, PERSONS } from '../data/verbs.js';
import { LESSONS } from '../data/grammar.js';
import { DIALOGUES, dialogueVocabulary } from '../data/dialogues.js';
import { conjugate } from './conjugator.js';
import { shortGloss } from './text.js';

// Cards you must have met before the conjugation drills start labelling forms
// with io / tu / lui — the first three subject-pronoun exercises.
const PRONOUN_PRIMER = ['g:g0:0', 'g:g0:1', 'g:g0:2'];

export const KINDS = {
  recog: { id: 'recog', label: 'Recognise', weight: 3 },
  prod: { id: 'prod', label: 'Produce', weight: 3 },
  conj: { id: 'conj', label: 'Conjugate', weight: 2 },
  grammar: { id: 'grammar', label: 'Grammar', weight: 1 },
  sentence: { id: 'sentence', label: 'Conversation', weight: 1 },
  listen: { id: 'listen', label: 'Listening', weight: 1 },
};

/**
 * Every reasonable way to type an English gloss. "the friend (m)" should accept
 * "friend"; "hi / bye (informal)" should accept either sense on its own.
 */
export function englishAlts(en) {
  const out = new Set();
  const add = (s) => { const v = s.trim(); if (v) out.add(v); };
  const dropArticle = (s) => s.replace(/^(?:the|a|an)\s+/i, '');
  const withoutParens = en.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();

  for (const variant of [en, withoutParens]) {
    add(variant);
    add(dropArticle(variant));
    for (const sense of variant.split('/')) {
      add(sense);
      add(dropArticle(sense));
    }
  }
  out.delete(en);
  return [...out];
}

/** Tiles ignore punctuation — you're assembling word order, not typography. */
export function tokenizeLine(line) {
  return line.replace(/[.,!?;:"«»]/g, '').split(/\s+/).filter(Boolean);
}

/**
 * Two decoy tiles drawn from elsewhere in the same conversation, so a short
 * line can't be solved just by using every tile on offer. Chosen
 * deterministically so the same card looks the same each time it comes up.
 */
function pickDistractors(pool, tokens, n = 2) {
  const used = new Set(tokens.map((t) => t.toLowerCase()));
  const eligible = pool.filter((w) => !used.has(w.toLowerCase())).sort();
  if (eligible.length <= n) return eligible;
  const step = Math.floor(eligible.length / (n + 1)) || 1;
  const out = [];
  for (let i = 1; out.length < n && i * step < eligible.length; i += 1) {
    out.push(eligible[i * step]);
  }
  return out;
}

let CATALOGUE = null;
let INDEX = null;

function build() {
  const cards = [];

  // --- vocabulary: recognise (it → en) and produce (en → it) --------------
  UNITS.forEach((unit, ui) => {
    unit.items.forEach((item, ii) => {
      const base = { unitId: unit.id, unitTitle: unit.title, it: item.it, en: item.en, ex: item.ex, exEn: item.exEn };
      cards.push({
        ...base,
        id: `v:${unit.id}:${ii}:r`,
        kind: 'recog',
        group: unit.id,
        order: ui * 1000 + ii,
        prompt: item.it,
        answer: item.en,
        // Recalling the meaning is active work too: typed, and generous about
        // which sense of the gloss you give.
        alts: englishAlts(item.en),
        typed: true,
        speak: item.it,
      });
      cards.push({
        ...base,
        id: `v:${unit.id}:${ii}:p`,
        kind: 'prod',
        group: unit.id,
        // Never ask for a word you haven't met. The offset spaces the two
        // cards out; `requires` is what actually guarantees the order.
        requires: [`v:${unit.id}:${ii}:r`],
        order: ui * 1000 + ii + 4,
        prompt: item.en,
        answer: item.it,
        alts: item.it.includes('’') ? [item.it.replace(/’/g, "'")] : [],
        typed: true,
        speak: item.it,
      });
      cards.push({
        ...base,
        id: `v:${unit.id}:${ii}:l`,
        kind: 'listen',
        mode: 'word',
        group: unit.id,
        // Hearing a word is only fair once you can already write it.
        requires: [`v:${unit.id}:${ii}:p`],
        order: ui * 1000 + ii + 8,
        prompt: '',                   // nothing is shown — that's the point
        answer: item.it,
        alts: item.it.includes('’') ? [item.it.replace(/’/g, "'")] : [],
        typed: true,
        speak: item.it,
      });
    });
  });

  // --- conjugation: one card per verb × tense × person --------------------
  const byTier = VERBS.map((v, i) => ({ v, i })).sort((a, b) => a.v.tier - b.v.tier || a.i - b.i);
  TENSES.forEach((tense, ti) => {
    byTier.forEach(({ v }, vi) => {
      const forms = conjugate(v, tense.id);
      PERSONS.forEach((p) => {
        cards.push({
          id: `c:${v.inf}:${tense.id}:${p.id}`,
          kind: 'conj',
          group: tense.id,
          tier: v.tier,
          requires: PRONOUN_PRIMER,
          order: ti * 1e6 + v.tier * 1e5 + vi * 10 + p.id,
          verb: v.inf,
          verbEn: v.en,
          tense: tense.id,
          tenseLabel: tense.label,
          person: p.label,
          personEn: p.en,
          prompt: `${v.inf} — ${tense.label}`,
          answer: forms[p.id].form,
          alts: forms[p.id].alts,
          typed: true,
          speak: `${p.label === 'lui / lei' ? 'lui' : p.label} ${forms[p.id].form}`,
        });
      });
    });
  });

  // --- grammar: fill in the blank ----------------------------------------
  LESSONS.forEach((lesson, li) => {
    lesson.exercises.forEach((ex, ei) => {
      cards.push({
        id: `g:${lesson.id}:${ei}`,
        kind: 'grammar',
        group: lesson.id,
        order: li * 1000 + ei,
        lessonTitle: lesson.title,
        prompt: ex.prompt,
        hint: ex.hint,
        answer: ex.answer,
        alts: ex.alts || [],
        typed: true,
        speak: ex.prompt.replace('___', ex.answer),
      });
    });
  });

  // --- conversations: rebuild each line from word tiles -------------------
  DIALOGUES.forEach((d, di) => {
    const pool = dialogueVocabulary(d);
    d.lines.forEach((line, li) => {
      const tokens = tokenizeLine(line.it);
      const previous = li > 0 ? d.lines[li - 1] : null;
      cards.push({
        id: `d:${d.id}:${li}`,
        kind: 'sentence',
        group: d.id,
        order: di * 1000 + li,
        // A conversation only makes sense in sequence.
        requires: li > 0 ? [`d:${d.id}:${li - 1}`] : undefined,
        dialogueTitle: d.title,
        dialogueEn: d.en,
        speaker: line.s,
        lineNumber: li + 1,
        lineCount: d.lines.length,
        prompt: line.en,
        answer: line.it,
        tokens,
        distractors: pickDistractors(pool, tokens),
        contextIt: previous ? previous.it : null,
        contextEn: previous ? previous.en : null,
        typed: false,       // assembled from tiles, not typed
        speak: line.it,
      });
      // The same line, heard rather than read: no English, no written prompt.
      cards.push({
        id: `d:${d.id}:${li}:l`,
        kind: 'listen',
        mode: 'line',
        group: d.id,
        order: di * 1000 + li,
        requires: [`d:${d.id}:${li}`],
        dialogueTitle: d.title,
        speaker: line.s,
        lineNumber: li + 1,
        lineCount: d.lines.length,
        prompt: '',
        answer: line.it,
        en: line.en,
        tokens,
        distractors: pickDistractors(pool, tokens),
        typed: false,
        speak: line.it,
      });
    });
  });

  return cards;
}

export function catalogue() {
  if (!CATALOGUE) {
    CATALOGUE = build();
    INDEX = new Map(CATALOGUE.map((c) => [c.id, c]));
  }
  return CATALOGUE;
}

export function getCard(id) {
  catalogue();
  return INDEX.get(id);
}

/**
 * The other cards built from the same underlying item — a word's three
 * directions (recognise / produce / listen), or a conversation line and its
 * listening twin.
 *
 * Each of those is separately new, so each earns its own teaching pass. Knowing
 * whether a sibling has already been introduced is what lets a teaching card
 * tell a first encounter from a repeat.
 */
export function siblingIds(card) {
  const wordCard = card.kind === 'recog' || card.kind === 'prod'
    || (card.kind === 'listen' && card.mode === 'word');
  if (wordCard) {
    const base = card.id.replace(/:[rpl]$/, '');
    return ['r', 'p', 'l'].map((s) => `${base}:${s}`).filter((id) => id !== card.id);
  }
  if (card.kind === 'sentence') return [`${card.id}:l`];
  if (card.kind === 'listen' && card.mode === 'line') return [card.id.replace(/:l$/, '')];
  return [];
}

/** Cards the current settings have switched on. */
export function activeCards(settings) {
  const units = settings.units;
  const lessons = settings.lessons;
  const dialogues = settings.dialogues;
  return catalogue().filter((c) => {
    if (c.kind === 'recog' || c.kind === 'prod') {
      return !units || units.includes(c.group);
    }
    if (c.kind === 'conj') {
      return settings.tenses.includes(c.tense) && settings.verbTiers.includes(c.tier);
    }
    if (c.kind === 'sentence') {
      return !dialogues || dialogues.includes(c.group);
    }
    if (c.kind === 'listen') {
      // Unanswerable without a voice, so the toggle governs the whole kind;
      // beyond that they follow whichever unit or conversation they came from.
      if (!settings.listening) return false;
      return c.mode === 'line'
        ? (!dialogues || dialogues.includes(c.group))
        : (!units || units.includes(c.group));
    }
    return !lessons || lessons.includes(c.group);
  });
}

/**
 * Choose which not-yet-seen cards to introduce, interleaving the kinds so a
 * session never turns into fifty conjugations in a row.
 */
export function pickNew(limit, active, cardStates) {
  if (limit <= 0) return [];
  const streams = {
    vocab: [],
    conj: [],
    grammar: [],
    sentence: [],
  };
  for (const c of active) {
    if (cardStates[c.id]) continue;
    if (c.kind === 'conj') streams.conj.push(c);
    else if (c.kind === 'grammar') streams.grammar.push(c);
    // Listening rides in the stream of whatever it's listening to, so it
    // arrives alongside its own material instead of competing for a slot.
    else if (c.kind === 'sentence' || c.mode === 'line') streams.sentence.push(c);
    else streams.vocab.push(c);
  }
  Object.values(streams).forEach((s) => s.sort((a, b) => a.order - b.order));

  // Round-robin: 3 vocabulary : 2 conjugation : 1 grammar : 1 conversation.
  const plan = [
    ...Array(3).fill('vocab'),
    ...Array(2).fill('conj'),
    'grammar',
    'sentence',
  ];

  // A prerequisite counts as met once the card has been introduced — whether in
  // an earlier session or earlier in this very batch. Requirements pointing at
  // cards the current settings switched off are ignored, so turning a lesson
  // off can never deadlock the deck.
  const activeIds = new Set(active.map((c) => c.id));
  const met = new Set(Object.keys(cardStates));
  const ready = (c) =>
    !c.requires || c.requires.every((r) => !activeIds.has(r) || met.has(r));

  const out = [];
  let guard = 0;
  while (out.length < limit) {
    let progressed = false;
    for (const key of plan) {
      if (out.length >= limit) break;
      // Only ever consider the head of a stream: skipping ahead would break
      // the curriculum order this whole function exists to preserve.
      const next = streams[key][0];
      if (next && ready(next)) {
        streams[key].shift();
        out.push(next);
        met.add(next.id);
        progressed = true;
      }
    }
    // Nothing moved: every stream is exhausted or blocked behind a card that
    // this batch can't unlock. Stop rather than spin.
    if (!progressed) break;
    if ((guard += 1) > 10000) break;
  }
  return out;
}

export function labelForKind(kind) {
  return KINDS[kind] ? KINDS[kind].label : kind;
}
