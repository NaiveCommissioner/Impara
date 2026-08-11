// Italian conjugation engine.
//
// Everything a regular verb does is derived here; verb entries in data/verbs.js
// only declare what genuinely breaks the pattern. Returns, for each of the six
// persons, a canonical answer plus any equally-correct alternatives (feminine
// agreement in the passato prossimo, mostly).

const REFL_PRONOUNS = ['mi', 'ti', 'si', 'ci', 'vi', 'si'];

const PRESENT_ENDINGS = {
  are: ['o', 'i', 'a', 'iamo', 'ate', 'ano'],
  ere: ['o', 'i', 'e', 'iamo', 'ete', 'ono'],
  ire: ['o', 'i', 'e', 'iamo', 'ite', 'ono'],
  isc: ['isco', 'isci', 'isce', 'iamo', 'ite', 'iscono'],
};

const IMPERFECT_ENDINGS = ['vo', 'vi', 'va', 'vamo', 'vate', 'vano'];
const FUTURE_ENDINGS = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
const CONDITIONAL_ENDINGS = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];

// A reflexive verb's infinitive (chiamarsi) hides a plain one (chiamare).
function baseInfinitive(v) {
  return v.refl ? v.inf.slice(0, -2) + 'e' : v.inf;
}

function presente(v) {
  if (v.pres) return v.pres.slice();
  const base = baseInfinitive(v);
  const stem = base.slice(0, -3);
  const endings = PRESENT_ENDINGS[v.type];
  const hardening = /(?:care|gare)$/.test(base); // cerchi, paghiamo
  // -ciare/-giare/-sciare carry a silent i that collapses before another i
  const collapsing = /i$/.test(stem);

  return endings.map((ending) => {
    if (hardening && ending.startsWith('i')) return stem + 'h' + ending;
    if (collapsing && ending.startsWith('i')) return stem.slice(0, -1) + ending;
    return stem + ending;
  });
}

function imperfetto(v) {
  if (v.imperf) return v.imperf.slice();
  const stem = v.impStem || baseInfinitive(v).slice(0, -2);
  return IMPERFECT_ENDINGS.map((e) => stem + e);
}

// Shared by futuro and condizionale.
function futureStem(v) {
  if (v.futStem) return v.futStem;
  const base = baseInfinitive(v);
  if (v.type === 'are') {
    const stem = base.slice(0, -3);
    if (/(?:care|gare)$/.test(base)) return stem + 'her'; // cercherò, pagherò
    if (/(?:ciare|giare|sciare)$/.test(base)) return stem.slice(0, -1) + 'er'; // mangerò
    return stem + 'er'; // parlerò, studierò
  }
  return base.slice(0, -1); // creder-, dormir-, capir-
}

function futuro(v) {
  const stem = futureStem(v);
  return FUTURE_ENDINGS.map((e) => stem + e);
}

function condizionale(v) {
  const stem = futureStem(v);
  return CONDITIONAL_ENDINGS.map((e) => stem + e);
}

export function participio(v) {
  if (v.pp) return v.pp;
  const base = baseInfinitive(v);
  const stem = base.slice(0, -3);
  if (v.type === 'are') return stem + 'ato';
  if (v.type === 'ere') return stem + 'uto';
  return stem + 'ito';
}

const ESSERE_PRESENT = ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'];
const AVERE_PRESENT = ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'];
const STARE_PRESENT = ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'];

/**
 * The gerund: parlando, credendo, dormendo.
 *
 * -are takes -ando, everything else -endo — note that -ire verbs go to -endo,
 * not -indo, which is where the obvious "infinitive minus -re" shortcut breaks.
 * The -isc- infix never appears here (capire → capendo).
 *
 * The three irregulars reuse `impStem`, the same stem that makes the imperfetto
 * odd: fare → facendo, dire → dicendo, bere → bevendo. Without it `bere` would
 * yield "bendo".
 */
export function gerundio(v) {
  if (v.impStem) return `${v.impStem}ndo`;
  const stem = baseInfinitive(v).slice(0, -3);
  return stem + (v.type === 'are' ? 'ando' : 'endo');
}

/** stare + gerund: "sto parlando" — an action in progress right now. */
function progressivo(v) {
  const g = gerundio(v);
  return STARE_PRESENT.map((aux) => ({ form: `${aux} ${g}`, alts: [] }));
}

// With essere the participle agrees with the subject. Masculine is canonical;
// the feminine is offered as an accepted alternative.
function agreedParticiples(pp) {
  const root = pp.slice(0, -1);
  return [
    { form: root + 'o', alt: root + 'a' },
    { form: root + 'o', alt: root + 'a' },
    { form: root + 'o', alt: root + 'a' },
    { form: root + 'i', alt: root + 'e' },
    { form: root + 'i', alt: root + 'e' },
    { form: root + 'i', alt: root + 'e' },
  ];
}

function passato(v) {
  const pp = participio(v);
  if (v.aux === 'essere') {
    const agreed = agreedParticiples(pp);
    return ESSERE_PRESENT.map((aux, i) => ({
      form: `${aux} ${agreed[i].form}`,
      alts: [`${aux} ${agreed[i].alt}`],
    }));
  }
  return AVERE_PRESENT.map((aux) => ({ form: `${aux} ${pp}`, alts: [] }));
}

const SIMPLE_TENSES = { presente, imperfetto, futuro, condizionale };

/**
 * Conjugate a verb in a tense.
 * @returns {{form: string, alts: string[]}[]} six entries, io → loro
 */
export function conjugate(v, tense) {
  let cells;
  if (tense === 'passato') {
    cells = passato(v);
  } else if (tense === 'progressivo') {
    cells = progressivo(v);
  } else {
    const builder = SIMPLE_TENSES[tense];
    if (!builder) throw new Error(`unknown tense: ${tense}`);
    cells = builder(v).map((form) => ({ form, alts: [] }));
  }

  if (!v.refl) return cells;
  return cells.map((cell, i) => ({
    form: `${REFL_PRONOUNS[i]} ${cell.form}`,
    alts: cell.alts.map((a) => `${REFL_PRONOUNS[i]} ${a}`),
  }));
}

/** The full paradigm, for the reference tables. */
export function paradigm(v, tense) {
  return conjugate(v, tense).map((c) => c.form);
}
