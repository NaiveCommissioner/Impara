// Glossing support: the words that can't be derived from vocab.js or verbs.js.
//
// FUNCTION_WORDS covers the grammatical glue — articles, prepositions,
// pronouns, conjunctions, adverbs — which is most of what makes an example
// sentence unreadable when you only know a handful of nouns.
//
// Glosses are deliberately short. Where a word is genuinely ambiguous the
// gloss names both senses (la = "the / her"), because pretending otherwise
// teaches the wrong thing.

export const FUNCTION_WORDS = {
  // articles
  il: 'the', lo: 'the / it', la: 'the / her', "l'": 'the', i: 'the', gli: 'the / to him', le: 'the / to her',
  un: 'a', uno: 'a', una: 'a', "un'": 'a',

  // simple prepositions
  a: 'to / at', ad: 'to', di: 'of', da: 'from / by', in: 'in', su: 'on',
  con: 'with', per: 'for', tra: 'between', fra: 'between', senza: 'without',

  // articulated prepositions
  al: 'to the', allo: 'to the', "all'": 'to the', alla: 'to the', ai: 'to the', agli: 'to the', alle: 'to the',
  del: 'of the', dello: 'of the', "dell'": 'of the', della: 'of the', dei: 'of the', degli: 'of the', delle: 'of the',
  dal: 'from the', dallo: 'from the', "dall'": 'from the', dalla: 'from the', dai: 'from the', dagli: 'from the', dalle: 'from the',
  nel: 'in the', nello: 'in the', "nell'": 'in the', nella: 'in the', nei: 'in the', negli: 'in the', nelle: 'in the',
  sul: 'on the', sullo: 'on the', "sull'": 'on the', sulla: 'on the', sui: 'on the', sugli: 'on the', sulle: 'on the',

  // subject pronouns
  io: 'I', tu: 'you', lui: 'he', lei: 'she / you (formal)', noi: 'we', voi: 'you (pl.)', loro: 'they / their',

  // object, reflexive and stressed pronouns
  mi: 'me / myself', ti: 'you / yourself', si: 'himself / herself',
  ci: 'us / there', vi: 'you (pl.)', li: 'them',
  me: 'me', te: 'you', ne: 'of it',

  // possessives
  mio: 'my', mia: 'my', miei: 'my', mie: 'my',
  tuo: 'your', tua: 'your', tuoi: 'your', tue: 'your',
  suo: 'his / her', sua: 'his / her', suoi: 'his / her', sue: 'his / her',
  nostro: 'our', nostra: 'our', nostri: 'our', nostre: 'our',
  vostro: 'your', vostra: 'your', vostri: 'your', vostre: 'your',

  // demonstratives
  questo: 'this', questa: 'this', questi: 'these', queste: 'these',
  quello: 'that', quella: 'that', quelli: 'those', quelle: 'those',
  quel: 'that', quei: 'those', quegli: 'those',

  // question words
  chi: 'who', che: 'what / that', cosa: 'what', dove: 'where', quando: 'when',
  perché: 'why / because', come: 'how / as',
  quanto: 'how much', quanta: 'how much', quanti: 'how many', quante: 'how many',
  quale: 'which', quali: 'which',

  // conjunctions and connectives
  e: 'and', ed: 'and', o: 'or', ma: 'but', però: 'but', se: 'if',
  anche: 'also', invece: 'instead', quindi: 'so', allora: 'so / then',
  mentre: 'while', secondo: 'according to', purtroppo: 'unfortunately',

  // negation and quantity
  non: 'not', no: 'no', sì: 'yes',
  niente: 'nothing', nessuno: 'nobody', nulla: 'nothing',
  tutto: 'everything', tutta: 'all', tutti: 'everyone', tutte: 'all',
  ogni: 'every', qualche: 'some', alcuni: 'some', qualcosa: 'something', qualcuno: 'someone',
  più: 'more', meno: 'less', molto: 'very / a lot', molta: 'much', molti: 'many', molte: 'many',
  poco: 'little', poca: 'little', pochi: 'few', poche: 'few',
  troppo: 'too much', troppa: 'too much', troppi: 'too many', troppe: 'too many',
  tanto: 'so much', abbastanza: 'enough', basta: 'that’s enough',

  // time and place adverbs
  oggi: 'today', domani: 'tomorrow', ieri: 'yesterday', adesso: 'now', ora: 'now',
  sempre: 'always', mai: 'never', spesso: 'often', già: 'already', ancora: 'still / yet',
  presto: 'early', tardi: 'late', subito: 'straight away', stasera: 'this evening',
  qui: 'here', qua: 'here', lì: 'there', là: 'there', ecco: 'here is',
  dentro: 'inside', fuori: 'outside', sotto: 'under', sopra: 'above',
  davanti: 'in front of', dietro: 'behind', vicino: 'near', lontano: 'far',
  dopo: 'after', prima: 'before', insieme: 'together', solo: 'only / alone',
  bene: 'well', male: 'badly', così: 'so / like this', forse: 'maybe', davvero: 'really',
  scorso: 'last', prossimo: 'next',

  // elided forms the tokeniser leaves stranded
  "c'": 'there', "d'": 'of', "un'": 'a', "dov'": 'where', "n'": 'of it',

  // verbs used in examples that aren't in the conjugation drills
  piace: 'is pleasing', piacciono: 'are pleasing', piaciuto: 'pleased',
  telefono: 'I phone', telefonare: 'to phone', conoscerti: 'to meet you',
  dista: 'is far', chiami: 'you are called', chiamo: 'I am called',
  costa: 'costs', ceno: 'I have dinner', vada: 'go (formal)', giri: 'turn',
  richiamato: 'called back', perso: 'lost', incontrato: 'met',

  // proper nouns that appear in the examples
  marco: '(name)', anna: '(name)', maria: '(name)', marta: '(name)',
  roma: 'Rome', milano: 'Milan', firenze: 'Florence', verona: 'Verona',
  italia: 'Italy', sydney: 'Sydney',

  // shortened and inflected forms
  buon: 'good', buona: 'good', buone: 'good', buoni: 'good',
  favore: 'favour', ore: 'hours', anch: 'also', "anch'": 'also',
  bel: 'nice', uomini: 'men', piedi: 'feet',

  // words that only ever appear inside a multi-word phrase in the deck
  destra: 'right', sinistra: 'left', solito: 'usual', testa: 'head',
  mal: 'ache', estero: 'abroad', tempo: 'time / weather', giorno: 'day',
  cinema: 'cinema', euro: 'euros', dolce: 'sweet', gente: 'people',

  // verbs outside the drill list, and infinitives carrying a pronoun
  conoscere: 'to know (a person)', conosco: 'I know', conosci: 'you know',
  lavarsi: 'to wash', lavano: 'they wash', lavo: 'I wash',
  alzarmi: 'to get up (myself)', comprarlo: 'to buy it', vederlo: 'to see it',
  darmi: 'to give me', imparando: 'learning', sto: 'I am (feeling)',

  // conversation vocabulary
  "qualcos'": 'something', altro: 'else / other', altra: 'other',
  cornetto: 'croissant', giornata: 'day', serata: 'evening',
  carta: 'card', menù: 'menu', consiglia: 'recommends', ottimo: 'excellent',
  bottiglia: 'bottle', benissimo: 'very good', perfetto: 'perfect',
  doppia: 'double', notte: 'night', notti: 'nights', wifi: 'wifi',
  media: 'medium', camerino: 'fitting room', porta: 'takes / door',
  trenta: 'thirty', quaranta: 'forty', dodici: 'twelve',
  ritorno: 'return', binario: 'platform', orario: 'on time',
  speciale: 'special', volentieri: 'gladly', accordo: 'agreement',
  andata: 'one way', poi: 'then', momento: 'moment', esatto: 'exactly',
  verità: 'truth', radio: 'radio', vino: 'wine',

  // inflected forms of the everyday verbs (they carry meaning in the examples
  // but aren't in the conjugation drills, so nothing else indexes them)
  penso: 'I think', pensa: 'thinks', spero: 'I hope', sembra: 'it seems',
  serve: 'is needed', servono: 'are needed', funziona: 'works',
  successo: 'happened / success', scherzo: 'I joke / a joke', manca: 'is missing',
  costa: 'costs', basta: 'that’s enough', aiuta: 'helps',
  scrivimi: 'write to me', raccomando: 'urge / recommend',

  // words that only appear inside the fixed phrases
  bisogno: 'need', aiuto: 'help', bocca: 'mouth', lupo: 'wolf',
  crepi: '(the reply to in bocca al lupo)', attimo: 'moment',
  verso: 'towards / around', mezza: 'half', punto: 'point / dot',
  tanti: 'many', auguri: 'best wishes',
  piano: 'floor', primo: 'first', medicina: 'medicine',
  giulia: '(name)', napoli: 'Naples', rossi: '(surname)', firenze: 'Florence',

  // frequent leftovers from the example sentences
  signora: 'madam', signore: 'sir', mille: 'thousand', grazie: 'thank you',
  prego: 'you’re welcome', scusi: 'excuse me', scusa: 'sorry',
  italiano: 'Italian', italiana: 'Italian', inglese: 'English', tedesco: 'German',
  anni: 'years', anno: 'year', volta: 'time', cose: 'things',
  fame: 'hunger', sete: 'thirst', freddo: 'cold', caldo: 'hot', sonno: 'sleepiness', paura: 'fear',
  naturale: 'still (water)', rosso: 'red', bello: 'beautiful', brutto: 'ugly',
  grande: 'big', piccolo: 'small', alto: 'tall', largo: 'wide', nuovo: 'new',
  buonissima: 'delicious', film: 'film', aereo: 'plane', frigo: 'fridge',
  estate: 'summer', agosto: 'August', maggio: 'May', giardino: 'garden',
  tavolo: 'table', mani: 'hands', giornale: 'newspaper', dolci: 'sweets',
  spaghetti: 'spaghetti', problema: 'problem', tedesca: 'German',
};

