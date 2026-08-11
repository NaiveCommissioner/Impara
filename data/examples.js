// Complement frames used to build an example sentence for any conjugated form.
//
// A frame is whatever follows the verb. Combined with a subject pronoun, the
// conjugated form and a tense adverb, it yields a natural sentence for every
// verb × tense × person — 1,500 examples from 50 lines of data.
//
// Frames deliberately avoid adjectives: "sono stanco" would need to become
// "siamo stanchi" for noi, and agreement is not what these cards are teaching.
// Prepositional phrases and plain nouns work for every person unchanged.

export const VERB_FRAMES = {
  essere: { it: 'a casa', en: 'at home' },
  avere: { it: 'una macchina', en: 'a car' },
  // Not "colazione": fare glosses as "do", and "I do breakfast" reads wrong in
  // every tense. Homework is idiomatic with fare in both languages.
  fare: { it: 'i compiti', en: 'the homework' },
  andare: { it: 'a Roma', en: 'to Rome' },
  stare: { it: 'bene', en: 'well' },

  parlare: { it: 'italiano', en: 'Italian' },
  abitare: { it: 'a Milano', en: 'in Milan' },
  mangiare: { it: 'una pizza', en: 'a pizza' },
  lavorare: { it: 'in ufficio', en: 'in the office' },
  dormire: { it: 'bene', en: 'well' },
  capire: { it: 'tutto', en: 'everything' },

  // Modals already end in "to" ("is able to", "has to"), so their complement
  // must not repeat it.
  potere: { it: 'partire', en: 'leave' },
  volere: { it: 'un caffè', en: 'a coffee' },
  dovere: { it: 'studiare', en: 'study' },
  sapere: { it: 'la risposta', en: 'the answer' },
  dire: { it: 'la verità', en: 'the truth' },
  venire: { it: 'con noi', en: 'with us' },
  uscire: { it: 'con gli amici', en: 'with friends' },
  dare: { it: 'un libro a Marco', en: 'a book to Marco' },
  bere: { it: 'un caffè', en: 'a coffee' },

  comprare: { it: 'il pane', en: 'the bread' },
  guardare: { it: 'un film', en: 'a film' },
  aspettare: { it: 'il treno', en: 'the train' },
  studiare: { it: 'l’italiano', en: 'Italian' },
  cercare: { it: 'le chiavi', en: 'the keys' },
  pagare: { it: 'il conto', en: 'the bill' },
  tornare: { it: 'a casa', en: 'home' },
  arrivare: { it: 'in ritardo', en: 'late' },
  partire: { it: 'per Roma', en: 'for Rome' },
  prendere: { it: 'il treno', en: 'the train' },
  vedere: { it: 'un film', en: 'a film' },
  finire: { it: 'il lavoro', en: 'the work' },
  preferire: { it: 'il caffè', en: 'coffee' },

  leggere: { it: 'un libro', en: 'a book' },
  scrivere: { it: 'a mia sorella', en: 'to my sister' },
  mettere: { it: 'le chiavi sul tavolo', en: 'the keys on the table' },
  chiudere: { it: 'la porta', en: 'the door' },
  aprire: { it: 'la finestra', en: 'the window' },
  offrire: { it: 'un caffè', en: 'a coffee' },
  sentire: { it: 'la radio', en: 'the radio' },
  credere: { it: 'di sì', en: 'so' },
  vendere: { it: 'la macchina', en: 'the car' },
  pulire: { it: 'la casa', en: 'the house' },
  rimanere: { it: 'a casa', en: 'at home' },
  tenere: { it: 'le chiavi', en: 'the keys' },
  scegliere: { it: 'il vino', en: 'the wine' },

  // A surname works for every person — "Io mi chiamo Rossi" and "Loro si
  // chiamano Rossi" are both natural, where a first name is not.
  chiamarsi: { it: 'Rossi', en: 'Rossi' },
  svegliarsi: { it: 'presto', en: 'early' },
  alzarsi: { it: 'alle sette', en: 'at seven' },
  divertirsi: { it: 'in vacanza', en: 'on holiday' },
};

// A time adverb per tense, so the example doesn't just show the form — it
// shows what the tense is *for*.
export const TENSE_ADVERBS = {
  presente: { it: '', en: '' },
  progressivo: { it: 'adesso', en: 'right now' },
  passato: { it: 'ieri', en: 'yesterday' },
  imperfetto: { it: 'spesso', en: 'often' },
  futuro: { it: 'domani', en: 'tomorrow' },
  condizionale: { it: 'volentieri', en: 'gladly' },
};

// Subjects for the example sentence. "lui" stands in for the lui/lei row so
// the sentence reads naturally.
export const EXAMPLE_SUBJECTS = ['io', 'tu', 'lui', 'noi', 'voi', 'loro'];
