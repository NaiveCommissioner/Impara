// Grammar lessons. Each lesson is a short note you can read in under a minute,
// followed by fill-in-the-blank items that become scheduled cards.
//
// prompt : the sentence, with ___ marking the blank
// answer : the canonical answer
// alts   : other answers accepted as correct
// hint   : shown under the prompt (usually the word to transform)

export const LESSONS = [
  {
    // Deliberately first: the conjugation drills label every form with io/tu/
    // lui/noi/voi/loro from the very first card, so these have to land early.
    id: 'g0',
    title: 'Subject pronouns — and when to drop them',
    note: `<table class="g-table">
        <tr><th>io</th><td>I</td><th>noi</th><td>we</td></tr>
        <tr><th>tu</th><td>you (one person, informal)</td><th>voi</th><td>you (more than one)</td></tr>
        <tr><th>lui / lei</th><td>he / she</td><th>loro</th><td>they</td></tr>
        <tr><th>Lei</th><td colspan="3">you (one person, <b>formal</b>) — takes the same verb form as <i>lui/lei</i></td></tr>
      </table>
      <b>Italian normally leaves them out.</b> The verb ending already says who is
      speaking, so <i>parlo italiano</i> is the natural sentence — <i>io parlo italiano</i>
      sounds like you're making a point of it.<br><br>
      Put the pronoun back in when you want contrast or emphasis:
      <i>Io parlo italiano, lui parla solo inglese.</i><br><br>
      <b>The formal Lei</b> is how you address a stranger, a shopkeeper, anyone older.
      It's grammatically third person: <i>Lei come sta?</i> (not <i>come stai</i>).
      Written with a capital L to distinguish it from <i>lei</i> = she.<br><br>
      <b>voi</b> covers every "you plural", formal or not. <b>loro</b> covers a group
      of any gender — a mixed group is still <i>loro</i>.`,
    // Ordered io → tu → lui/lei → noi → voi → loro, matching the order the
    // conjugation drills walk through the persons.
    exercises: [
      { prompt: '___ parlo italiano, ma lui parla solo inglese.', answer: 'Io', alts: ['io'], hint: 'I — the contrast is why the pronoun is there at all' },
      { prompt: '___ sei molto simpatico!', answer: 'Tu', alts: ['tu'], hint: 'you — one person, informal' },
      { prompt: 'Maria è mia sorella. ___ abita a Roma.', answer: 'Lei', alts: ['lei'], hint: 'she' },
      { prompt: 'Marco e io siamo amici. ___ studiamo insieme.', answer: 'Noi', alts: ['noi'], hint: 'we' },
      { prompt: '___ siete italiani?', answer: 'Voi', alts: ['voi'], hint: 'you — more than one person' },
      { prompt: 'Anna e Marco sono in ritardo: ___ arrivano alle nove.', answer: 'loro', alts: ['Loro'], hint: 'they' },
      { prompt: 'Scusi, ___ come si chiama?', answer: 'Lei', alts: ['lei'], hint: 'the formal "you" — addressing a stranger politely' },
      { prompt: '___ italiano. (say "I speak Italian" the natural way — no pronoun)', answer: 'parlo', hint: 'drop the pronoun — the verb ending already carries it' },
    ],
  },
  {
    id: 'g1',
    title: 'The definite article',
    note: `Italian nouns have gender, and the article tells you which:
      <ul>
        <li><b>il</b> before most masculine singular nouns — <i>il pane</i></li>
        <li><b>lo</b> before masculine nouns starting with <i>s+consonant, z, ps, gn, y</i> — <i>lo zucchero, lo studente</i></li>
        <li><b>l’</b> before any singular noun starting with a vowel — <i>l’acqua, l’amico</i></li>
        <li><b>la</b> before feminine singular nouns — <i>la casa</i></li>
      </ul>
      Plurals: <b>il → i</b>, <b>lo/l’ (m) → gli</b>, <b>la/l’ (f) → le</b>.`,
    exercises: [
      { prompt: '___ zucchero è sul tavolo.', answer: 'Lo', alts: ['lo'], hint: 'zucchero — masculine, starts with z' },
      { prompt: '___ acqua è fredda.', answer: 'L’', alts: ["L'", 'l’', "l'"], hint: 'acqua — feminine, starts with a vowel' },
      { prompt: '___ amici di Marco sono simpatici.', answer: 'Gli', alts: ['gli'], hint: 'plural of l’amico' },
      { prompt: '___ ragazze parlano italiano.', answer: 'Le', alts: ['le'], hint: 'plural of la ragazza' },
      { prompt: '___ treni sono in ritardo.', answer: 'I', alts: ['i'], hint: 'plural of il treno' },
      { prompt: '___ studente arriva domani.', answer: 'Lo', alts: ['lo'], hint: 's + consonant' },
    ],
  },
  {
    id: 'g2',
    title: 'Plurals of nouns',
    note: `Change the ending, not the word:
      <ul>
        <li>masculine <b>-o → -i</b> — <i>il libro → i libri</i></li>
        <li>feminine <b>-a → -e</b> — <i>la casa → le case</i></li>
        <li>either gender <b>-e → -i</b> — <i>il pane → i pani</i>, <i>la chiave → le chiavi</i></li>
      </ul>
      Words ending in an accented vowel (<i>la città</i>) or a consonant (<i>il computer</i>) don’t change:
      <i>le città, i computer</i>. Keep the sound: <i>l’amico → gli amici</i>, but <i>il lago → i laghi</i>.`,
    exercises: [
      { prompt: 'un libro → due ___', answer: 'libri', hint: 'libro = book · -o → -i' },
      { prompt: 'una sedia → tre ___', answer: 'sedie', hint: 'sedia = chair · -a → -e' },
      { prompt: 'una chiave → due ___', answer: 'chiavi', hint: 'chiave = key · -e → -i' },
      { prompt: 'una città → molte ___', answer: 'città', hint: 'città = city · accented ending' },
      { prompt: 'un lago → due ___', answer: 'laghi', hint: 'lago = lake · keep the hard g sound' },
      { prompt: 'un amico → molti ___', answer: 'amici', hint: 'amico = friend · the c softens here' },
    ],
  },
  {
    id: 'g3',
    title: 'essere and avere',
    note: `<b>essere</b>: sono, sei, è, siamo, siete, sono — identity, origin, characteristics.<br>
      <b>avere</b>: ho, hai, ha, abbiamo, avete, hanno — possession.<br><br>
      Italian uses <b>avere</b> where English uses "to be" for states of the body:
      <i>ho fame</i> (I’m hungry), <i>ho sete</i>, <i>ho freddo</i>, <i>ho caldo</i>, <i>ho sonno</i>,
      <i>ho paura</i>, and for age: <i>ho trent’anni</i> (I’m thirty).`,
    exercises: [
      { prompt: 'Marco ___ italiano.', answer: 'è', hint: 'essere, lui' },
      { prompt: 'Noi ___ due figli.', answer: 'abbiamo', hint: 'avere, noi' },
      { prompt: 'Io ___ fame!', answer: 'ho', hint: 'hunger takes avere' },
      { prompt: 'Quanti anni ___ tu?', answer: 'hai', hint: 'age takes avere' },
      { prompt: 'Voi ___ di Roma?', answer: 'siete', hint: 'origin takes essere' },
      { prompt: 'Loro ___ stanchi oggi.', answer: 'sono', hint: 'essere, loro' },
    ],
  },
  {
    id: 'g4',
    title: 'Adjective agreement',
    note: `Adjectives match the noun in gender and number, and usually follow it.<br><br>
      Four-form adjectives (<i>alto</i>): alto, alta, alti, alte.<br>
      Two-form adjectives ending in <b>-e</b> (<i>grande</i>): grande, grandi — same for both genders.<br><br>
      A mixed group is masculine plural: <i>Marco e Anna sono italiani.</i>
      A handful of adjectives normally go before the noun: <i>bello, buono, grande, piccolo, giovane, vecchio</i>.`,
    exercises: [
      { prompt: 'La pizza è ___ (buono).', answer: 'buona', hint: 'buono = good · pizza is feminine singular' },
      { prompt: 'I ragazzi sono ___ (alto).', answer: 'alti', hint: 'alto = tall · masculine plural' },
      { prompt: 'Le case sono ___ (piccolo).', answer: 'piccole', hint: 'piccolo = small · feminine plural' },
      { prompt: 'Questa strada è molto ___ (largo).', answer: 'larga', hint: 'largo = wide · strada is feminine singular' },
      { prompt: 'Anna e Marco sono ___ (simpatico).', answer: 'simpatici', hint: 'simpatico = nice · a mixed group is masculine' },
      { prompt: 'Le mie amiche sono ___ (giovane).', answer: 'giovani', hint: 'giovane = young · -e adjective, plural' },
    ],
  },
  {
    id: 'g5',
    title: 'Prepositions with articles',
    note: `Five prepositions fuse with the definite article:
      <table class="g-table">
        <tr><th></th><th>il</th><th>lo</th><th>l’</th><th>la</th><th>i</th><th>gli</th><th>le</th></tr>
        <tr><th>a</th><td>al</td><td>allo</td><td>all’</td><td>alla</td><td>ai</td><td>agli</td><td>alle</td></tr>
        <tr><th>di</th><td>del</td><td>dello</td><td>dell’</td><td>della</td><td>dei</td><td>degli</td><td>delle</td></tr>
        <tr><th>da</th><td>dal</td><td>dallo</td><td>dall’</td><td>dalla</td><td>dai</td><td>dagli</td><td>dalle</td></tr>
        <tr><th>in</th><td>nel</td><td>nello</td><td>nell’</td><td>nella</td><td>nei</td><td>negli</td><td>nelle</td></tr>
        <tr><th>su</th><td>sul</td><td>sullo</td><td>sull’</td><td>sulla</td><td>sui</td><td>sugli</td><td>sulle</td></tr>
      </table>
      <b>con</b> and <b>per</b> stay separate: <i>con il treno, per la famiglia</i>.`,
    exercises: [
      { prompt: 'Vado ___ (a + il) mercato.', answer: 'al' },
      { prompt: 'Il libro è ___ (su + la) sedia.', answer: 'sulla' },
      { prompt: 'Torno ___ (da + il) lavoro alle sei.', answer: 'dal' },
      { prompt: 'Le chiavi sono ___ (in + la) borsa.', answer: 'nella' },
      { prompt: 'È la casa ___ (di + i) miei genitori.', answer: 'dei' },
      { prompt: 'Parlo ___ (a + gli) studenti.', answer: 'agli' },
      { prompt: 'C’è del latte ___ (in + il) frigo.', answer: 'nel' },
    ],
  },
  {
    id: 'g6',
    title: 'a, in, da: where and when',
    note: `<b>a</b> + cities and small places: <i>a Roma, a casa, al bar, a letto</i>.<br>
      <b>in</b> + countries, regions, and most rooms/buildings ending in -ia: <i>in Italia, in centro, in ufficio, in banca, in farmacia</i>.<br>
      <b>in</b> + transport: <i>in treno, in macchina</i> — but <i>a piedi</i>.<br>
      <b>da</b> + a person or their place: <i>da Marco, dal medico</i>. Also "since/for": <i>Studio italiano da due mesi.</i><br>
      Times use <b>a</b>: <i>alle otto</i>. Months use <b>a/in</b>: <i>a maggio</i>.`,
    exercises: [
      { prompt: 'Abito ___ Milano.', answer: 'a', hint: 'a city' },
      { prompt: 'Vado ___ Italia in estate.', answer: 'in', hint: 'a country' },
      { prompt: 'Stasera andiamo ___ Marco.', answer: 'da', hint: "to someone's place" },
      { prompt: 'Vado al lavoro ___ treno.', answer: 'in', hint: 'transport' },
      { prompt: 'Ci vediamo ___ otto.', answer: 'alle', hint: 'a + le, clock time' },
      { prompt: 'Studio italiano ___ tre mesi.', answer: 'da', hint: '"for" a stretch of time' },
    ],
  },
  {
    id: 'g7',
    title: 'c’è and ci sono',
    note: `<b>c’è</b> = there is (one thing), <b>ci sono</b> = there are (several).<br>
      <i>C’è un problema. Ci sono due camere.</i><br><br>
      Negative: <i>Non c’è nessuno.</i> Question: <i>C’è il signor Rossi?</i><br>
      Don't confuse it with <b>è</b> (it is): <i>È un problema</i> = "it is a problem",
      <i>C’è un problema</i> = "there is a problem".`,
    exercises: [
      { prompt: '___ molta gente in piazza.', answer: 'C’è', alts: ["C'è", 'c’è', "c'è"], hint: 'gente is grammatically singular, however many people it means' },
      { prompt: '___ un buon ristorante qui vicino?', answer: 'C’è', alts: ["C'è", 'c’è', "c'è"], hint: 'one restaurant' },
      { prompt: 'Nel frigo ___ due birre.', answer: 'ci sono', alts: ['Ci sono'], hint: 'two beers' },
      { prompt: 'Non ___ nessuno in ufficio.', answer: 'c’è', alts: ["c'è", 'C’è', "C'è"], hint: 'nessuno is singular' },
      { prompt: 'Quante camere ___ nell’albergo?', answer: 'ci sono', alts: ['Ci sono'], hint: 'several rooms' },
    ],
  },
  {
    id: 'g8',
    title: 'Possessives',
    note: `Possessives take the article and agree with the <i>thing owned</i>, not the owner:
      <i>il mio libro, la mia casa, i miei libri, le mie case</i>.<br><br>
      mio, tuo, suo (his/her/its), nostro, vostro, loro. <b>loro</b> never changes: <i>il loro amico, le loro amiche</i>.<br><br>
      Drop the article with a single, close family member: <i>mia sorella, tuo fratello</i> —
      but keep it in the plural (<i>i miei fratelli</i>), with loro (<i>il loro padre</i>), and when
      the noun is modified (<i>la mia sorella piccola</i>).`,
    exercises: [
      { prompt: 'Questo è ___ (my) libro.', answer: 'il mio' },
      { prompt: '___ (my) sorella abita a Roma.', answer: 'Mia', alts: ['mia'], hint: 'single close relative' },
      { prompt: 'Dove sono ___ (your, sing.) chiavi?', answer: 'le tue' },
      { prompt: '___ (their) casa è grande.', answer: 'La loro', alts: ['la loro'] },
      { prompt: 'Ho perso ___ (my) passaporto.', answer: 'il mio' },
      { prompt: '___ (our) amici arrivano domani.', answer: 'I nostri', alts: ['i nostri'] },
    ],
  },
  {
    id: 'g9',
    title: 'piacere — liking things backwards',
    note: `Italian says "X is pleasing to me". The thing liked is the subject, so the verb
      agrees with <i>it</i>, not with you:
      <ul>
        <li><i>Mi piace il caffè.</i> — I like coffee. (one thing → <b>piace</b>)</li>
        <li><i>Mi piacciono i dolci.</i> — I like sweets. (plural → <b>piacciono</b>)</li>
        <li><i>Mi piace viaggiare.</i> — I like travelling. (a verb → <b>piace</b>)</li>
      </ul>
      Pronouns: mi, ti, gli/le, ci, vi, gli. Negative goes first: <i>Non mi piace.</i><br>
      Past tense uses essere: <i>Mi è piaciuto il film.</i>`,
    exercises: [
      { prompt: 'Mi ___ la pizza.', answer: 'piace', hint: 'one thing' },
      { prompt: 'Ti ___ gli spaghetti?', answer: 'piacciono', hint: 'plural' },
      { prompt: 'Non mi ___ viaggiare in aereo.', answer: 'piace', hint: 'an infinitive' },
      { prompt: 'A Marco ___ i film italiani.', answer: 'piacciono', hint: 'plural' },
      { prompt: 'Ci ___ molto questa città.', answer: 'piace', hint: 'one city' },
      { prompt: '___ piace il vino rosso? (to you, informal)', answer: 'Ti', alts: ['ti'] },
    ],
  },
  {
    id: 'g10',
    title: 'Passato prossimo: which auxiliary?',
    note: `<b>avere</b> + participle for most verbs, especially those with a direct object:
      <i>Ho mangiato la pizza. Abbiamo visto un film.</i><br><br>
      <b>essere</b> + participle for verbs of movement and change of state
      (andare, venire, arrivare, partire, uscire, entrare, tornare, restare, nascere, morire),
      for <i>essere</i> and <i>stare</i>, and for all reflexives.
      With essere the participle agrees: <i>Anna è andata, i ragazzi sono partiti.</i><br><br>
      Irregular participles worth memorising: fatto, detto, visto, preso, messo, letto, scritto, aperto, chiuso, stato, rimasto, offerto, scelto.`,
    exercises: [
      { prompt: 'Ieri ___ mangiato al ristorante. (io)', answer: 'ho', hint: 'direct object → avere' },
      { prompt: 'Anna ___ andata a Roma.', answer: 'è', hint: 'movement → essere' },
      { prompt: 'I ragazzi sono ___ (partire) alle sei.', answer: 'partiti', hint: 'agree with i ragazzi' },
      { prompt: 'Che cosa ___ (tu, dire)? — Non ho detto niente.', answer: 'hai detto' },
      { prompt: 'Marta si è ___ (svegliarsi) tardi.', answer: 'svegliata', hint: 'reflexive, feminine' },
      { prompt: 'Abbiamo ___ (vedere) un bel film.', answer: 'visto', hint: 'irregular participle' },
      { prompt: 'Noi ___ (essere) in Italia l’anno scorso.', answer: 'siamo stati', hint: 'essere takes essere' },
    ],
  },
  {
    id: 'g11',
    title: 'Reflexive verbs',
    note: `The pronoun comes before the verb: <b>mi, ti, si, ci, vi, si</b>.<br>
      <i>Mi sveglio alle sette. Come ti chiami? Ci vediamo domani.</i><br><br>
      In the passato prossimo they all take <b>essere</b>, and the participle agrees:
      <i>Mi sono alzato/alzata, si sono divertiti.</i><br><br>
      With a modal, the pronoun can go either side: <i>Mi devo alzare</i> = <i>Devo alzarmi</i>.`,
    exercises: [
      { prompt: 'Io ___ sveglio alle sei.', answer: 'mi' },
      { prompt: 'Come ___ chiami?', answer: 'ti' },
      { prompt: 'I bambini ___ lavano le mani.', answer: 'si' },
      { prompt: 'Ieri noi ___ siamo divertiti molto.', answer: 'ci' },
      { prompt: 'Anna si è ___ (alzarsi) presto.', answer: 'alzata', hint: 'feminine agreement' },
      { prompt: 'Devo ___ (alzarsi) adesso.', answer: 'alzarmi', hint: 'pronoun attaches to the infinitive' },
    ],
  },
  {
    id: 'g12',
    title: 'Direct object pronouns',
    note: `<b>mi, ti, lo/la, ci, vi, li/le</b> — they go <i>before</i> the conjugated verb:
      <i>Compro il pane → Lo compro. Vedo Anna → La vedo. Conosco i tuoi amici → Li conosco.</i><br><br>
      <b>lo/la</b> shorten to <b>l’</b> before a vowel: <i>L’ho visto.</i><br>
      In the passato prossimo with avere, the participle agrees with lo/la/li/le:
      <i>Le ho comprate.</i><br>
      With an infinitive the pronoun attaches to the end: <i>Voglio vederlo.</i>`,
    exercises: [
      { prompt: 'Compri il giornale? — Sì, ___ compro.', answer: 'lo' },
      { prompt: 'Vedi Anna oggi? — Sì, ___ vedo stasera.', answer: 'la' },
      { prompt: 'Conosci i miei amici? — No, non ___ conosco.', answer: 'li' },
      { prompt: 'Prendi le chiavi? — Sì, ___ prendo.', answer: 'le' },
      { prompt: 'Marco mi ha chiamato e io ___ ho richiamato.', answer: 'l’', alts: ["l'", 'lo'], hint: 'before a vowel' },
      { prompt: 'Voglio ___ (comprare + it, m.) domani.', answer: 'comprarlo' },
    ],
  },
  {
    id: 'g12b',
    title: 'Indirect object pronouns, and pronouns after prepositions',
    note: `An indirect object is the person something is done <i>to</i> or <i>for</i> —
      the one you'd mark with <b>a</b>: <i>Telefono <b>a Marco</b> → <b>Gli</b> telefono.</i>
      <ul>
        <li><b>mi</b> to me · <b>ti</b> to you · <b>gli</b> to him · <b>le</b> to her</li>
        <li><b>ci</b> to us · <b>vi</b> to you (pl.) · <b>gli</b> to them</li>
      </ul>
      Common with dare, dire, scrivere, telefonare, rispondere, mandare, chiedere, and piacere.<br><br>
      The trap is <b>lo/la</b> vs <b>gli/le</b>. Ask whether the verb takes the person
      directly or via <i>a</i>: <i>Vedo Anna → <b>La</b> vedo</i>, but
      <i>Scrivo a Anna → <b>Le</b> scrivo.</i><br><br>
      After a preposition Italian uses a third set, the <b>stressed</b> forms:
      <i>con <b>me</b>, per <b>te</b>, secondo <b>me</b>, davanti a <b>lui</b></i>.
      These also go after the verb for emphasis: <i>Lo ha detto a <b>me</b>, non a te.</i>
      <table class="g-table">
        <tr><th></th><th>subject</th><th>direct</th><th>indirect</th><th>reflexive</th><th>after a preposition</th></tr>
        <tr><th>1 sing.</th><td>io</td><td>mi</td><td>mi</td><td>mi</td><td>me</td></tr>
        <tr><th>2 sing.</th><td>tu</td><td>ti</td><td>ti</td><td>ti</td><td>te</td></tr>
        <tr><th>3 m.</th><td>lui</td><td>lo</td><td>gli</td><td>si</td><td>lui</td></tr>
        <tr><th>3 f.</th><td>lei</td><td>la</td><td>le</td><td>si</td><td>lei</td></tr>
        <tr><th>1 pl.</th><td>noi</td><td>ci</td><td>ci</td><td>ci</td><td>noi</td></tr>
        <tr><th>2 pl.</th><td>voi</td><td>vi</td><td>vi</td><td>vi</td><td>voi</td></tr>
        <tr><th>3 pl.</th><td>loro</td><td>li / le</td><td>gli</td><td>si</td><td>loro</td></tr>
      </table>`,
    exercises: [
      { prompt: 'Telefono a Marco → ___ telefono stasera.', answer: 'Gli', alts: ['gli'], hint: 'to him' },
      { prompt: 'Scrivo a mia madre → ___ scrivo ogni settimana.', answer: 'Le', alts: ['le'], hint: 'to her' },
      { prompt: 'Vedo Anna ogni giorno → ___ vedo ogni giorno.', answer: 'La', alts: ['la'], hint: 'direct — vedere takes no "a"' },
      { prompt: 'Puoi ___ dare il libro? (to me)', answer: 'mi' },
      { prompt: 'Vieni al cinema con ___? (with me)', answer: 'me', hint: 'after a preposition' },
      { prompt: 'Questo regalo è per ___. (for you, informal)', answer: 'te' },
      { prompt: 'Secondo ___, è troppo caro. (in my opinion)', answer: 'me' },
      { prompt: 'Ho incontrato i tuoi amici e ___ ho detto tutto. (to them)', answer: 'gli', alts: ['Gli'] },
    ],
  },
  {
    id: 'g13',
    title: 'Questions and negation',
    note: `No helper verb: a question is the same sentence with rising intonation, or with a
      question word in front. <i>Parli italiano? Dove abiti? Perché non vieni?</i><br><br>
      Question words: chi, che cosa / cosa, dove, quando, perché, come, quanto, quale.<br><br>
      Negation is just <b>non</b> before the verb: <i>Non parlo tedesco.</i>
      Italian keeps the double negative: <i>Non ho <b>mai</b> visto. Non c’è <b>nessuno</b>. Non voglio <b>niente</b>.</i>`,
    exercises: [
      { prompt: '___ abiti? — A Firenze.', answer: 'Dove', alts: ['dove'] },
      { prompt: '___ è quel ragazzo? — È mio fratello.', answer: 'Chi', alts: ['chi'] },
      { prompt: '___ costa questo? — Venti euro.', answer: 'Quanto', alts: ['quanto'] },
      { prompt: 'Io ___ parlo tedesco.', answer: 'non', alts: ['Non'] },
      { prompt: 'Non ho ___ visto un film così bello.', answer: 'mai', hint: 'never' },
      { prompt: 'Non c’è ___ in ufficio oggi.', answer: 'nessuno', hint: 'nobody' },
    ],
  },
  {
    id: 'g14',
    title: 'molto, troppo, poco',
    note: `Before an adjective or verb they're adverbs and never change:
      <i>È molto bella. Lavoro troppo.</i><br><br>
      Before a noun they're adjectives and agree:
      <i>molta gente, molti amici, troppe macchine, poche persone.</i><br><br>
      Comparisons: <b>più … di</b> / <b>meno … di</b> — <i>Roma è più grande di Firenze.</i>
      Use <b>che</b> instead of <b>di</b> when comparing two adjectives, two verbs, or after a preposition:
      <i>È più simpatico che intelligente.</i>`,
    exercises: [
      { prompt: 'Questa pizza è ___ (molto) buona.', answer: 'molto', hint: 'before an adjective' },
      { prompt: 'Ci sono ___ (molto) macchine in centro.', answer: 'molte', hint: 'before a feminine plural noun' },
      { prompt: 'Ho ___ (poco) tempo oggi.', answer: 'poco', hint: 'tempo — masculine singular' },
      { prompt: 'Milano è più grande ___ Verona.', answer: 'di' },
      { prompt: 'È più facile parlare ___ scrivere.', answer: 'che', hint: 'comparing two verbs' },
      { prompt: 'Bevi ___ (troppo) caffè!', answer: 'troppo' },
    ],
  },

  // ---- appended later, to accompany the long-form lessons -----------------
  // New sets only ever go on the end: the card ids are `g:<id>:<n>`, so
  // renumbering or reordering anything above would scramble saved scheduling.

  {
    id: 'g15',
    title: 'Comparisons and superlatives',
    note: `<b>più</b> … / <b>meno</b> … + <b>di</b> = more / less … than:
      <i>Roma è più grande di Firenze.</i><br>
      Use <b>che</b> instead of <b>di</b> when the two things being compared are
      joined to the same verb — two adjectives, two verbs, two nouns, or anything
      after a preposition: <i>È più simpatico che intelligente. A Milano ci sono più
      macchine che a Roma.</i><br><br>
      Equal: <b>(così) … come</b> or <b>(tanto) … quanto</b> — <i>Marco è alto come me.</i><br><br>
      <b>The most</b>: article + più + adjective, and "in/of" is <b>di</b>:
      <i>la ragazza più simpatica della classe.</i><br>
      <b>Very</b>: drop the final vowel and add <b>-issimo</b> — <i>buono → buonissimo</i>.<br><br>
      Irregular: <b>migliore</b> (better), <b>peggiore</b> (worse) for things;
      <b>meglio</b>, <b>peggio</b> for how something is done.`,
    exercises: [
      { prompt: 'Roma è ___ grande di Firenze.', answer: 'più', hint: 'bigger than' },
      { prompt: 'Questo albergo è meno caro ___ quello.', answer: 'di' },
      { prompt: 'A Milano ci sono più macchine ___ a Roma.', answer: 'che', hint: 'the second half starts with a preposition' },
      { prompt: 'Anna è la studentessa ___ brava della classe.', answer: 'più', hint: 'the best in the class' },
      { prompt: 'Questo vino è ___ (buono — "very good", one word).', answer: 'buonissimo' },
      { prompt: 'Marco è alto ___ me.', answer: 'come', alts: ['quanto'], hint: 'as tall as' },
      { prompt: 'Oggi il tempo è ___ di ieri. (better)', answer: 'migliore' },
    ],
  },
  {
    id: 'g16',
    title: 'questo and quello',
    note: `<b>questo</b> (this, near me) is an ordinary four-form adjective:
      questo, questa, questi, queste.<br><br>
      <b>quello</b> (that, further off) copies the definite article instead:
      <table class="g-table">
        <tr><th>il → </th><td>quel ragazzo</td><th>i → </th><td>quei ragazzi</td></tr>
        <tr><th>lo → </th><td>quello studente</td><th>gli → </th><td>quegli studenti</td></tr>
        <tr><th>l’ → </th><td>quell’amico</td><th>gli → </th><td>quegli amici</td></tr>
        <tr><th>la → </th><td>quella casa</td><th>le → </th><td>quelle case</td></tr>
      </table>
      <b>bello</b> does exactly the same when it comes before its noun:
      <i>bel ragazzo, begli occhi, bell’idea, bella giornata</i>.<br><br>
      Standing alone as a pronoun, quello keeps the full form: <i>Prendo quello.</i>`,
    exercises: [
      { prompt: '___ (this) libro è mio.', answer: 'Questo', alts: ['questo'] },
      { prompt: '___ (these) scarpe sono comode.', answer: 'Queste', alts: ['queste'] },
      { prompt: 'Chi è ___ (that) ragazzo?', answer: 'quel', hint: 'it would be il ragazzo' },
      { prompt: 'Guarda ___ (those) alberi!', answer: 'quegli', hint: 'it would be gli alberi' },
      { prompt: 'Non conosco ___ (that) studente.', answer: 'quello', hint: 's + consonant, like lo studente' },
      { prompt: 'Che ___ (bello) giornata!', answer: 'bella' },
      { prompt: 'Marco ha ___ (bello) occhi.', answer: 'begli', hint: 'it would be gli occhi' },
    ],
  },
  {
    id: 'g17',
    title: 'dovere, potere, volere',
    note: `The three modals take a <b>bare infinitive</b> — no preposition between them:
      <i>Devo andare. Posso entrare? Voglio dormire.</i>
      <table class="g-table">
        <tr><th></th><th>dovere</th><th>potere</th><th>volere</th></tr>
        <tr><th>io</th><td>devo</td><td>posso</td><td>voglio</td></tr>
        <tr><th>tu</th><td>devi</td><td>puoi</td><td>vuoi</td></tr>
        <tr><th>lui / lei</th><td>deve</td><td>può</td><td>vuole</td></tr>
        <tr><th>noi</th><td>dobbiamo</td><td>possiamo</td><td>vogliamo</td></tr>
        <tr><th>voi</th><td>dovete</td><td>potete</td><td>volete</td></tr>
        <tr><th>loro</th><td>devono</td><td>possono</td><td>vogliono</td></tr>
      </table>
      A pronoun may sit in front of the modal or attach to the infinitive:
      <i>Lo devo fare</i> = <i>Devo farlo.</i><br><br>
      In the past they take the auxiliary of the verb that follows —
      <i>ho dovuto lavorare</i> but <i>sono dovuto andare</i>.`,
    exercises: [
      { prompt: 'Non ___ venire stasera, ho troppo lavoro. (io, potere)', answer: 'posso' },
      { prompt: '___ andare a casa adesso. (io, dovere)', answer: 'Devo', alts: ['devo'] },
      { prompt: 'Che cosa ___ bere? (tu, volere)', answer: 'vuoi' },
      { prompt: 'I bambini non ___ uscire da soli. (loro, potere)', answer: 'possono' },
      { prompt: 'Ieri ho ___ (dovere) lavorare fino a tardi.', answer: 'dovuto' },
      { prompt: 'Scusi, ___ (Lei, volere) anche un caffè?', answer: 'vuole', alts: ['Vuole'] },
      { prompt: 'Devo ___ (fare + it, m.) subito.', answer: 'farlo', hint: 'attach the pronoun to the infinitive' },
    ],
  },
  {
    id: 'g18',
    title: 'sapere and conoscere',
    note: `English has one "know". Italian splits it.<br><br>
      <b>sapere</b> — a fact, a piece of information, or <i>how</i> to do something:
      <i>So dove abita. Non lo so. So nuotare.</i>
      Followed by an infinitive it is how you say "can" in the sense of a learned skill.<br>
      Forms: so, sai, sa, sappiamo, sapete, sanno.<br><br>
      <b>conoscere</b> — being acquainted with a person, a place, a work:
      <i>Conosco Marco. Non conosco bene Roma.</i> It always takes a direct object,
      never a clause.<br><br>
      In the passato prossimo both shift meaning: <b>ho saputo</b> = I found out,
      <b>ho conosciuto</b> = I met (for the first time).`,
    exercises: [
      { prompt: '___ dov’è la stazione? (tu)', answer: 'Sai', alts: ['sai'] },
      { prompt: 'Non ___ nuotare. (io)', answer: 'so', hint: 'a skill' },
      { prompt: '___ Marco? È un mio amico. (tu)', answer: 'Conosci', alts: ['conosci'] },
      { prompt: 'Non ___ bene Roma. (io)', answer: 'conosco', hint: 'a place' },
      { prompt: 'Ieri ho ___ che Anna parte domani.', answer: 'saputo', hint: 'found out' },
      { prompt: 'Ho ___ Marco a una festa.', answer: 'conosciuto', hint: 'met for the first time' },
    ],
  },
  {
    id: 'g19',
    title: 'Which preposition before an infinitive',
    note: `Italian verbs are fussy about what comes before a second verb, and the
      choice is pure vocabulary — learn it with the verb.
      <ul>
        <li><b>nothing</b> — dovere, potere, volere, sapere, preferire, desiderare:
          <i>Voglio partire.</i></li>
        <li><b>a</b> — cominciare, imparare, provare, riuscire, continuare, and
          andare/venire when you go somewhere to do something: <i>Comincio a capire.
          Vado a comprare il pane.</i></li>
        <li><b>di</b> — finire, cercare, sperare, decidere, smettere, pensare,
          avere bisogno: <i>Ho finito di lavorare.</i></li>
      </ul>
      After a preposition Italian always uses the <b>infinitive</b>, never a gerund:
      <i>prima di partire, per mangiare, senza dire niente, dopo aver mangiato</i>.`,
    exercises: [
      { prompt: 'Comincio ___ capire l’italiano.', answer: 'a' },
      { prompt: 'Ho finito ___ lavorare alle sei.', answer: 'di' },
      { prompt: 'Cerco ___ studiare ogni giorno.', answer: 'di' },
      { prompt: 'Vado ___ comprare il pane.', answer: 'a' },
      { prompt: 'Prima ___ uscire, chiudi la porta.', answer: 'di' },
      { prompt: 'Spero ___ vederti presto.', answer: 'di' },
      { prompt: 'Sono uscito senza ___ (dire) niente.', answer: 'dire', hint: 'infinitive after a preposition' },
    ],
  },
  {
    id: 'g20',
    title: 'Saying no: mai, niente, nessuno, più',
    note: `Italian negates twice and means it once. Keep <b>non</b> in front of the
      verb and put the negative word after it:
      <ul>
        <li><b>non … mai</b> — never: <i>Non ci sono mai stato.</i></li>
        <li><b>non … niente / nulla</b> — nothing: <i>Non voglio niente.</i></li>
        <li><b>non … nessuno</b> — nobody: <i>Non c’è nessuno.</i></li>
        <li><b>non … più</b> — not any more: <i>Non lavoro più qui.</i></li>
        <li><b>non … ancora</b> — not yet: <i>Non ho ancora finito.</i></li>
        <li><b>non … né … né</b> — neither … nor: <i>Non bevo né caffè né tè.</i></li>
      </ul>
      If the negative word comes <i>before</i> the verb, drop <b>non</b> — one
      negative is enough on its own: <i>Nessuno è venuto. Niente è cambiato.</i>`,
    exercises: [
      { prompt: 'Non ho ___ visto il mare. (never)', answer: 'mai' },
      { prompt: 'Non c’è ___ in ufficio. (nobody)', answer: 'nessuno' },
      { prompt: 'Non voglio ___, grazie. (nothing)', answer: 'niente', alts: ['nulla'] },
      { prompt: 'Non lavoro ___ qui. (not any more)', answer: 'più' },
      { prompt: 'Non ho ___ finito. (not yet)', answer: 'ancora' },
      { prompt: 'Non mangio né carne ___ pesce.', answer: 'né' },
      { prompt: '___ è venuto alla festa. (nobody — and so no "non")', answer: 'Nessuno', alts: ['nessuno'] },
    ],
  },
  {
    id: 'g21',
    title: 'qualcuno, qualcosa, qualche, ogni',
    note: `<b>qualcuno</b> (someone) and <b>qualcosa</b> (something) are pronouns and
      never change: <i>C’è qualcuno alla porta. Vuoi qualcosa da bere?</i><br><br>
      <b>qualche</b> means "a few" but takes a <b>singular</b> noun — the one that
      catches everybody: <i>qualche amico</i> = a few friends.
      <b>alcuni / alcune</b> means the same thing with a plural noun:
      <i>alcuni amici</i>.<br><br>
      <b>ogni</b> (every) is also always singular and never changes:
      <i>ogni giorno</i>. Its pronoun is <b>ognuno</b>: <i>Ognuno di noi.</i><br><br>
      <b>tutti</b> = everyone, <b>tutto</b> = everything. "Every day" as a whole
      stretch is <i>tutti i giorni</i> — plural, with the article.`,
    exercises: [
      { prompt: 'C’è ___ alla porta. (someone)', answer: 'qualcuno' },
      { prompt: 'Vuoi ___ da bere? (something)', answer: 'qualcosa' },
      { prompt: 'Ho ___ amico a Roma. (a few — note the singular noun)', answer: 'qualche' },
      { prompt: 'Ho ___ amici a Roma. (a few — plural)', answer: 'alcuni' },
      { prompt: '___ giorno vado in palestra. (every)', answer: 'Ogni', alts: ['ogni'] },
      { prompt: '___ di noi ha una chiave. (each one)', answer: 'Ognuno', alts: ['ognuno'] },
    ],
  },
  {
    id: 'g22',
    title: 'Adverbs in -mente',
    note: `Take the <b>feminine singular</b> of the adjective and add <b>-mente</b>:
      <i>lento → lenta → lentamente</i>, <i>vero → vera → veramente</i>.<br><br>
      Adjectives already ending in <b>-e</b> just add it: <i>veloce → velocemente</i>.<br>
      Those ending in <b>-le</b> or <b>-re</b> drop the final e first:
      <i>facile → facilmente</i>, <i>particolare → particolarmente</i>.<br><br>
      The most common adverbs of all are irregular and simply have to be learned:
      <b>bene</b> (well), <b>male</b> (badly), <b>meglio</b> (better), <b>peggio</b> (worse).
      Don't reach for <i>buonamente</i> — <i>buono</i> describes a thing,
      <i>bene</i> describes an action.`,
    exercises: [
      { prompt: 'Parla molto ___ (lento).', answer: 'lentamente' },
      { prompt: 'Si può fare ___ (facile).', answer: 'facilmente' },
      { prompt: 'Guida troppo ___ (veloce).', answer: 'velocemente' },
      { prompt: '___ (probabile) arrivo tardi.', answer: 'Probabilmente', alts: ['probabilmente'] },
      { prompt: 'Marco canta ___. (badly)', answer: 'male' },
      { prompt: 'È un buon cuoco: cucina ___. (well)', answer: 'bene' },
    ],
  },
  {
    id: 'g23',
    title: 'si impersonale',
    note: `<b>si</b> + the third person singular is how Italian says "one", "you",
      "people" in general — the workhorse where English has no comfortable pronoun:
      <i>In Italia si mangia bene. Come si dice…? Qui non si fuma.</i><br><br>
      If what follows is a <b>plural</b> object, the verb goes plural too. It looks
      strange but it's the rule: <i>Qui si parlano tre lingue.</i>
      (Literally "three languages are spoken here".)<br><br>
      It's everywhere on signs — <i>si vende, si affitta, si cercano commessi</i> —
      and it lets you talk about customs without naming anyone.`,
    exercises: [
      { prompt: 'In Italia ___ mangia bene.', answer: 'si' },
      { prompt: 'Come si ___ "book" in italiano?', answer: 'dice' },
      { prompt: 'Qui si ___ (parlare) inglese.', answer: 'parla' },
      { prompt: 'In questo negozio si ___ (vendere) libri usati.', answer: 'vendono', hint: 'a plural object pulls the verb into the plural' },
      { prompt: 'Non si ___ (potere) fumare qui.', answer: 'può' },
      { prompt: 'A che ora si ___ (cenare) in Italia?', answer: 'cena' },
    ],
  },
  {
    id: 'g24',
    title: 'The futuro, and what it is really for',
    note: `Endings are the same for all three conjugations. The stem is the
      infinitive minus the final <b>-e</b>, with <b>-are</b> becoming <b>-er-</b>:
      parlare → parler-, credere → creder-, dormire → dormir-.<br>
      Then: <b>-ò, -ai, -à, -emo, -ete, -anno</b>.<br><br>
      Irregular stems (the same ones as the condizionale): sarò, avrò, andrò, farò,
      starò, potrò, vorrò, dovrò, saprò, vedrò, verrò, berrò, rimarrò.<br><br>
      <b>Usage.</b> For a plan that is already settled, Italians normally use the
      <i>present</i>: <i>Domani vado a Roma.</i> The futuro is for genuine prediction
      and promises — and, very commonly, for <b>guessing about right now</b>:
      <i>Che ora è? — Saranno le tre.</i>`,
    exercises: [
      { prompt: 'L’anno prossimo ___ (io, andare) in Italia.', answer: 'andrò' },
      { prompt: 'Domani ___ (noi, partire) presto.', answer: 'partiremo' },
      { prompt: '___ (tu, venire) alla festa?', answer: 'Verrai', alts: ['verrai'] },
      { prompt: 'Se piove, ___ (io, rimanere) a casa.', answer: 'rimarrò' },
      { prompt: 'Che ora è? — Non lo so, ___ (essere) le tre.', answer: 'saranno', hint: 'guessing about now, not predicting' },
      { prompt: 'Marco non risponde: ___ (dormire).', answer: 'dormirà', hint: 'he must be asleep' },
    ],
  },
  {
    id: 'g25',
    title: 'The condizionale',
    note: `Same stem as the futuro, different endings:
      <b>-ei, -esti, -ebbe, -emmo, -este, -ebbero</b>.
      So parlerò → parlerei, sarò → sarei, avrò → avrei, vorrò → vorrei.<br><br>
      What it is actually for, most of the time, is <b>politeness</b>.
      <i>Voglio un caffè</i> is a demand; <i>vorrei un caffè</i> is a request.
      <i>Puoi aiutarmi?</i> is fine among friends; <i>potresti aiutarmi?</i> is softer.<br><br>
      It also gives advice (<i>dovresti riposare</i>), reports something unconfirmed
      (<i>Sarebbe il migliore ristorante della città</i>), and supplies the "would"
      half of a hypothesis (<i>Con più tempo, studierei di più</i>).`,
    exercises: [
      { prompt: '___ (io, volere) un caffè, per favore.', answer: 'Vorrei', alts: ['vorrei'] },
      { prompt: '___ (tu, potere) aiutarmi?', answer: 'Potresti', alts: ['potresti'] },
      { prompt: '___ (tu, dovere) andare dal medico.', answer: 'Dovresti', alts: ['dovresti'] },
      { prompt: 'Mi ___ (Lei, dare) il conto, per favore?', answer: 'darebbe' },
      { prompt: 'Con più tempo ___ (noi, studiare) di più.', answer: 'studieremmo' },
      { prompt: '___ (loro, venire) volentieri, ma sono in ritardo.', answer: 'Verrebbero', alts: ['verrebbero'] },
    ],
  },
  {
    id: 'g26',
    title: 'Congiuntivo presente',
    note: `Used in the second half of a sentence, after <b>che</b>, when the first
      half expresses an opinion, a wish, a doubt or a feeling rather than a fact.<br><br>
      <b>-are</b>: -i, -i, -i, -iamo, -iate, -ino · <b>-ere/-ire</b>: -a, -a, -a, -iamo, -iate, -ano.
      All three singular persons are identical, which is why <i>che tu sia</i> often
      keeps its pronoun.<br>
      Irregulars: sia, abbia, faccia, vada, stia, possa, voglia, debba, sappia,
      venga, dia, dica.<br><br>
      Triggers: penso / credo / mi sembra che · voglio / spero / preferisco che ·
      è importante / è possibile / è meglio che · benché, sebbene, prima che,
      a meno che.<br><br>
      <b>Same subject, no che.</b> Use <i>di</i> + infinitive instead:
      <i>Penso di avere ragione</i>, not <i>penso che io abbia</i>.`,
    exercises: [
      { prompt: 'Penso che Marco ___ (essere) a casa.', answer: 'sia' },
      { prompt: 'Voglio che tu ___ (venire) con me.', answer: 'venga' },
      { prompt: 'Spero che ___ (loro, arrivare) presto.', answer: 'arrivino' },
      { prompt: 'Credo che Anna ___ (avere) ragione.', answer: 'abbia' },
      { prompt: 'È importante che voi ___ (capire) bene.', answer: 'capiate' },
      { prompt: 'Benché ___ (fare) freddo, esco lo stesso.', answer: 'faccia' },
      { prompt: 'Penso ___ avere ragione. (same subject — so no "che")', answer: 'di' },
    ],
  },
  {
    id: 'g27',
    title: 'If: se and the three kinds of hypothesis',
    note: `<b>1. A real possibility</b> — plain indicativo, exactly like English:
      <i>Se piove, resto a casa. Se hai tempo, vieni.</i><br><br>
      <b>2. Unreal, now</b> — <b>se</b> + congiuntivo imperfetto, then condizionale:
      <i>Se avessi tempo, verrei.</i> Imperfetto congiuntivo endings:
      -assi / -essi / -issi, and the ones you need most are irregular by heart:
      <b>fossi</b> (essere), <b>avessi</b> (avere), <b>facessi</b>, <b>potessi</b>,
      <b>venissi</b>, <b>sapessi</b>.<br><br>
      <b>3. Unreal, in the past</b> — congiuntivo trapassato + condizionale passato:
      <i>Se avessi avuto tempo, sarei venuto.</i><br><br>
      The one hard rule: <b>never a condizionale straight after se</b>.
      "Se avrei" is the mistake Italians themselves are taught not to make.`,
    exercises: [
      { prompt: 'Se ___ (io, avere) più tempo, viaggerei di più.', answer: 'avessi' },
      { prompt: 'Se ___ (tu, essere) in me, che cosa faresti?', answer: 'fossi' },
      { prompt: 'Se vincessi la lotteria, ___ (io, comprare) una casa.', answer: 'comprerei' },
      { prompt: 'Se ___ (piovere), resto a casa. (a real possibility)', answer: 'piove' },
      { prompt: 'Se ___ (noi, potere), verremmo volentieri.', answer: 'potessimo' },
      { prompt: 'Se ___ (loro, venire), sarebbe più divertente.', answer: 'venissero' },
    ],
  },
  {
    id: 'g28',
    title: 'che and cui',
    note: `<b>che</b> joins two statements about the same thing, whether it is the
      subject or the object of the second one, and whether it is a person or a thing:
      <i>Il ragazzo che parla… · Il libro che ho letto…</i><br><br>
      Unlike English, it can <b>never be left out</b>. "The book I read" has to be
      <i>il libro <b>che</b> ho letto</i>.<br><br>
      After a preposition, che becomes <b>cui</b>: <i>la città in cui abito,
      l’amico a cui ho scritto, la ragazza con cui esco</i>.
      With the article in front, <i>il cui</i> means "whose".<br><br>
      "What" in the middle of a sentence is <b>quello che</b> (or <i>ciò che</i>):
      <i>Non capisco quello che dici.</i>`,
    exercises: [
      { prompt: 'Il ragazzo ___ parla è mio fratello.', answer: 'che' },
      { prompt: 'Il libro ___ ho letto è bellissimo.', answer: 'che' },
      { prompt: 'La città in ___ abito è piccola.', answer: 'cui' },
      { prompt: 'L’amico a ___ ho scritto vive a Roma.', answer: 'cui' },
      { prompt: 'La ragazza con ___ esco è italiana.', answer: 'cui' },
      { prompt: 'Non capisco ___ che dici. ("what" = the thing that)', answer: 'quello', alts: ['ciò'] },
    ],
  },
];

export function allGrammarItems() {
  const out = [];
  LESSONS.forEach((l, li) => {
    l.exercises.forEach((ex, ei) => {
      out.push({ ...ex, lessonId: l.id, lessonTitle: l.title, order: li * 1000 + ei });
    });
  });
  return out;
}
