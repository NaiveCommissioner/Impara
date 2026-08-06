// Scripted conversations — the connected-speech half of the course.
//
// Each line becomes a card you rebuild from word tiles, so you practise word
// order and whole utterances rather than isolated words. Lines are learned in
// order within a conversation, and always with the preceding line as context.
//
// Vocabulary deliberately leans on the units, but a conversation is allowed to
// reach slightly beyond them — the teaching step shows the full line with a
// word-by-word gloss before anything is asked of you.

export const DIALOGUES = [
  {
    id: 'd1',
    title: 'Al bar',
    en: 'At the café',
    blurb: 'Ordering a coffee and paying — the most-rehearsed 40 seconds in Italy.',
    lines: [
      { s: 'A', it: 'Buongiorno! Un caffè, per favore.', en: 'Good morning! A coffee, please.' },
      { s: 'B', it: 'Certo. Qualcos’altro?', en: 'Of course. Anything else?' },
      { s: 'A', it: 'Sì, anche un cornetto.', en: 'Yes, a croissant as well.' },
      { s: 'B', it: 'Va bene. Sono tre euro.', en: "That's fine. That's three euros." },
      { s: 'A', it: 'Posso pagare con la carta?', en: 'Can I pay by card?' },
      { s: 'B', it: 'Certo, prego.', en: 'Of course, go ahead.' },
      { s: 'A', it: 'Grazie mille!', en: 'Thanks very much!' },
      { s: 'B', it: 'Grazie a lei. Buona giornata!', en: 'Thank you. Have a good day!' },
    ],
  },
  {
    id: 'd2',
    title: 'Fare conoscenza',
    en: 'Getting to know someone',
    blurb: 'Names, where you are from, what you do.',
    lines: [
      { s: 'A', it: 'Ciao! Come ti chiami?', en: "Hi! What's your name?" },
      { s: 'B', it: 'Mi chiamo Giulia. E tu?', en: "My name is Giulia. And you?" },
      { s: 'A', it: 'Io sono Marco. Piacere!', en: 'I am Marco. Nice to meet you!' },
      { s: 'B', it: 'Piacere mio. Di dove sei?', en: 'My pleasure. Where are you from?' },
      { s: 'A', it: 'Sono di Napoli, ma abito a Milano.', en: 'I am from Naples, but I live in Milan.' },
      { s: 'B', it: 'Che lavoro fai?', en: 'What work do you do?' },
      { s: 'A', it: 'Sono insegnante. E tu?', en: 'I am a teacher. And you?' },
      { s: 'B', it: 'Studio medicina all’università.', en: 'I study medicine at university.' },
    ],
  },
  {
    id: 'd3',
    title: 'Chiedere indicazioni',
    en: 'Asking for directions',
    blurb: 'Finding the station, and understanding the answer.',
    lines: [
      { s: 'A', it: 'Scusi, dov’è la stazione?', en: 'Excuse me, where is the station?' },
      { s: 'B', it: 'È vicino, dieci minuti a piedi.', en: "It's near, ten minutes on foot." },
      { s: 'A', it: 'Come ci arrivo?', en: 'How do I get there?' },
      { s: 'B', it: 'Vada sempre dritto e poi giri a destra.', en: 'Go straight ahead and then turn right.' },
      { s: 'A', it: 'Dopo il ponte?', en: 'After the bridge?' },
      { s: 'B', it: 'Sì, subito dopo il ponte.', en: 'Yes, just after the bridge.' },
      { s: 'A', it: 'Grazie mille!', en: 'Thank you very much!' },
      { s: 'B', it: 'Di niente. Buon viaggio!', en: "You're welcome. Have a good trip!" },
    ],
  },
  {
    id: 'd4',
    title: 'Al ristorante',
    en: 'At the restaurant',
    blurb: 'A table, the menu, and ordering without pointing.',
    lines: [
      { s: 'A', it: 'Buonasera, avete un tavolo per due?', en: 'Good evening, do you have a table for two?' },
      { s: 'B', it: 'Certo, prego. Ecco il menù.', en: 'Of course, this way. Here is the menu.' },
      { s: 'A', it: 'Grazie. Che cosa ci consiglia?', en: 'Thank you. What do you recommend?' },
      { s: 'B', it: 'Oggi il pesce è ottimo.', en: 'The fish is excellent today.' },
      { s: 'A', it: 'Allora prendo il pesce, grazie.', en: "Then I'll have the fish, thank you." },
      { s: 'B', it: 'E da bere?', en: 'And to drink?' },
      { s: 'A', it: 'Una bottiglia di acqua naturale.', en: 'A bottle of still water.' },
      { s: 'B', it: 'Benissimo, arrivo subito.', en: "Very good, I'll be right back." },
    ],
  },
  {
    id: 'd5',
    title: 'In albergo',
    en: 'At the hotel',
    blurb: 'Checking in, and finding out when breakfast is.',
    lines: [
      { s: 'A', it: 'Buonasera, ho una prenotazione.', en: 'Good evening, I have a booking.' },
      { s: 'B', it: 'A che nome, scusi?', en: 'Under what name, sorry?' },
      { s: 'A', it: 'Rossi. Una camera doppia per tre notti.', en: 'Rossi. A double room for three nights.' },
      { s: 'B', it: 'Perfetto. Ecco la chiave.', en: 'Perfect. Here is the key.' },
      { s: 'A', it: 'A che ora è la colazione?', en: 'What time is breakfast?' },
      { s: 'B', it: 'Dalle sette alle dieci.', en: 'From seven to ten.' },
      { s: 'A', it: 'C’è il wifi in camera?', en: 'Is there wifi in the room?' },
      { s: 'B', it: 'Sì, certo. Buona serata!', en: 'Yes, of course. Have a good evening!' },
    ],
  },
  {
    id: 'd6',
    title: 'Al negozio',
    en: 'At the shop',
    blurb: 'Trying something on, asking the price, paying.',
    lines: [
      { s: 'A', it: 'Buongiorno, posso provare questa camicia?', en: 'Good morning, can I try this shirt on?' },
      { s: 'B', it: 'Certo. Che taglia porta?', en: 'Of course. What size do you take?' },
      { s: 'A', it: 'La media, credo.', en: 'Medium, I think.' },
      { s: 'B', it: 'Ecco a lei. Il camerino è là.', en: 'Here you are. The fitting room is over there.' },
      { s: 'A', it: 'Mi sta bene. La prendo.', en: 'It fits me well. I’ll take it.' },
      { s: 'B', it: 'Benissimo. Sono trenta euro.', en: 'Very good. That’s thirty euros.' },
      { s: 'A', it: 'Posso pagare in contanti?', en: 'Can I pay in cash?' },
      { s: 'B', it: 'Come preferisce.', en: 'As you prefer.' },
    ],
  },
  {
    id: 'd7',
    title: 'Alla stazione',
    en: 'At the station',
    blurb: 'Buying a ticket, and understanding the platform.',
    lines: [
      { s: 'A', it: 'Vorrei un biglietto per Firenze.', en: 'I would like a ticket to Florence.' },
      { s: 'B', it: 'Solo andata o andata e ritorno?', en: 'One way or return?' },
      { s: 'A', it: 'Andata e ritorno, per favore.', en: 'Return, please.' },
      { s: 'B', it: 'A che ora vuole partire?', en: 'What time do you want to leave?' },
      { s: 'A', it: 'Il prossimo treno va bene.', en: 'The next train is fine.' },
      { s: 'B', it: 'Parte alle dieci dal binario tre.', en: 'It leaves at ten from platform three.' },
      { s: 'A', it: 'Il treno è in ritardo?', en: 'Is the train late?' },
      { s: 'B', it: 'No, è in orario.', en: 'No, it is on time.' },
    ],
  },
  {
    id: 'd8',
    title: 'Fare programmi',
    en: 'Making plans',
    blurb: 'Inviting someone out and agreeing a time.',
    lines: [
      { s: 'A', it: 'Che fai stasera?', en: 'What are you doing this evening?' },
      { s: 'B', it: 'Niente di speciale. Perché?', en: 'Nothing special. Why?' },
      { s: 'A', it: 'Andiamo al cinema?', en: 'Shall we go to the cinema?' },
      { s: 'B', it: 'Volentieri! A che ora?', en: 'Gladly! At what time?' },
      { s: 'A', it: 'Alle otto, va bene?', en: 'At eight, is that all right?' },
      { s: 'B', it: 'Perfetto. Ci vediamo davanti al cinema.', en: "Perfect. See you in front of the cinema." },
      { s: 'A', it: 'D’accordo. A dopo!', en: 'Agreed. See you later!' },
      { s: 'B', it: 'A dopo!', en: 'See you later!' },
    ],
  },
];

export function findDialogue(id) {
  return DIALOGUES.find((d) => d.id === id);
}

/** Words used for tile distractors: everything else said in this conversation. */
export function dialogueVocabulary(dialogue) {
  const words = new Set();
  for (const line of dialogue.lines) {
    for (const w of line.it.split(/\s+/)) {
      const clean = w.replace(/[.,!?;:¿¡"]/g, '');
      if (clean.length > 2) words.add(clean);
    }
  }
  return [...words];
}
