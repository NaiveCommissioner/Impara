// Verb inventory. Regular verbs carry only their conjugation class; the
// conjugator derives every form. Irregulars declare exactly what breaks.
//
//   type : 'are' | 'ere' | 'ire' | 'isc'   (isc = -ire verbs taking -isc-)
//   aux  : 'avere' | 'essere'              (auxiliary for the passato prossimo)
//   pp   : irregular past participle
//   pres : full six irregular present forms
//   impStem : stem for the imperfetto when it is not (infinitive - 're')
//   futStem : stem for the futuro / condizionale when it is not regular
//   refl : reflexive (infinitive ends in -si)
//   tier : 1 = essential, 2 = very common, 3 = broadening out
//          Verbs are introduced in tier order.

export const VERBS = [
  // ---- tier 1: the load-bearing irregulars -------------------------------
  { inf: 'essere', en: 'to be', type: 'ere', aux: 'essere', pp: 'stato', tier: 1,
    pres: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
    imperf: ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'], futStem: 'sar' },
  { inf: 'avere', en: 'to have', type: 'ere', aux: 'avere', tier: 1,
    pres: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'], futStem: 'avr' },
  { inf: 'fare', en: 'to do / to make', type: 'are', aux: 'avere', pp: 'fatto', tier: 1,
    pres: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'], impStem: 'face', futStem: 'far' },
  { inf: 'andare', en: 'to go', type: 'are', aux: 'essere', tier: 1,
    pres: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'], futStem: 'andr' },
  { inf: 'stare', en: 'to stay / to be (feel)', type: 'are', aux: 'essere', pp: 'stato', tier: 1,
    pres: ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'], futStem: 'star' },

  // ---- tier 1: regular workhorses ---------------------------------------
  { inf: 'parlare', en: 'to speak', type: 'are', aux: 'avere', tier: 1 },
  { inf: 'abitare', en: 'to live (reside)', type: 'are', aux: 'avere', tier: 1 },
  { inf: 'mangiare', en: 'to eat', type: 'are', aux: 'avere', tier: 1 },
  { inf: 'lavorare', en: 'to work', type: 'are', aux: 'avere', tier: 1 },
  { inf: 'dormire', en: 'to sleep', type: 'ire', aux: 'avere', tier: 1 },
  { inf: 'capire', en: 'to understand', type: 'isc', aux: 'avere', tier: 1 },

  // ---- tier 2: modals and high-frequency irregulars ----------------------
  { inf: 'potere', en: 'to be able to / can', type: 'ere', aux: 'avere', tier: 2,
    pres: ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono'], futStem: 'potr' },
  { inf: 'volere', en: 'to want', type: 'ere', aux: 'avere', tier: 2,
    pres: ['voglio', 'vuoi', 'vuole', 'vogliamo', 'volete', 'vogliono'], futStem: 'vorr' },
  { inf: 'dovere', en: 'to have to / must', type: 'ere', aux: 'avere', tier: 2,
    pres: ['devo', 'devi', 'deve', 'dobbiamo', 'dovete', 'devono'], futStem: 'dovr' },
  { inf: 'sapere', en: 'to know (a fact)', type: 'ere', aux: 'avere', tier: 2,
    pres: ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno'], futStem: 'sapr' },
  { inf: 'dire', en: 'to say / to tell', type: 'ire', aux: 'avere', pp: 'detto', tier: 2,
    pres: ['dico', 'dici', 'dice', 'diciamo', 'dite', 'dicono'], impStem: 'dice', futStem: 'dir' },
  { inf: 'venire', en: 'to come', type: 'ire', aux: 'essere', pp: 'venuto', tier: 2,
    pres: ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono'], futStem: 'verr' },
  { inf: 'uscire', en: 'to go out', type: 'ire', aux: 'essere', tier: 2,
    pres: ['esco', 'esci', 'esce', 'usciamo', 'uscite', 'escono'] },
  { inf: 'dare', en: 'to give', type: 'are', aux: 'avere', tier: 2,
    pres: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'], futStem: 'dar' },
  { inf: 'bere', en: 'to drink', type: 'ere', aux: 'avere', pp: 'bevuto', tier: 2,
    pres: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'], impStem: 'beve', futStem: 'berr' },

  // ---- tier 2: regular, everyday ----------------------------------------
  { inf: 'comprare', en: 'to buy', type: 'are', aux: 'avere', tier: 2 },
  { inf: 'guardare', en: 'to watch / to look at', type: 'are', aux: 'avere', tier: 2 },
  { inf: 'aspettare', en: 'to wait for', type: 'are', aux: 'avere', tier: 2 },
  { inf: 'studiare', en: 'to study', type: 'are', aux: 'avere', tier: 2 },
  { inf: 'cercare', en: 'to look for', type: 'are', aux: 'avere', tier: 2 },
  { inf: 'pagare', en: 'to pay', type: 'are', aux: 'avere', tier: 2 },
  { inf: 'tornare', en: 'to return / to come back', type: 'are', aux: 'essere', tier: 2 },
  { inf: 'arrivare', en: 'to arrive', type: 'are', aux: 'essere', tier: 2 },
  { inf: 'partire', en: 'to leave / to depart', type: 'ire', aux: 'essere', tier: 2 },
  { inf: 'prendere', en: 'to take / to have (food)', type: 'ere', aux: 'avere', pp: 'preso', tier: 2 },
  { inf: 'vedere', en: 'to see', type: 'ere', aux: 'avere', pp: 'visto', futStem: 'vedr', tier: 2 },
  { inf: 'finire', en: 'to finish', type: 'isc', aux: 'avere', tier: 2 },
  { inf: 'preferire', en: 'to prefer', type: 'isc', aux: 'avere', tier: 2 },

  // ---- tier 3 ------------------------------------------------------------
  { inf: 'leggere', en: 'to read', type: 'ere', aux: 'avere', pp: 'letto', tier: 3 },
  { inf: 'scrivere', en: 'to write', type: 'ere', aux: 'avere', pp: 'scritto', tier: 3 },
  { inf: 'mettere', en: 'to put', type: 'ere', aux: 'avere', pp: 'messo', tier: 3 },
  { inf: 'chiudere', en: 'to close', type: 'ere', aux: 'avere', pp: 'chiuso', tier: 3 },
  { inf: 'aprire', en: 'to open', type: 'ire', aux: 'avere', pp: 'aperto', tier: 3 },
  { inf: 'offrire', en: 'to offer', type: 'ire', aux: 'avere', pp: 'offerto', tier: 3 },
  { inf: 'sentire', en: 'to hear / to feel', type: 'ire', aux: 'avere', tier: 3 },
  { inf: 'credere', en: 'to believe', type: 'ere', aux: 'avere', tier: 3 },
  { inf: 'vendere', en: 'to sell', type: 'ere', aux: 'avere', tier: 3 },
  { inf: 'pulire', en: 'to clean', type: 'isc', aux: 'avere', tier: 3 },
  { inf: 'rimanere', en: 'to stay / to remain', type: 'ere', aux: 'essere', pp: 'rimasto', tier: 3,
    pres: ['rimango', 'rimani', 'rimane', 'rimaniamo', 'rimanete', 'rimangono'], futStem: 'rimarr' },
  { inf: 'tenere', en: 'to hold / to keep', type: 'ere', aux: 'avere', tier: 3,
    pres: ['tengo', 'tieni', 'tiene', 'teniamo', 'tenete', 'tengono'], futStem: 'terr' },
  { inf: 'scegliere', en: 'to choose', type: 'ere', aux: 'avere', pp: 'scelto', tier: 3,
    pres: ['scelgo', 'scegli', 'sceglie', 'scegliamo', 'scegliete', 'scelgono'] },

  // ---- tier 3: reflexives ------------------------------------------------
  { inf: 'chiamarsi', en: 'to be called', type: 'are', aux: 'essere', refl: true, tier: 3 },
  { inf: 'svegliarsi', en: 'to wake up', type: 'are', aux: 'essere', refl: true, tier: 3 },
  { inf: 'alzarsi', en: 'to get up', type: 'are', aux: 'essere', refl: true, tier: 3 },
  // "to have fun" rather than "to enjoy oneself": the English reflexive would
  // have to agree with the subject, which the gloss generator can't do.
  { inf: 'divertirsi', en: 'to have fun', type: 'ire', aux: 'essere', refl: true, tier: 3 },
];

export const TENSES = [
  { id: 'presente', label: 'Presente', en: 'present', hint: 'io parlo — I speak / I am speaking' },
  { id: 'passato', label: 'Passato prossimo', en: 'perfect past', hint: 'io ho parlato — I spoke / I have spoken' },
  { id: 'imperfetto', label: 'Imperfetto', en: 'imperfect', hint: 'io parlavo — I used to speak / I was speaking' },
  { id: 'futuro', label: 'Futuro semplice', en: 'future', hint: 'io parlerò — I will speak' },
  { id: 'condizionale', label: 'Condizionale', en: 'conditional', hint: 'io parlerei — I would speak' },
];

export const PERSONS = [
  { id: 0, label: 'io', en: 'I' },
  { id: 1, label: 'tu', en: 'you (sing.)' },
  { id: 2, label: 'lui / lei', en: 'he / she' },
  { id: 3, label: 'noi', en: 'we' },
  { id: 4, label: 'voi', en: 'you (pl.)' },
  { id: 5, label: 'loro', en: 'they' },
];

export function findVerb(inf) {
  return VERBS.find((v) => v.inf === inf);
}
