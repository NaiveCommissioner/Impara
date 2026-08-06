// Word-by-word English under an Italian sentence.
//
// The index is built from the content you already have — every vocabulary
// entry, every conjugated form of every verb, every participle — plus the
// function-word list in data/lexicon.js. Nothing is hand-translated per
// sentence, so adding a word to a unit automatically improves the glosses
// everywhere that word appears.

import { UNITS } from '../data/vocab.js';
import { VERBS, TENSES } from '../data/verbs.js';
import { FUNCTION_WORDS, VERB_PAST } from '../data/lexicon.js';
import { conjugate, participio } from './conjugator.js';

const LEADING_ARTICLE = /^(?:il|lo|la|i|gli|le|un|uno|una|l['’]|un['’])\s*/i;
const SUBJECTS = ['I', 'you', 'he/she', 'we', 'you (pl.)', 'they'];

let INDEX = null;

function norm(s) {
  return String(s).toLowerCase().replace(/[’]/g, "'");
}

/** Only record the first gloss for a token — earlier sources win. */
function add(map, key, gloss) {
  const k = norm(key);
  if (k && !map.has(k)) map.set(k, gloss);
}

/** "to speak" → "speak"; "to do / to make" → "do" */
function bareVerb(en) {
  return en.split(' / ')[0].replace(/^to\s+/, '').trim();
}

// English verbs that don't take a plain -s. "be" varies by person outright,
// which is why "è" must not come out as "bes".
const IRREGULAR_PRESENT = {
  be: ['am', 'are', 'is', 'are', 'are', 'are'],
  have: ['have', 'have', 'has', 'have', 'have', 'have'],
  do: ['do', 'do', 'does', 'do', 'do', 'do'],
};

function thirdPersonWord(word) {
  if (/(?:s|x|z|ch|sh|o)$/.test(word)) return `${word}es`;
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`;
  return `${word}s`;
}

/** Conjugate the English head word only: "is able to", "has to", "wakes up". */
function presentPhrase(phrase, person) {
  const [first, ...rest] = phrase.split(' ');
  const irregular = IRREGULAR_PRESENT[first];
  const head = irregular ? irregular[person] : (person === 2 ? thirdPersonWord(first) : first);
  return [head, ...rest].join(' ');
}

/**
 * Natural English for one conjugated form — "I speak", "he speaks",
 * "we used to speak", "they will speak", "I spoke".
 */
export function englishForm(verb, tenseId, person) {
  const base = bareVerb(verb.en);
  const subject = SUBJECTS[person];
  if (tenseId === 'presente') return `${subject} ${presentPhrase(base, person)}`;
  if (tenseId === 'imperfetto') return `${subject} used to ${base}`;
  if (tenseId === 'futuro') return `${subject} will ${base}`;
  if (tenseId === 'condizionale') return `${subject} would ${base}`;
  const past = VERB_PAST[verb.inf];
  const word = Array.isArray(past) ? past[person] : past;
  return `${subject} ${word || base}`;
}

function buildIndex() {
  const map = new Map();

  // 1. Vocabulary — both with and without its article ("il pane" and "pane").
  for (const unit of UNITS) {
    for (const item of unit.items) {
      add(map, item.it, item.en);
      const bare = item.it.replace(LEADING_ARTICLE, '');
      if (bare !== item.it) add(map, bare, item.en);
    }
  }

  // 2. Every conjugated form. Multi-word forms (passato prossimo, reflexives)
  //    are split, since the auxiliary and pronoun are indexed in their own
  //    right; the participle gets the past-tense gloss.
  for (const v of VERBS) {
    add(map, v.inf, v.en);   // the infinitive itself turns up in sentences
    for (const t of TENSES) {
      if (t.id === 'passato') continue;
      conjugate(v, t.id).forEach((cell, person) => {
        const words = cell.form.split(' ');
        const head = words[words.length - 1];
        add(map, head, englishForm(v, t.id, person));
      });
    }
    const past = VERB_PAST[v.inf];
    add(map, participio(v), `${Array.isArray(past) ? past[0] : past || bareVerb(v.en)} (past participle)`);
  }

  // 3. Function words last, so a real vocabulary entry always wins.
  for (const [word, gloss] of Object.entries(FUNCTION_WORDS)) add(map, word, gloss);

  return map;
}

function index() {
  if (!INDEX) INDEX = buildIndex();
  return INDEX;
}

/**
 * Fall back through plausible base forms: plurals back to singulars,
 * feminines back to masculines, honouring Italian spelling changes.
 */
function morphologicalGuess(token) {
  const map = index();
  const candidates = [];
  if (token.endsWith('chi')) candidates.push(`${token.slice(0, -3)}co`);
  if (token.endsWith('ghi')) candidates.push(`${token.slice(0, -3)}go`);
  if (token.endsWith('che')) candidates.push(`${token.slice(0, -3)}ca`);
  if (token.endsWith('ghe')) candidates.push(`${token.slice(0, -3)}ga`);
  if (token.endsWith('ci')) candidates.push(`${token.slice(0, -2)}co`);
  if (token.endsWith('gi')) candidates.push(`${token.slice(0, -2)}go`);
  if (token.endsWith('i')) {
    candidates.push(`${token.slice(0, -1)}o`, `${token.slice(0, -1)}e`, `${token.slice(0, -1)}io`);
  }
  if (token.endsWith('e')) candidates.push(`${token.slice(0, -1)}a`, `${token.slice(0, -1)}o`);
  if (token.endsWith('a')) candidates.push(`${token.slice(0, -1)}o`);
  for (const c of candidates) {
    if (map.has(c)) return map.get(c);
  }
  return null;
}

export function glossWord(raw) {
  const token = norm(raw).replace(/^[^a-zàèéìòóùç']+|[^a-zàèéìòóùç']+$/g, '');
  if (!token) return null;
  const map = index();
  if (map.has(token)) return map.get(token);
  // Elided forms: "dell'" and "l'" are listed with their apostrophe.
  if (token.includes("'")) {
    const head = `${token.split("'")[0]}'`;
    if (map.has(head)) return map.get(head);
    const tail = token.split("'")[1];
    if (tail && map.has(tail)) return map.get(tail);
  }
  return morphologicalGuess(token);
}

