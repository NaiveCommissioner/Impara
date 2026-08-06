// Build an example sentence for one conjugated form.
//
//   parlare · presente · io   →  "Io parlo italiano."      / "I speak Italian."
//   parlare · passato  · noi  →  "Noi abbiamo parlato italiano ieri."
//                                / "We spoke Italian yesterday."
//
// The sentence is assembled from the conjugated form, the verb's complement
// frame and a tense adverb, so every one of the ~1,500 conjugation cards can
// show the form actually doing something.

import { VERB_FRAMES, TENSE_ADVERBS, EXAMPLE_SUBJECTS } from '../data/examples.js';
import { conjugate } from './conjugator.js';
import { englishForm } from './gloss.js';

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function join(parts) {
  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * @returns {{it: string, en: string}|null} null when the verb has no frame.
 */
export function exampleFor(verb, tenseId, person) {
  if (!verb) return null;
  const frame = VERB_FRAMES[verb.inf];
  if (!frame) return null;

  const adverb = TENSE_ADVERBS[tenseId] || { it: '', en: '' };
  const form = conjugate(verb, tenseId)[person].form;

  // The paradigm row is labelled "lui / lei", but a sentence has one subject:
  // "Lui è a casa" reads better as "He is at home" than "He/she is at home".
  const english = englishForm(verb, tenseId, person).replace(/^he\/she\b/i, 'He');

  return {
    it: `${capitalise(join([EXAMPLE_SUBJECTS[person], form, frame.it, adverb.it]))}.`,
    en: `${capitalise(join([english, frame.en, adverb.en]))}.`,
  };
}