// English simple past for each verb, used to gloss the passato prossimo.
// A six-item array covers verbs whose English past varies by person.
export const VERB_PAST = {
  essere: ['was', 'were', 'was', 'were', 'were', 'were'],
  avere: 'had', fare: 'did', andare: 'went', stare: 'stayed',
  parlare: 'spoke', abitare: 'lived', mangiare: 'ate', lavorare: 'worked',
  dormire: 'slept', capire: 'understood', potere: 'could', volere: 'wanted',
  dovere: 'had to', sapere: 'knew', dire: 'said', venire: 'came', uscire: 'went out',
  dare: 'gave', bere: 'drank', comprare: 'bought', guardare: 'watched',
  aspettare: 'waited for', studiare: 'studied', cercare: 'looked for', pagare: 'paid',
  tornare: 'came back', arrivare: 'arrived', partire: 'left', prendere: 'took',
  vedere: 'saw', finire: 'finished', preferire: 'preferred', leggere: 'read',
  scrivere: 'wrote', mettere: 'put', chiudere: 'closed', aprire: 'opened',
  offrire: 'offered', sentire: 'heard', credere: 'believed', vendere: 'sold',
  pulire: 'cleaned', rimanere: 'stayed', tenere: 'held', scegliere: 'chose',
  chiamarsi: 'was called', svegliarsi: 'woke up', alzarsi: 'got up',
  divertirsi: 'had fun',
};