// Prompts carry English asides — "(my)", "(to me)", "Most naturally, …" — and
// those must not be glossed as though they were Italian.
const ENGLISH_ASIDE = /\([^)]*\)|"[^"]*"|“[^”]*”/g;

function asideRanges(text) {
  const ranges = [];
  let m;
  ENGLISH_ASIDE.lastIndex = 0;
  while ((m = ENGLISH_ASIDE.exec(text)) !== null) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  return ranges;
}

/**
 * Split a sentence into display tokens, each with its gloss (or null).
 * Elisions become two tokens so "l’acqua" glosses as "the" + "water".
 * Tokens inside an English aside are flagged and left alone.
 * @returns {{word: string, gloss: string|null, english: boolean}[]}
 */
export function glossSentence(text) {
  if (!text) return [];
  const str = String(text);
  const ranges = asideRanges(str);
  const inAside = (i) => ranges.some(([a, b]) => i >= a && i < b);

  const out = [];
  const chunkRe = /\S+/g;
  let m;
  while ((m = chunkRe.exec(str)) !== null) {
    const english = inAside(m.index);
    const parts = m[0].match(/[^\s'’]*['’]|[^\s'’]+/g) || [m[0]];
    for (const part of parts) {
      out.push({ word: part, gloss: english ? null : glossWord(part), english });
    }
  }
  return out;
}

/** How much of a sentence we can actually explain — used by the tests. */
export function coverage(text) {
  const words = glossSentence(text)
    .filter((w) => !w.english && /[a-zàèéìòóùç]/i.test(w.word));
  const known = words.filter((w) => w.gloss);
  return {
    total: words.length,
    known: known.length,
    missing: words.filter((w) => !w.gloss).map((w) => w.word),
  };
}
