// Typed-answer grading. Forgiving about the things that aren't the point
// (case, spacing, curly apostrophes, a missing article) and explicit about
// the thing that is (accents), rather than silently failing you.

const ARTICLES = /^(?:il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/;

export function normalize(s) {
  return String(s ?? '')
    .trim()
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\s+/g, ' ')
    // Trailing punctuation is never something you should have to type. The
    // ellipsis matters most: entries like "mi chiamo…" and "vorrei…" carry one
    // to show the phrase continues, and it is not part of the answer.
    .replace(/[.!?…]+$/, '')
    .trim();
}

export function deaccent(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * @returns {'correct'|'accent'|'article'|'wrong'}
 *   'accent'  — right word, wrong or missing accent
 *   'article' — right word, missing the definite article
 */
export function checkAnswer(input, answer, alts = [], strict = false) {
  const given = normalize(input);
  if (!given) return 'wrong';

  const accepted = [answer, ...alts].map(normalize);
  if (accepted.includes(given)) return 'correct';

  // A truncation apostrophe ("un po'") is typography, not spelling.
  const noTail = (s) => s.replace(/'+$/, '');
  if (accepted.some((a) => noTail(a) === noTail(given))) return 'correct';

  if (accepted.some((a) => deaccent(a) === deaccent(given))) {
    return strict ? 'wrong' : 'accent';
  }

  // "Missing article" leniency only makes sense when a noun survives the
  // stripping. When the answer *is* an article — the whole point of the
  // article lesson — a different article is simply wrong.
  const bare = given.replace(ARTICLES, '');
  if (!bare) return 'wrong';
  if (accepted.some((a) => a.replace(ARTICLES, '') === bare)) return 'article';
  if (!strict && accepted.some((a) => deaccent(a.replace(ARTICLES, '')) === deaccent(bare))) {
    return 'article';
  }

  return 'wrong';
}

/** Only the first sense of a gloss like "the friend (m)" — used for prompts. */
export function shortGloss(en) {
  return en.replace(/\s*\(.*?\)\s*/g, ' ').trim();
}
