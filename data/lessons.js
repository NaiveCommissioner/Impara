// Long-form lessons: the explanations, as opposed to the drills.
//
// The grammar cards in data/grammar.js test whether you can apply a rule.
// These teach the rule in the first place, in prose, one at a time. They are
// deliberately ordered so each leans only on what came before.
//
// Structure of a lesson:
//   sections[]  { h, p (HTML), examples[], table }
//   watchOut    the mistake English speakers actually make
//   keyPoints   what to carry away
//   practise    id of the grammar lesson that drills it (data/grammar.js)
//
// The id is only a storage key — "read" is recorded against it — so it says
// nothing about position. Array order is the curriculum. Lessons written later
// and slotted in between the originals carry a letter suffix (L05a sits after
// L05); ones added on the end continue the numbering.
//
// A lesson with a `practise` link doesn't surface as "today's" until the
// learner has actually met a card from that drill — see js/lessons.js. So a
// lesson placed here early can still arrive late, and that is deliberate.

export const LESSONS_LONG = [
  {
    id: 'L01',
    title: 'Masculine and feminine',
    subtitle: 'Every Italian noun has a gender — including the ones that obviously shouldn’t.',
    minutes: 4,
    practise: 'g1',
    sections: [
      {
        h: 'Gender isn’t about meaning',
        p: `<p>In Italian every noun is either masculine or feminine. Not people and
          animals — <i>everything</i>. A table is masculine, a chair is feminine, and
          there is no reason for it. <i>Il tavolo</i>, <i>la sedia</i>.</p>
          <p>This is the first genuinely foreign thing about Italian, because English
          simply doesn't do it. Don't look for logic. Gender is a property of the
          <b>word</b>, not the thing it names — which is why the sun is masculine in
          Italian (<i>il sole</i>) and feminine in German.</p>`,
        examples: [
          { it: 'il libro', en: 'the book', note: 'masculine' },
          { it: 'la casa', en: 'the house', note: 'feminine' },
          { it: 'il problema', en: 'the problem', note: 'masculine, despite the -a' },
        ],
      },
      {
        h: 'The ending is your best clue',
        p: `<p>Most of the time the last letter tells you:</p>`,
        table: {
          head: ['Ending', 'Usually', 'Example'],
          rows: [
            ['-o', 'masculine', 'il vino, il treno, l’anno'],
            ['-a', 'feminine', 'la pizza, la casa, la strada'],
            ['-e', 'either — must be learned', 'il pane (m), la chiave (f)'],
          ],
        },
      },
      {
        h: 'Why it matters more than it looks',
        p: `<p>Gender doesn't stay put in the noun. It spreads. The article changes,
          any adjective changes, and in the past tense the verb ending can change too.
          One wrong guess ripples through the whole sentence.</p>`,
        examples: [
          { it: 'Il libro è nuovo.', en: 'The book is new.' },
          { it: 'La casa è nuova.', en: 'The house is new.' },
          { it: 'Anna è andata a Roma.', en: 'Anna went to Rome.', note: 'andata, not andato' },
        ],
      },
      {
        h: 'So learn the article with the word',
        p: `<p>This is the single most useful habit in the language. Never learn
          <i>pane</i>. Learn <b>il pane</b>. Never learn <i>stazione</i>, learn
          <b>la stazione</b>. The article is free storage for the gender, and you'll
          need it every time you use the word.</p>
          <p>That's why every noun in this app is taught with its article attached.</p>`,
      },
      {
        h: 'The patterns worth knowing',
        p: `<p>A few endings are reliable enough to trust:</p>
          <ul>
            <li><b>-zione</b>, <b>-sione</b>, <b>-tà</b>, <b>-tù</b> → always feminine:
              <i>la stazione, la prenotazione, la città, la gioventù</i></li>
            <li><b>-ore</b> → masculine: <i>il colore, il dolore, il sapore</i></li>
            <li><b>-ma</b> from Greek → masculine: <i>il problema, il programma, il clima</i></li>
          </ul>
          <p>And shortened words keep the gender of the long word they came from:
          <i>la foto</i> (fotografia), <i>la bici</i> (bicicletta), <i>l'auto</i>
          (automobile) — all feminine despite ending in -o.</p>`,
      },
    ],
    watchOut: `Words for people usually follow the person, not a fixed gender —
      <i>il ragazzo / la ragazza</i>. But some don't change at all:
      <i>l'insegnante</i>, <i>il collega / la collega</i>, <i>il turista / la turista</i>.
      There the article is doing all the work, which is another reason to learn it.`,
    keyPoints: [
      'Every noun is masculine or feminine; it has nothing to do with meaning.',
      '-o is usually masculine, -a usually feminine, -e could be either.',
      'Gender spreads to articles, adjectives and some past participles.',
      'Always learn a noun together with its article.',
    ],
  },

  {
    id: 'L02',
    title: 'The seven ways to say "the"',
    subtitle: 'English has one word. Italian picks from seven, and the choice is partly about sound.',
    minutes: 4,
    practise: 'g1',
    sections: [
      {
        h: 'Gender and number, then sound',
        p: `<p>The article has to match the noun's gender and number — that much you'd
          expect. What surprises English speakers is that it <i>also</i> changes to suit
          the sound of the word that follows.</p>`,
        table: {
          head: ['', 'Singular', 'Plural', 'Used before'],
          rows: [
            ['masculine', 'il', 'i', 'most consonants — il pane, i treni'],
            ['masculine', 'lo', 'gli', 's+consonant, z, ps, gn, y — lo studente, lo zucchero'],
            ['masculine', 'l’', 'gli', 'a vowel — l’amico, gli amici'],
            ['feminine', 'la', 'le', 'any consonant — la casa, le case'],
            ['feminine', 'l’', 'le', 'a vowel — l’acqua, le acque'],
          ],
        },
      },
      {
        h: 'Why lo exists at all',
        p: `<p><i>Lo</i> looks like an oddity until you try to say the alternative.
          <i>Il studente</i> forces three consonants together; <i>lo studente</i> doesn't.
          Italian consistently prefers the easier mouth movement, and several rules in
          the language exist for exactly this reason.</p>
          <p>The same instinct drives <i>l'</i> before vowels — <i>la acqua</i> would be
          two vowels colliding, so it contracts to <i>l'acqua</i>.</p>`,
      },
      {
        h: 'A, an — the indefinite article',
        p: `<p>Same logic, shorter list: <b>un</b> and <b>uno</b> for masculine,
          <b>una</b> and <b>un'</b> for feminine.</p>`,
        examples: [
          { it: 'un caffè', en: 'a coffee' },
          { it: 'uno studente', en: 'a student', note: 'same s+consonant rule as lo' },
          { it: 'una birra', en: 'a beer' },
          { it: 'un’amica', en: 'a friend (f)', note: 'un’ only before a feminine vowel' },
        ],
      },
      {
        h: 'Italian uses "the" far more than English does',
        p: `<p>This is the part that makes learners sound foreign long after the forms
          are correct. Italian puts an article where English uses nothing at all:</p>`,
        examples: [
          { it: 'La vita è bella.', en: 'Life is beautiful.', note: 'not "Life is…"' },
          { it: 'Studio l’italiano.', en: 'I study Italian.', note: 'languages take the article' },
          { it: 'Mi lavo le mani.', en: 'I wash my hands.', note: 'body parts too' },
          { it: 'Il lunedì lavoro.', en: 'On Mondays I work.', note: 'a day + article = a habit' },
        ],
      },
    ],
    watchOut: `<i>un</i> takes no apostrophe before a masculine vowel — it's
      <i>un amico</i>, never <i>un'amico</i>. The apostrophe on <i>un'</i> exists only
      to mark the feminine, as in <i>un'amica</i>. It's one of the most common written
      mistakes, and it changes the gender you're signalling.`,
    keyPoints: [
      'The article matches gender and number — and the sound that follows it.',
      'lo / gli before s+consonant, z, ps, gn; l’ before vowels.',
      'Italian uses articles with abstract nouns, languages, body parts and habits.',
      'un amico (m) but un’amica (f) — the apostrophe marks the feminine.',
    ],
  },

  {
    id: 'L03',
    title: 'How Italian is pronounced',
    subtitle: 'The spelling is completely regular. Learn eight rules and you can read anything aloud.',
    minutes: 5,
    sections: [
      {
        h: 'Every letter is pronounced, always the same way',
        p: `<p>Italian is close to phonetic. Unlike English — where <i>through</i>,
          <i>though</i> and <i>tough</i> share letters and share nothing else — an
          Italian word is said exactly as written, once you know the rules.</p>
          <p>The five vowels are pure and short, and never reduce to a schwa. The <i>o</i>
          in <i>dolore</i> is the same both times. English speakers must resist swallowing
          unstressed vowels.</p>`,
      },
      {
        h: 'C and G are the whole game',
        p: `<p>Both are hard before <b>a, o, u</b> and soft before <b>e, i</b>.</p>`,
        table: {
          head: ['Spelling', 'Sound', 'Example'],
          rows: [
            ['ca, co, cu', 'k', 'casa, come, cucina'],
            ['ce, ci', 'ch as in chair', 'cena, ciao'],
            ['ga, go, gu', 'g as in go', 'gatto, gonna'],
            ['ge, gi', 'j as in jam', 'gelato, giorno'],
          ],
        },
      },
      {
        h: 'H is a hardener, not a sound',
        p: `<p>Italian <b>h</b> is silent. Its only job is to keep c and g hard in front
          of e and i: <i>che</i>, <i>chi</i>, <i>ghe</i>, <i>ghi</i>.</p>
          <p>This is why spelling shifts when you conjugate: <i>cercare</i> becomes
          <i>cerchi</i>, not <i>cerci</i> — the h protects the k sound. And going the
          other way, the softening <b>i</b> disappears when it isn't needed:
          <i>mangiare</i> → <i>mangerò</i>.</p>`,
        examples: [
          { it: 'chi', en: 'who', note: 'said "kee"' },
          { it: 'paghi', en: 'you pay', note: 'hard g' },
          { it: 'ciao', en: 'hi', note: 'the i is silent — "chao"' },
        ],
      },
      {
        h: 'The three clusters worth memorising',
        p: `<ul>
            <li><b>gli</b> — like the <i>lli</i> in <i>million</i>: <i>famiglia</i>, <i>gli</i></li>
            <li><b>gn</b> — like the <i>ny</i> in <i>canyon</i>: <i>signora</i>, <i>bagno</i></li>
            <li><b>sc</b> — <i>sk</i> before a/o/u, <i>sh</i> before e/i: <i>scuola</i> vs <i>pesce</i></li>
          </ul>`,
      },
      {
        h: 'Double consonants are real',
        p: `<p>English writes double letters but rarely says them. Italian holds the
          consonant, and it distinguishes words. If you don't lengthen it, you've said a
          different one.</p>`,
        examples: [
          { it: 'nonna / nona', en: 'grandmother / ninth' },
          { it: 'sono / sonno', en: 'I am / sleepiness' },
          { it: 'sete / sette', en: 'thirst / seven' },
        ],
      },
      {
        h: 'Stress',
        p: `<p>Usually the second-to-last syllable: <i>ca-<b>sa</b>-le</i>… no — <i><b>ca</b>-sa</i>,
          <i>pa-<b>ro</b>-la</i>, <i>ita-li-<b>a</b>-no</i>.</p>
          <p>When the stress lands on the final syllable, Italian marks it with an accent:
          <i>cit<b>tà</b></i>, <i>per<b>ché</b></i>, <i>caf<b>fè</b></i>. So an accent isn't
          decoration — it's an instruction about where to push.</p>`,
      },
    ],
    watchOut: `Verbs are the common trap for stress, because the third-person plural
      pulls it backwards: it's <i><b>par</b>-la-no</i>, not <i>par-<b>la</b>-no</i>.
      The same goes for <i><b>abi</b>-ta-no</i> and <i><b>man</b>-gia-no</i>.`,
    keyPoints: [
      'Spelling is regular — one letter, one sound, every time.',
      'c and g are hard before a/o/u, soft before e/i.',
      'h is silent and exists only to keep c and g hard.',
      'Double consonants are held, and change meaning.',
      'Stress is usually second-to-last; an accent marks the exceptions.',
    ],
  },

  {
    id: 'L04',
    title: 'Making things plural',
    subtitle: 'Italian doesn’t add an s. It changes the ending — and sometimes the spelling.',
    minutes: 4,
    practise: 'g2',
    sections: [
      {
        h: 'Change the vowel, not add a letter',
        p: `<p>English bolts an <i>s</i> onto the end. Italian rewrites the final vowel,
          and the article changes with it.</p>`,
        table: {
          head: ['Singular', 'Plural', 'Example'],
          rows: [
            ['-o (m)', '-i', 'il libro → i libri'],
            ['-a (f)', '-e', 'la casa → le case'],
            ['-e (m or f)', '-i', 'il pane → i pani · la chiave → le chiavi'],
            ['-a (m)', '-i', 'il problema → i problemi'],
          ],
        },
      },
      {
        h: 'Words that refuse to change',
        p: `<p>Some nouns look identical in the plural, and only the article tells you:</p>`,
        examples: [
          { it: 'la città → le città', en: 'the city → the cities', note: 'accented ending' },
          { it: 'il computer → i computer', en: 'foreign words don’t inflect' },
          { it: 'la foto → le foto', en: 'shortened words stay put' },
        ],
      },
      {
        h: 'Spelling that protects the sound',
        p: `<p>Remember that c and g go soft before <i>i</i> and <i>e</i>. So when a plural
          ending would change the sound, Italian inserts an <b>h</b> to prevent it:</p>`,
        examples: [
          { it: 'il lago → i laghi', en: 'the lake → the lakes', note: 'h keeps the g hard' },
          { it: 'l’amica → le amiche', en: 'the friend → the friends', note: 'h keeps the c hard' },
          { it: 'l’amico → gli amici', en: 'the friend → the friends', note: 'here the c does soften' },
        ],
      },
      {
        h: 'The irregulars you’ll actually meet',
        p: `<p>A small group changes more than its ending — and a handful of body parts
          even switch gender in the plural.</p>`,
        examples: [
          { it: 'l’uomo → gli uomini', en: 'the man → the men' },
          { it: 'l’uovo → le uova', en: 'the egg → the eggs', note: 'masculine → feminine' },
          { it: 'il braccio → le braccia', en: 'the arm → the arms', note: 'same switch' },
        ],
      },
    ],
    watchOut: `<i>Amico → amici</i> but <i>lago → laghi</i>, and there's no rule you can
      apply in the moment — it depends on where the stress falls. Treat the handful of
      -co / -go words as vocabulary rather than something to derive.`,
    keyPoints: [
      '-o → -i, -a → -e, -e → -i. No s, ever.',
      'Accented, foreign and shortened words don’t change.',
      'An h appears in the plural to keep c and g hard.',
      'A few body parts turn feminine in the plural: le braccia, le uova.',
    ],
  },

  {
    id: 'L05',
    title: 'Adjectives that agree',
    subtitle: 'The describing word has to match what it describes — and usually comes after it.',
    minutes: 4,
    practise: 'g4',
    sections: [
      {
        h: 'Two families of adjective',
        p: `<p>Most adjectives have four forms. A smaller group, ending in <b>-e</b>, has
          only two and doesn't care about gender at all.</p>`,
        table: {
          head: ['', 'm. sing', 'f. sing', 'm. plur', 'f. plur'],
          rows: [
            ['rosso (four-form)', 'rosso', 'rossa', 'rossi', 'rosse'],
            ['grande (two-form)', 'grande', 'grande', 'grandi', 'grandi'],
          ],
        },
      },
      {
        h: 'They normally follow the noun',
        p: `<p>English puts the adjective first without exception. Italian usually puts it
          second, and this alone will make your sentences sound more Italian.</p>`,
        examples: [
          { it: 'una macchina rossa', en: 'a red car' },
          { it: 'un ristorante italiano', en: 'an Italian restaurant' },
          { it: 'una giornata lunga', en: 'a long day' },
        ],
      },
      {
        h: 'The short common ones go first',
        p: `<p>A small set of very frequent adjectives normally comes before the noun:
          <i>bello, buono, grande, piccolo, giovane, vecchio, bravo, brutto</i>.</p>`,
        examples: [
          { it: 'un buon caffè', en: 'a good coffee' },
          { it: 'una bella giornata', en: 'a lovely day' },
          { it: 'un piccolo problema', en: 'a small problem' },
        ],
      },
      {
        h: 'Position can change the meaning',
        p: `<p>With a few adjectives the position isn't just style — it's the difference
          between two meanings. Before the noun tends to be figurative; after it, literal.</p>`,
        examples: [
          { it: 'un vecchio amico', en: 'an old friend (of long standing)' },
          { it: 'un amico vecchio', en: 'an elderly friend' },
          { it: 'una grande donna', en: 'a great woman' },
          { it: 'una donna grande', en: 'a large woman' },
        ],
      },
    ],
    watchOut: `A mixed group takes the masculine plural, however lopsided the numbers:
      twenty women and one man are still <i>italiani</i>. It's arbitrary and it's the rule.`,
    keyPoints: [
      'Adjectives agree in gender and number with their noun.',
      '-o adjectives have four forms; -e adjectives have two.',
      'They normally follow the noun — a short list comes before it.',
      'Position can change meaning: vecchio amico vs amico vecchio.',
    ],
  },

  {
    id: 'L05a',
    title: 'This one and that one',
    subtitle: 'questo behaves like any adjective. quello borrows the article — all seven forms of it.',
    minutes: 4,
    practise: 'g16',
    sections: [
      {
        h: 'Two distances, not three',
        p: `<p>English has <i>this</i> and <i>that</i>, and so does Italian:
          <b>questo</b> for what's near you, <b>quello</b> for what isn't. There's no
          third word in everyday use, so anything beyond arm's reach is <i>quello</i>.</p>
          <p><i>Questo</i> is the easy one — an ordinary four-form adjective, exactly like
          <i>rosso</i> in the last lesson.</p>`,
        examples: [
          { it: 'Questo libro è mio.', en: 'This book is mine.' },
          { it: 'Questa casa è grande.', en: 'This house is big.' },
          { it: 'Queste scarpe sono comode.', en: 'These shoes are comfortable.' },
        ],
      },
      {
        h: 'quello wears the article',
        p: `<p>Here's the part that has to be learned rather than guessed. <i>Quello</i>
          doesn't take four endings — it copies whichever definite article the noun would
          have had. If you know it's <i>lo studente</i>, you already know it's
          <i>quello studente</i>.</p>`,
        table: {
          head: ['Article', 'quello', 'Example'],
          rows: [
            ['il', 'quel', 'quel ragazzo'],
            ['lo', 'quello', 'quello studente'],
            ['l’', 'quell’', 'quell’amico'],
            ['la', 'quella', 'quella casa'],
            ['i', 'quei', 'quei ragazzi'],
            ['gli', 'quegli', 'quegli amici'],
            ['le', 'quelle', 'quelle case'],
          ],
        },
      },
      {
        h: 'And so does bello, in front of the noun',
        p: `<p><i>Bello</i> was on the short list of adjectives that go <i>before</i> their
          noun. When it does, it behaves exactly like <i>quello</i> — same seven forms, same
          reason. Put it after the noun and it turns back into a plain four-form adjective:
          <i>un ragazzo bello</i>.</p>`,
        examples: [
          { it: 'Che bella giornata!', en: 'What a lovely day!' },
          { it: 'Marco ha begli occhi.', en: 'Marco has beautiful eyes.', note: 'gli occhi → begli occhi' },
          { it: 'Un bel film.', en: 'A good film.', note: 'il film → bel film' },
        ],
      },
      {
        h: 'Standing on their own',
        p: `<p>Drop the noun and both words become pronouns. <i>Quello</i> then keeps its
          full form, whatever it was going to be — and it does the job English needs
          "the one" for.</p>`,
        examples: [
          { it: 'Prendo questo, grazie.', en: 'I’ll take this one, thanks.' },
          { it: 'Non quel libro — quello.', en: 'Not that book — that one.' },
          { it: 'Quello di Marco è più grande.', en: 'Marco’s one is bigger.' },
        ],
      },
    ],
    watchOut: `<i>Quello</i> has the article baked into it, so you never put another one in
      front. <i>Il quel ragazzo</i> is as wrong as it looks. For the same reason there's no
      Italian equivalent of "that <b>one</b>" as two words — <i>quello</i> is already both.`,
    keyPoints: [
      'questo = near me, quello = not near me. There is no third option.',
      'questo has four ordinary endings.',
      'quello copies the definite article: quel, quello, quell’, quella, quei, quegli, quelle.',
      'bello does the same thing when it comes before the noun.',
    ],
  },

  {
    id: 'L05b',
    title: 'Whose it is',
    subtitle: 'The possessive agrees with the thing owned, not with the owner — which reverses English.',
    minutes: 4,
    practise: 'g8',
    sections: [
      {
        h: 'It agrees with the wrong thing',
        p: `<p>In English the possessive tells you about the <b>owner</b>: <i>his</i> book,
          <i>her</i> book. Italian doesn't care who owns it. The possessive is an adjective,
          and like every adjective it agrees with the noun it sits next to.</p>
          <p>So <i>il suo libro</i> is "his book" <i>and</i> "her book", and what makes it
          change to <i>la sua casa</i> is that <i>casa</i> is feminine — nothing to do with
          who lives there.</p>`,
        table: {
          head: ['', 'm. sing', 'f. sing', 'm. plur', 'f. plur'],
          rows: [
            ['my', 'mio', 'mia', 'miei', 'mie'],
            ['your (tu)', 'tuo', 'tua', 'tuoi', 'tue'],
            ['his / her', 'suo', 'sua', 'suoi', 'sue'],
            ['our', 'nostro', 'nostra', 'nostri', 'nostre'],
            ['your (voi)', 'vostro', 'vostra', 'vostri', 'vostre'],
            ['their', 'loro', 'loro', 'loro', 'loro'],
          ],
        },
      },
      {
        h: 'The article comes too',
        p: `<p>Italian keeps the definite article in front, which English never does. It's
          <b>il</b> mio libro, not just <i>mio libro</i>. Think of it as "the book of mine" —
          the article belongs to the noun and the possessive is just describing it.</p>`,
        examples: [
          { it: 'Il mio passaporto è in albergo.', en: 'My passport is at the hotel.' },
          { it: 'Dove sono le tue chiavi?', en: 'Where are your keys?' },
          { it: 'La loro casa è vicino al mare.', en: 'Their house is near the sea.' },
        ],
      },
      {
        h: 'One exception: one close relative',
        p: `<p>With a <b>single</b> family member, the article drops out:
          <i>mia sorella</i>, <i>tuo fratello</i>, <i>mio padre</i>. It's the one place
          Italian looks like English, and there are three ways to lose the exception again:</p>
          <ul>
            <li>a plural relative keeps it — <i>i miei fratelli</i></li>
            <li><i>loro</i> always keeps it — <i>il loro padre</i></li>
            <li>an added adjective brings it back — <i>la mia sorella piccola</i></li>
          </ul>`,
        examples: [
          { it: 'Mia madre abita a Napoli.', en: 'My mother lives in Naples.' },
          { it: 'I miei genitori arrivano domani.', en: 'My parents arrive tomorrow.', note: 'plural — article returns' },
          { it: 'Il loro figlio studia a Roma.', en: 'Their son studies in Rome.', note: 'loro always keeps it' },
        ],
      },
      {
        h: 'suo is ambiguous, and Italians live with it',
        p: `<p>Because the possessive follows the object, <i>il suo cane</i> gives you no clue
          whose dog it is. Context nearly always settles it, and when it genuinely doesn't,
          Italian repeats the person rather than inventing a new word:
          <i>il cane di lui</i>, <i>il cane di Marco</i>.</p>
          <p>One more thing worth knowing: <i>i miei</i> on its own means "my family" or
          "my parents", and <i>a casa mia</i> — possessive after the noun, no article — means
          "at my place".</p>`,
      },
    ],
    watchOut: `With parts of the body and clothes, Italian uses the <b>article</b> and lets a
      reflexive pronoun say whose they are: <i>Mi lavo le mani</i>, not <i>lavo le mie mani</i>.
      Same with <i>Mi fa male la testa</i> — "my head hurts". Reaching for the possessive
      there is understandable and immediately marks you as English-speaking.`,
    keyPoints: [
      'The possessive agrees with the thing owned, not the owner.',
      'il suo libro is both "his book" and "her book".',
      'Keep the article: il mio libro, le tue chiavi.',
      'Drop it for one close relative — mia sorella — but not in the plural or with loro.',
    ],
  },

  {
    id: 'L05c',
    title: 'How much, too much, not enough',
    subtitle: 'molto, troppo and poco change their endings in one position and refuse to in the other.',
    minutes: 4,
    practise: 'g14',
    sections: [
      {
        h: 'The same word doing two different jobs',
        p: `<p><i>Molto</i> in front of a noun means "a lot of" — it's counting something,
          so it's an adjective and it agrees. <i>Molto</i> in front of an adjective or a verb
          means "very" or "a lot" — it's describing, so it's an adverb and it never changes.</p>
          <p>English hides this by using different words: <i>much / many</i> versus
          <i>very</i>. Italian uses one word and lets the ending tell you which job it's on.</p>`,
        examples: [
          { it: 'C’è molta gente in piazza.', en: 'There are a lot of people in the square.', note: 'counting → agrees' },
          { it: 'Questa pizza è molto buona.', en: 'This pizza is very good.', note: 'describing → frozen' },
          { it: 'Lavoro molto.', en: 'I work a lot.', note: 'describing a verb → frozen' },
        ],
      },
      {
        h: 'The four that behave this way',
        p: `<p>All of them take the ordinary four endings when they're counting:</p>`,
        table: {
          head: ['', 'm. sing', 'f. sing', 'm. plur', 'f. plur'],
          rows: [
            ['a lot of', 'molto', 'molta', 'molti', 'molte'],
            ['too much', 'troppo', 'troppa', 'troppi', 'troppe'],
            ['little / few', 'poco', 'poca', 'pochi', 'poche'],
            ['so much', 'tanto', 'tanta', 'tanti', 'tante'],
          ],
        },
      },
      {
        h: 'The test that always works',
        p: `<p>Ask what the word is measuring. If it's measuring a <b>thing</b> — and a thing
          has a gender — it agrees. If it's measuring a <b>quality</b> or an <b>action</b>,
          there's no gender to agree with, so it stays put.</p>`,
        examples: [
          { it: 'Ho pochi amici qui.', en: 'I have few friends here.', note: 'friends can be counted' },
          { it: 'Parlo poco italiano.', en: 'I speak little Italian.' },
          { it: 'Ci sono troppe macchine in centro.', en: 'There are too many cars in the centre.' },
          { it: 'Mangi troppo!', en: 'You eat too much!', note: 'nothing to agree with' },
        ],
      },
      {
        h: 'poco leans negative — and un po’ doesn’t',
        p: `<p><i>Ho poco tempo</i> isn't neutral: it means you're short of it. When you want
          the friendly "a bit of", use <b>un po’ di</b> — short for <i>un poco di</i>, which
          is where the apostrophe comes from.</p>`,
        examples: [
          { it: 'Ho poco tempo oggi.', en: 'I haven’t got much time today.' },
          { it: 'Vuoi un po’ di vino?', en: 'Would you like a bit of wine?' },
          { it: 'Parlo un po’ di italiano.', en: 'I speak a bit of Italian.' },
        ],
      },
    ],
    watchOut: `<i>Poco</i> hides the spelling trap from the plurals lesson: the masculine
      plural is <i>pochi</i> and the feminine <i>poche</i>, both with an <b>h</b> to keep the
      k sound. Write <i>poci</i> and you've said something that would be pronounced
      "po-chee".`,
    keyPoints: [
      'Before a noun they agree; before an adjective or verb they don’t.',
      'molto = "a lot of" when counting, "very" when describing.',
      'The plural of poco takes an h: pochi, poche.',
      'un po’ di is the friendly alternative to poco.',
    ],
  },

  {
    id: 'L06',
    title: 'Dropping the subject',
    subtitle: 'The verb ending already says who. Saying "io" as well is a choice, not the default.',
    minutes: 4,
    practise: 'g0',
    sections: [
      {
        h: 'The ending carries the person',
        p: `<p>English verbs barely change, so English needs a pronoun: <i>speak</i> alone
          tells you nothing. Italian endings are distinct enough to identify the subject on
          their own — <i>parlo</i> can only be "I speak".</p>
          <p>So the natural sentence is <b>Parlo italiano</b>, not <i>Io parlo italiano</i>.</p>`,
        table: {
          head: ['', '-are (parlare)', '-ere (credere)', '-ire (dormire)'],
          rows: [
            ['io', 'parlo', 'credo', 'dormo'],
            ['tu', 'parli', 'credi', 'dormi'],
            ['lui / lei', 'parla', 'crede', 'dorme'],
            ['noi', 'parliamo', 'crediamo', 'dormiamo'],
            ['voi', 'parlate', 'credete', 'dormite'],
            ['loro', 'parlano', 'credono', 'dormono'],
          ],
        },
      },
      {
        h: 'So when do you use the pronoun?',
        p: `<p>When it's doing work — contrast, emphasis, or standing alone:</p>`,
        examples: [
          { it: 'Io parlo italiano, lui parla solo inglese.', en: 'I speak Italian, he only speaks English.', note: 'contrast' },
          { it: '— Chi viene? — Io.', en: '— Who’s coming? — Me.', note: 'no verb to carry it' },
          { it: 'Anche tu vieni?', en: 'Are you coming too?', note: 'after anche' },
        ],
      },
      {
        h: 'Why this matters for listening',
        p: `<p>If the subject lives in the ending, then the ending is the part you cannot
          afford to miss. <i>Parlo</i> and <i>parla</i> differ by one unstressed vowel and
          mean different people.</p>
          <p>This is also why Italian sounds fast to beginners: a single word can carry
          what English spreads over three.</p>`,
      },
    ],
    watchOut: `The polite <i>Lei</i> takes third-person endings, so <i>Lei parla</i> looks
      identical to "she speaks". Context and capitalisation separate them —
      <i>Lei come sta?</i> is "How are you?", not "How is she?".`,
    keyPoints: [
      'Verb endings identify the subject; the pronoun is usually unnecessary.',
      'Use the pronoun for contrast, emphasis, or when standing alone.',
      'The ending is the highest-value part of the word to hear.',
      'Formal Lei borrows the third-person form.',
    ],
  },

  {
    id: 'L07',
    title: 'Essere and avere',
    subtitle: 'The two verbs you cannot avoid — and the reason Italians "have" hunger.',
    minutes: 4,
    practise: 'g3',
    sections: [
      {
        h: 'Both irregular, both everywhere',
        p: `<p>They're the two most common verbs in the language, they're both irregular,
          and they're both auxiliaries for the past tense. There is no way round learning
          them cold.</p>`,
        table: {
          head: ['', 'essere (to be)', 'avere (to have)'],
          rows: [
            ['io', 'sono', 'ho'],
            ['tu', 'sei', 'hai'],
            ['lui / lei', 'è', 'ha'],
            ['noi', 'siamo', 'abbiamo'],
            ['voi', 'siete', 'avete'],
            ['loro', 'sono', 'hanno'],
          ],
        },
      },
      {
        h: 'The h is silent',
        p: `<p><i>Ho, hai, ha, hanno</i> all start with a silent h. It's there purely to
          distinguish them in writing from other words — <i>ho</i> vs <i>o</i> ("or"),
          <i>hai</i> vs <i>ai</i> ("to the"). You never pronounce it.</p>`,
      },
      {
        h: 'States that Italian "has"',
        p: `<p>Here's the one that catches everyone. Where English <i>is</i> something,
          Italian often <i>has</i> it. These aren't optional idioms — they're the normal
          way to say these things.</p>`,
        examples: [
          { it: 'Ho fame.', en: 'I’m hungry.', note: 'literally "I have hunger"' },
          { it: 'Ho sete.', en: 'I’m thirsty.' },
          { it: 'Ho freddo. / Ho caldo.', en: 'I’m cold. / I’m hot.' },
          { it: 'Ho trent’anni.', en: 'I’m thirty.', note: 'age is had, not been' },
          { it: 'Ho paura.', en: 'I’m afraid.' },
        ],
      },
      {
        h: 'Essere agrees with you',
        p: `<p>Because <i>essere</i> links a subject to a description, the adjective after
          it must agree — including with your own gender.</p>`,
        examples: [
          { it: 'Sono stanco.', en: 'I’m tired.', note: 'said by a man' },
          { it: 'Sono stanca.', en: 'I’m tired.', note: 'said by a woman' },
          { it: 'Siamo pronti.', en: 'We’re ready.' },
        ],
      },
    ],
    watchOut: `Saying <i>sono fame</i> is the classic beginner sentence and it means
      something like "I am hunger". Any bodily state — hunger, thirst, cold, fear, sleep,
      age, being in a hurry — takes <i>avere</i>.`,
    keyPoints: [
      'essere = identity and description; avere = possession.',
      'The h in ho, hai, ha, hanno is silent and purely orthographic.',
      'Bodily states use avere: ho fame, ho freddo, ho trent’anni.',
      'Adjectives after essere agree with the subject, including your own gender.',
    ],
  },

  {
    id: 'L07a',
    title: 'Asking a question',
    subtitle: 'No "do", no inversion, no extra machinery. You say the sentence and lift your voice.',
    minutes: 3,
    practise: 'g13',
    sections: [
      {
        h: 'English builds a question. Italian just asks one.',
        p: `<p>To make an English question you have to import a verb that means nothing —
          <i>do</i> — and rearrange the sentence around it. "You speak Italian" becomes
          "<b>Do</b> you speak Italian?"</p>
          <p>Italian does none of that. The word order stays exactly as it was; your voice
          rises at the end, and in writing the question mark does the whole job.</p>`,
        examples: [
          { it: 'Parli italiano.', en: 'You speak Italian.' },
          { it: 'Parli italiano?', en: 'Do you speak Italian?', note: 'same words, different tune' },
          { it: 'Marco è a casa?', en: 'Is Marco at home?' },
        ],
      },
      {
        h: 'The question words',
        p: `<p>Put one of these at the front and everything else stays where it was.</p>`,
        table: {
          head: ['Word', 'Meaning', 'Example'],
          rows: [
            ['chi', 'who', 'Chi è?'],
            ['che cosa / cosa / che', 'what', 'Che cosa fai?'],
            ['dove', 'where', 'Dove abiti?'],
            ['quando', 'when', 'Quando arrivi?'],
            ['come', 'how', 'Come stai?'],
            ['perché', 'why', 'Perché non vieni?'],
            ['quanto', 'how much', 'Quanto costa?'],
            ['quale', 'which', 'Quale preferisci?'],
          ],
        },
      },
      {
        h: 'The subject moves to the end',
        p: `<p>If you name the subject at all, it usually goes after the verb in a question —
          the opposite of where English puts it. Remember that Italian often drops the subject
          entirely, so most questions never face the problem.</p>`,
        examples: [
          { it: 'Dove abita Marco?', en: 'Where does Marco live?' },
          { it: 'Quando arriva il treno?', en: 'When does the train arrive?' },
          { it: 'Che cosa fa tua sorella?', en: 'What does your sister do?' },
        ],
      },
      {
        h: 'perché answers itself',
        p: `<p>One word covers both "why" and "because", so a question and its answer share it.
          That feels like a shortage until you notice English "so" does something similar.</p>`,
        examples: [
          { it: '— Perché non vieni? — Perché lavoro.', en: '— Why aren’t you coming? — Because I’m working.' },
          { it: 'Non so perché.', en: 'I don’t know why.' },
        ],
      },
      {
        h: 'The preposition stays with the question word',
        p: `<p>English strands prepositions at the end of a question — "Where are you
          <b>from</b>?", "Who are you going <b>with</b>?". Italian never does. The preposition
          goes in front, where the question word is.</p>`,
        examples: [
          { it: 'Di dove sei?', en: 'Where are you from?' },
          { it: 'Con chi vai?', en: 'Who are you going with?' },
          { it: 'A che ora parti?', en: 'What time do you leave?' },
        ],
      },
    ],
    watchOut: `The reflex to translate "do" is strong and it produces sentences like
      <i>Fai parlare italiano?</i>, which means something else entirely. There is no
      auxiliary. If you can say the statement, you can already ask the question.`,
    keyPoints: [
      'A question is the statement plus rising intonation — no helper verb.',
      'Question words go first; a named subject goes to the end.',
      'perché is both "why" and "because".',
      'Prepositions travel with the question word: Di dove sei?',
    ],
  },

  {
    id: 'L07b',
    title: 'Saying no, twice',
    subtitle: 'Italian stacks negatives where English forbids them — and still means a single no.',
    minutes: 4,
    practise: 'g20',
    sections: [
      {
        h: 'non goes in front of the verb',
        p: `<p>For a plain negative that's the entire rule. <i>Non</i> sits immediately before
          the verb and nothing separates them — not even a pronoun, which has to squeeze in
          between.</p>`,
        examples: [
          { it: 'Non parlo tedesco.', en: 'I don’t speak German.' },
          { it: 'Non lo so.', en: 'I don’t know.', note: 'non, then the pronoun, then the verb' },
          { it: 'Non mi piace.', en: 'I don’t like it.' },
        ],
      },
      {
        h: 'The double negative is compulsory',
        p: `<p>English spent a few centuries deciding that two negatives cancel out. Italian
          never did, and stacking them is not sloppy — it's the only correct form. "I've
          never seen it" is <i>non</i> + <i>mai</i>: two negative words, one negative meaning.</p>
          <p>Chaucer would have found the Italian version perfectly normal.</p>`,
        examples: [
          { it: 'Non ho mai visto il mare.', en: 'I’ve never seen the sea.' },
          { it: 'Non c’è nessuno.', en: 'There’s nobody here.' },
          { it: 'Non voglio niente.', en: 'I don’t want anything.' },
        ],
      },
      {
        h: 'The pairs worth learning whole',
        table: {
          head: ['Pattern', 'Meaning', 'Example'],
          rows: [
            ['non … mai', 'never', 'Non fumo mai.'],
            ['non … niente / nulla', 'nothing', 'Non ho capito niente.'],
            ['non … nessuno', 'nobody', 'Non conosco nessuno.'],
            ['non … più', 'not any more', 'Non lavoro più qui.'],
            ['non … ancora', 'not yet', 'Non ho ancora finito.'],
            ['non … né … né', 'neither … nor', 'Non bevo né caffè né tè.'],
          ],
        },
      },
      {
        h: 'Put the negative first and non disappears',
        p: `<p>The doubling only happens when the negative word comes <i>after</i> the verb.
          Move it to the front and it carries the negation on its own — adding <i>non</i>
          as well would genuinely be one too many.</p>`,
        examples: [
          { it: 'Nessuno è venuto alla festa.', en: 'Nobody came to the party.' },
          { it: 'Non è venuto nessuno.', en: 'Nobody came.', note: 'same meaning, other order' },
          { it: 'Niente è cambiato.', en: 'Nothing has changed.' },
        ],
      },
      {
        h: 'non … più is the one you’ll reach for daily',
        p: `<p>It covers everything English says with "not any more", "no longer", and
          "out of". On its own, <i>Non ancora</i> is a complete answer, and so is
          <i>Mai!</i></p>`,
        examples: [
          { it: 'Non c’è più pane.', en: 'There’s no bread left.' },
          { it: 'Non abito più a Roma.', en: 'I don’t live in Rome any more.' },
          { it: '— Hai finito? — Non ancora.', en: '— Have you finished? — Not yet.' },
        ],
      },
    ],
    watchOut: `<i>Nessuno</i> is grammatically singular however many people it rules out:
      <i>Non c’è nessuno</i>, never <i>non ci sono nessuni</i>. And an adjective after
      <i>niente</i> or <i>qualcosa</i> needs <b>di</b> in front of it —
      <i>niente di speciale</i>, <i>qualcosa di buono</i>.`,
    keyPoints: [
      'non goes directly before the verb; pronouns squeeze between them.',
      'non … mai / niente / nessuno / più / ancora — two words, one negative.',
      'A negative word placed before the verb drops the non.',
      'nessuno is always singular.',
    ],
  },

  {
    id: 'L07c',
    title: 'There is, there are',
    subtitle: 'c’è looks like "it is" and means something completely different.',
    minutes: 3,
    practise: 'g7',
    sections: [
      {
        h: 'c’è is two words squashed together',
        p: `<p><b>ci</b> means "there" — the place word — and <b>è</b> is "is". Put them
          together and the vowel collides, so <i>ci è</i> contracts to <b>c’è</b>. The plural
          doesn't need to contract: <b>ci sono</b>.</p>
          <p>So the structure is exactly English's: a placeholder "there", then the verb "to
          be", then the thing that exists.</p>`,
        examples: [
          { it: 'C’è un problema.', en: 'There’s a problem.' },
          { it: 'Ci sono due camere.', en: 'There are two rooms.' },
          { it: 'C’è il wifi?', en: 'Is there wifi?' },
        ],
      },
      {
        h: 'The trap: c’è versus è',
        p: `<p>They differ by two letters and do opposite jobs. <b>È</b> identifies something
          you've already got in view; <b>c’è</b> announces that something exists at all.</p>`,
        examples: [
          { it: 'È un problema.', en: 'It’s a problem.', note: 'identifying' },
          { it: 'C’è un problema.', en: 'There’s a problem.', note: 'announcing' },
          { it: 'Sono due camere.', en: 'They are two rooms.', note: 'describing what they are' },
          { it: 'Ci sono due camere.', en: 'There are two rooms.', note: 'saying how many exist' },
        ],
      },
      {
        h: 'What follows decides which one',
        p: `<p>Count the thing that comes after. One thing takes <i>c’è</i>, several take
          <i>ci sono</i> — and unlike casual English, which happily says "there's two of
          them", Italian holds the line.</p>`,
        examples: [
          { it: 'C’è molta gente in piazza.', en: 'There are a lot of people in the square.', note: 'gente is singular in Italian' },
          { it: 'Non c’è nessuno in ufficio.', en: 'There’s nobody in the office.' },
          { it: 'Quante camere ci sono?', en: 'How many rooms are there?' },
        ],
      },
      {
        h: 'In the past, and in the everyday phrases',
        p: `<p>Existing is a state rather than an event, so the past is usually the
          imperfetto: <b>c’era</b>, <b>c’erano</b>. And the construction turns up inside
          a handful of phrases you'll hear constantly.</p>`,
        examples: [
          { it: 'C’era molta gente ieri.', en: 'There were a lot of people yesterday.' },
          { it: 'Non c’è problema.', en: 'No problem.' },
          { it: 'Che c’è?', en: 'What’s up?' },
        ],
      },
    ],
    watchOut: `<i>Gente</i> is singular in Italian even though it means many people, so it's
      <i>c’è molta gente</i> — never <i>ci sono</i>. The verb counts the Italian noun, not the
      number of humans involved.`,
    keyPoints: [
      'c’è = ci + è, "there is"; ci sono = "there are".',
      'è identifies, c’è announces existence — don’t swap them.',
      'The number of the following noun picks the form.',
      'The past is normally c’era / c’erano.',
    ],
  },

  {
    id: 'L08',
    title: 'Tu or Lei',
    subtitle: 'English threw this distinction away. Italian kept it, and getting it wrong is audible.',
    minutes: 4,
    sections: [
      {
        h: 'Two ways to say "you"',
        p: `<p>English used to have this — <i>thou</i> for the familiar, <i>you</i> for the
          formal — and lost it. Italian still runs both, and choosing wrongly is the most
          socially visible mistake a learner makes. Not offensive, usually; just obviously
          foreign.</p>
          <ul>
            <li><b>tu</b> — friends, family, colleagues you know, children, animals, anyone
              your own age in a casual setting</li>
            <li><b>Lei</b> — strangers, shopkeepers, waiters, officials, anyone noticeably
              older, any professional situation</li>
          </ul>`,
      },
      {
        h: 'Lei takes third-person verbs',
        p: `<p>This is what makes it feel strange: the polite form isn't a special ending,
          it's the <i>he/she</i> form used to address someone directly. You're effectively
          speaking about them rather than to them.</p>`,
        examples: [
          { it: 'Come stai?', en: 'How are you?', note: 'tu' },
          { it: 'Come sta?', en: 'How are you?', note: 'Lei — same form as "how is he/she"' },
          { it: 'Scusa, hai un attimo?', en: 'Sorry, have you got a second?', note: 'tu' },
          { it: 'Scusi, ha un attimo?', en: 'Excuse me, have you got a moment?', note: 'Lei' },
        ],
      },
      {
        h: 'Everything else shifts with it',
        p: `<p>The register isn't only in the verb. Greetings, apologies and goodbyes all
          come in pairs, and mixing them is the giveaway.</p>`,
        table: {
          head: ['', 'Informal (tu)', 'Formal (Lei)'],
          rows: [
            ['Hello', 'ciao', 'buongiorno / salve'],
            ['Bye', 'ciao', 'arrivederci'],
            ['Sorry / excuse me', 'scusa', 'scusi'],
            ['Listen…', 'senti', 'senta'],
            ['How are you?', 'come stai?', 'come sta?'],
          ],
        },
      },
      {
        h: 'Which to default to',
        p: `<p>If you're unsure, use <b>Lei</b>. Being unnecessarily polite reads as
          courteous; being unnecessarily familiar reads as presumptuous. An Italian who
          wants to drop the formality will tell you — <i>diamoci del tu</i>, "let's use
          tu" — and then you switch.</p>
          <p>Rough rule: anyone serving you, anyone in uniform, anyone over about fifty
          you've just met, gets <i>Lei</i>. Anyone in a bar your own age gets <i>tu</i>.</p>`,
      },
    ],
    watchOut: `<i>Ciao</i> is informal in <b>both</b> directions — it means hello and
      goodbye, and it's wrong with someone you're addressing as <i>Lei</i>. Say
      <i>buongiorno</i> arriving and <i>arrivederci</i> leaving. Tourists saying "ciao"
      to a shopkeeper is the single most common register slip.`,
    keyPoints: [
      'tu for people you know; Lei for strangers, professionals and elders.',
      'Lei uses third-person singular verb forms.',
      'Greetings pair with register: ciao/scusa vs buongiorno/scusi.',
      'When unsure use Lei — they’ll invite you to switch.',
    ],
  },

  {
    id: 'L09',
    title: 'Prepositions that fuse',
    subtitle: 'a + il becomes al. Five prepositions merge with the article, and you can’t avoid them.',
    minutes: 4,
    practise: 'g5',
    sections: [
      {
        h: 'The merge',
        p: `<p>When <b>di, a, da, in, su</b> meet a definite article, they combine into one
          word. This isn't optional or informal — the separate form is simply wrong.</p>`,
        table: {
          head: ['', 'il', 'lo', 'l’', 'la', 'i', 'gli', 'le'],
          rows: [
            ['a', 'al', 'allo', 'all’', 'alla', 'ai', 'agli', 'alle'],
            ['di', 'del', 'dello', 'dell’', 'della', 'dei', 'degli', 'delle'],
            ['da', 'dal', 'dallo', 'dall’', 'dalla', 'dai', 'dagli', 'dalle'],
            ['in', 'nel', 'nello', 'nell’', 'nella', 'nei', 'negli', 'nelle'],
            ['su', 'sul', 'sullo', 'sull’', 'sulla', 'sui', 'sugli', 'sulle'],
          ],
        },
      },
      {
        h: 'Con and per stay separate',
        p: `<p>Modern Italian leaves these alone: <i>con il treno</i>, <i>per la famiglia</i>.
          You may see <i>col</i> in older writing, but you needn't produce it.</p>`,
      },
      {
        h: 'A or in — the choice English doesn’t make',
        p: `<p>Both translate as "to" or "in", and the split is largely by size and type
          of place.</p>`,
        examples: [
          { it: 'Vado a Roma.', en: 'I’m going to Rome.', note: 'cities take a' },
          { it: 'Vado in Italia.', en: 'I’m going to Italy.', note: 'countries and regions take in' },
          { it: 'Sono a casa.', en: 'I’m at home.' },
          { it: 'Sono in ufficio.', en: 'I’m at the office.' },
        ],
      },
      {
        h: 'Da does a lot of work',
        p: `<p><i>Da</i> is the most versatile and the least like anything in English.
          It covers "from", "at someone's place", and — with the present tense — "for" a
          stretch of time that's still going.</p>`,
        examples: [
          { it: 'Vengo da Sydney.', en: 'I come from Sydney.' },
          { it: 'Vado da Marco.', en: 'I’m going to Marco’s.' },
          { it: 'Studio italiano da tre mesi.', en: 'I’ve been studying Italian for three months.', note: 'present tense, not past' },
        ],
      },
    ],
    watchOut: `That last one is worth pausing on. Where English says "I <b>have been</b>
      studying", Italian uses the <b>present</b> with <i>da</i>: <i>studio da tre mesi</i>.
      Using a past tense there says you've stopped.`,
    keyPoints: [
      'di, a, da, in, su fuse with the definite article; con and per don’t.',
      'a for cities, in for countries and most buildings.',
      'da = from, at someone’s place, and "for/since" a duration.',
      'Present tense + da expresses what English does with "have been —ing".',
    ],
  },

  {
    id: 'L09a',
    title: 'A, in or da',
    subtitle: 'English says "to" and "in" for every place. Italian sorts places by kind, and the list is short.',
    minutes: 4,
    practise: 'g6',
    sections: [
      {
        h: 'a for a point, in for a container',
        p: `<p>The split isn't random once you see it as geometry. <b>a</b> treats the place
          as a dot on a map — you go <i>to</i> it. <b>in</b> treats it as something with an
          inside — you go <i>into</i> it.</p>
          <p>Cities are dots. Countries and regions are areas you end up inside. That single
          image gets most of it right.</p>`,
        table: {
          head: ['a', 'in'],
          rows: [
            ['a Roma, a Milano — cities', 'in Italia, in Francia — countries'],
            ['a casa, a letto, a scuola', 'in Toscana, in centro — regions and zones'],
            ['al bar, al mare, al cinema', 'in ufficio, in banca, in montagna'],
          ],
        },
      },
      {
        h: 'The -ia shops take in',
        p: `<p>Almost every shop or premises whose name ends in <b>-ia</b> takes <i>in</i>:
          <i>in farmacia, in libreria, in pizzeria, in gelateria, in pasticceria</i>. It's
          a reliable pattern and it covers a surprising amount of daily life.</p>
          <p>But if you name the person or business, you switch to <b>da</b>:
          <i>dal panettiere</i>, <i>da Marco</i>, <i>dal medico</i> — "at so-and-so's".</p>`,
        examples: [
          { it: 'Vado in farmacia.', en: 'I’m going to the pharmacy.' },
          { it: 'Vado dal medico.', en: 'I’m going to the doctor’s.' },
          { it: 'Stasera andiamo da Marco.', en: 'Tonight we’re going to Marco’s.' },
        ],
      },
      {
        h: 'Transport is in — unless you’re walking',
        p: `<p>Same logic again: you're <i>inside</i> the vehicle. The only common exception
          is the one you can't get inside of.</p>`,
        examples: [
          { it: 'Vado al lavoro in treno.', en: 'I go to work by train.' },
          { it: 'Andiamo in macchina.', en: 'We’re going by car.' },
          { it: 'Ci vado a piedi.', en: 'I’ll walk there.', note: 'literally "on foot"' },
        ],
      },
      {
        h: 'Clock time and the calendar',
        p: `<p>Times take <b>a</b>, and since the hours are feminine plural it fuses into
          <i>alle</i>. Months take <i>a</i> or <i>in</i> interchangeably; seasons take
          <i>in</i>; years take <i>nel</i>.</p>`,
        examples: [
          { it: 'Ci vediamo alle otto.', en: 'See you at eight.' },
          { it: 'Vado in Italia in estate.', en: 'I’m going to Italy in summer.' },
          { it: 'Sono nato nel 1990.', en: 'I was born in 1990.' },
        ],
      },
    ],
    watchOut: `The same noun can take either preposition and mean different things.
      <i>Vado a casa</i> is "I'm going home"; <i>sono in casa</i> is "I'm indoors".
      And adding an article usually forces <i>in</i> into its fused form and changes the
      feel: <i>vado in banca</i> (to do banking) versus <i>vado nella banca di fronte</i>
      (into that particular building).`,
    keyPoints: [
      'a for cities and points; in for countries, regions and enclosed places.',
      'Shops ending in -ia take in; a named person takes da.',
      'Transport takes in — but a piedi.',
      'Times take a (alle otto); years take nel.',
    ],
  },

  {
    id: 'L09b',
    title: 'Must, can, want',
    subtitle: 'Three verbs that take a second verb — with nothing in between.',
    minutes: 4,
    practise: 'g17',
    sections: [
      {
        h: 'A modal plus a bare infinitive',
        p: `<p><i>Dovere</i>, <i>potere</i> and <i>volere</i> are followed straight by the
          infinitive. No preposition, no "to", nothing. English is inconsistent here —
          "I must <b>go</b>" but "I want <b>to go</b>" — and Italian isn't.</p>`,
        table: {
          head: ['', 'dovere (must)', 'potere (can)', 'volere (want)'],
          rows: [
            ['io', 'devo', 'posso', 'voglio'],
            ['tu', 'devi', 'puoi', 'vuoi'],
            ['lui / lei', 'deve', 'può', 'vuole'],
            ['noi', 'dobbiamo', 'possiamo', 'vogliamo'],
            ['voi', 'dovete', 'potete', 'volete'],
            ['loro', 'devono', 'possono', 'vogliono'],
          ],
        },
      },
      {
        h: 'Where the pronoun goes',
        p: `<p>With two verbs in a row a pronoun has two homes, and both are correct: in
          front of the modal, or welded to the end of the infinitive. Native speakers use
          both without noticing.</p>`,
        examples: [
          { it: 'Lo devo fare.', en: 'I have to do it.' },
          { it: 'Devo farlo.', en: 'I have to do it.', note: 'same thing, attached instead' },
          { it: 'Mi devo alzare presto.', en: 'I have to get up early.' },
        ],
      },
      {
        h: 'In the past they borrow the other verb’s auxiliary',
        p: `<p>The modal itself has no opinion about <i>essere</i> or <i>avere</i> — it takes
          whichever the following verb would have taken. So <i>lavorare</i> keeps
          <i>avere</i>, and <i>andare</i> drags <i>essere</i> along, participle agreement and
          all. In speech you'll hear <i>avere</i> used for both, and nobody will blink.</p>`,
        examples: [
          { it: 'Ho dovuto lavorare fino a tardi.', en: 'I had to work until late.' },
          { it: 'Sono dovuto andare a casa.', en: 'I had to go home.', note: 'andare takes essere' },
          { it: 'Non ho potuto venire.', en: 'I couldn’t come.' },
        ],
      },
      {
        h: 'Politeness lives here too',
        p: `<p><i>Posso?</i> on its own — "May I?" — is one of the most useful words in the
          language, and covers everything from sitting down to picking something up.</p>
          <p>And you'll notice Italians rarely say <i>voglio</i> to a stranger. They use
          <b>vorrei</b>, "I would like", which is <i>volere</i> in a mood we'll come to
          later. Learn it now as a phrase: it's what you order with.</p>`,
        examples: [
          { it: 'Posso?', en: 'May I?' },
          { it: 'Vorrei un caffè, per favore.', en: 'I’d like a coffee, please.' },
          { it: 'Puoi aiutarmi?', en: 'Can you help me?' },
        ],
      },
    ],
    watchOut: `<i>Potere</i> is about permission or circumstance, not skill.
      <i>Non posso nuotare oggi</i> means something is stopping you today;
      <i>non so nuotare</i> means you never learned. English uses "can't" for both, which is
      exactly why the next lesson exists.`,
    keyPoints: [
      'dovere, potere and volere take a bare infinitive — never a preposition.',
      'A pronoun may precede the modal or attach to the infinitive.',
      'In the past they borrow the auxiliary of the following verb.',
      'vorrei, not voglio, is how you ask for something.',
    ],
  },

  {
    id: 'L09c',
    title: 'Two ways to know',
    subtitle: 'Facts on one side, acquaintance on the other — and "I can swim" belongs with the facts.',
    minutes: 4,
    practise: 'g18',
    sections: [
      {
        h: 'English is the odd one out',
        p: `<p>Italian has <b>sapere</b> for information and <b>conoscere</b> for
          familiarity. So does French (<i>savoir / connaître</i>), and so does German
          (<i>wissen / kennen</i>). English used to as well, and let the distinction collapse
          into a single "know" — which is why this feels like an extra rule rather than an
          ordinary one.</p>
          <ul>
            <li><b>sapere</b> — a fact, a piece of information, something you could state</li>
            <li><b>conoscere</b> — a person, a place, a book: something you're acquainted with</li>
          </ul>`,
      },
      {
        h: 'The shape of the sentence gives it away',
        p: `<p>You don't have to think about meaning at all if you look at what follows.
          <b>Sapere</b> can be followed by a whole clause — <i>so che…</i>, <i>so dove…</i>,
          <i>so se…</i>. <b>Conoscere</b> can only be followed by a noun. If a "that",
          "where", "when" or "how" is coming, it's <i>sapere</i>.</p>`,
        examples: [
          { it: 'So che Marco arriva domani.', en: 'I know Marco is arriving tomorrow.' },
          { it: 'Sai dov’è la stazione?', en: 'Do you know where the station is?' },
          { it: 'Conosci Marco?', en: 'Do you know Marco?' },
          { it: 'Non conosco bene Roma.', en: 'I don’t know Rome well.' },
        ],
      },
      {
        h: 'sapere + infinitive is English’s "can"',
        p: `<p>A skill you learned is a piece of knowledge, so it goes with <i>sapere</i>.
          This is the use English speakers miss completely, because English uses "can" and
          "can" looks like <i>potere</i>.</p>`,
        examples: [
          { it: 'So nuotare.', en: 'I can swim.', note: 'literally "I know how to swim"' },
          { it: 'Non so guidare.', en: 'I can’t drive.' },
          { it: 'Sai cucinare?', en: 'Can you cook?' },
        ],
      },
      {
        h: 'In the past, both change meaning',
        p: `<p>You met this pair in the passato prossimo lesson. The imperfetto keeps the
          state — knowing — and the passato prossimo turns it into the moment the knowing
          began.</p>`,
        table: {
          head: ['', 'Imperfetto', 'Passato prossimo'],
          rows: [
            ['sapere', 'sapevo — I knew', 'ho saputo — I found out'],
            ['conoscere', 'conoscevo — I knew (him)', 'ho conosciuto — I met (him)'],
          ],
        },
      },
    ],
    watchOut: `<i>Non lo so</i> is the everyday "I don't know", and the <i>lo</i> is not
      optional — a bare <i>non so</i> sounds unfinished, as though you were about to say what
      it is you don't know. Going the other way, <i>so Marco</i> is not a sentence: a person
      is not a fact.`,
    keyPoints: [
      'sapere = facts and information; conoscere = people, places, works.',
      'Only sapere can be followed by a clause.',
      'sapere + infinitive means "can" in the sense of a learned skill.',
      'ho saputo = I found out; ho conosciuto = I met.',
    ],
  },

  {
    id: 'L09d',
    title: 'Verb, then a, di, or nothing',
    subtitle: 'Two verbs in a row need a joint — and which joint it is has to be learned with the verb.',
    minutes: 4,
    practise: 'g19',
    sections: [
      {
        h: 'Three patterns, no shortcut',
        p: `<p>When one verb is followed by another, Italian puts the second one in the
          infinitive and then demands a specific preposition — or none at all. There's no
          rule that derives it, so the preposition is part of the verb's vocabulary entry,
          the same way the article is part of a noun's.</p>`,
        table: {
          head: ['Joint', 'Verbs', 'Example'],
          rows: [
            ['nothing', 'dovere, potere, volere, sapere, preferire', 'Voglio partire.'],
            ['a', 'cominciare, imparare, provare, riuscire, continuare, andare', 'Comincio a capire.'],
            ['di', 'finire, smettere, cercare, sperare, decidere, pensare', 'Ho finito di lavorare.'],
          ],
        },
      },
      {
        h: 'A rough hook: a looks forward, di looks back',
        p: `<p>It won't cover every verb, but it covers enough to be worth carrying:
          <b>a</b> tends to go with starting, trying and moving towards something;
          <b>di</b> with finishing, stopping, hoping and deciding.</p>`,
        examples: [
          { it: 'Imparo a parlare italiano.', en: 'I’m learning to speak Italian.' },
          { it: 'Vado a comprare il pane.', en: 'I’m going to buy bread.', note: 'motion towards a purpose' },
          { it: 'Ho smesso di fumare.', en: 'I’ve stopped smoking.' },
          { it: 'Spero di vederti presto.', en: 'I hope to see you soon.' },
        ],
      },
      {
        h: 'After a preposition, always the infinitive',
        p: `<p>This is where English does the most damage. Every English <i>-ing</i> after a
          preposition — "before leaving", "without saying", "instead of waiting" — comes out
          in Italian as a plain infinitive. Never a gerund.</p>`,
        examples: [
          { it: 'Prima di uscire, chiudi la porta.', en: 'Before going out, close the door.' },
          { it: 'Sono uscito senza dire niente.', en: 'I left without saying anything.' },
          { it: 'Studio per imparare.', en: 'I study in order to learn.' },
        ],
      },
      {
        h: 'And some verbs want no preposition where English does',
        p: `<p>The traffic runs both ways. A handful of very common verbs swallow their
          object directly, and the English preposition simply has no translation.</p>`,
        examples: [
          { it: 'Aspetto il treno.', en: 'I’m waiting for the train.', note: 'no "per"' },
          { it: 'Cerco le chiavi.', en: 'I’m looking for the keys.' },
          { it: 'Ascolto la radio.', en: 'I’m listening to the radio.' },
          { it: 'Pago il caffè.', en: 'I’m paying for the coffee.' },
        ],
      },
    ],
    watchOut: `"Thanks for helping me" is <i>grazie per avermi aiutato</i> — an infinitive,
      not <i>aiutandomi</i>. If an English sentence has a preposition followed by an
      <i>-ing</i>, the Italian will have that preposition followed by an infinitive, every
      single time.`,
    keyPoints: [
      'The preposition before an infinitive belongs to the first verb — learn them together.',
      'Modals and preferire take nothing; cominciare and imparare take a; finire and sperare take di.',
      'After any preposition, use the infinitive, never the gerund.',
      'aspettare, cercare, ascoltare and pagare take their object directly.',
    ],
  },

  {
    id: 'L10',
    title: 'Talking about the past',
    subtitle: 'The passato prossimo: two words, one participle, and a choice of auxiliary.',
    minutes: 5,
    practise: 'g10',
    sections: [
      {
        h: 'Two pieces',
        p: `<p>The everyday past is built like English "I have eaten": an auxiliary plus a
          participle. Unlike English, it also covers the plain past — <i>ho mangiato</i> is
          both "I have eaten" and "I ate".</p>`,
        table: {
          head: ['Verb type', 'Participle', 'Example'],
          rows: [
            ['-are', '-ato', 'parlare → parlato'],
            ['-ere', '-uto', 'credere → creduto'],
            ['-ire', '-ito', 'dormire → dormito'],
          ],
        },
      },
      {
        h: 'Which auxiliary — avere or essere?',
        p: `<p>Most verbs take <b>avere</b>. A specific set takes <b>essere</b>:</p>
          <ul>
            <li>verbs of movement and change of state — <i>andare, venire, arrivare,
              partire, uscire, entrare, tornare, nascere, morire</i></li>
            <li><i>essere</i> and <i>stare</i> themselves</li>
            <li>every reflexive verb</li>
          </ul>
          <p>A useful test: if you can put a direct object after it ("I ate <i>a pizza</i>"),
          it's almost certainly <i>avere</i>.</p>`,
      },
      {
        h: 'With essere, the participle agrees',
        p: `<p>This is where gender comes back. After <i>essere</i>, the participle behaves
          like an adjective and matches the subject.</p>`,
        examples: [
          { it: 'Marco è andato a Roma.', en: 'Marco went to Rome.' },
          { it: 'Anna è andata a Roma.', en: 'Anna went to Rome.' },
          { it: 'I ragazzi sono partiti.', en: 'The boys left.' },
          { it: 'Le ragazze sono partite.', en: 'The girls left.' },
        ],
      },
      {
        h: 'The irregular participles',
        p: `<p>The most common verbs have irregular participles, and there's no shortcut —
          they're vocabulary:</p>
          <p><i>fatto</i> (fare), <i>detto</i> (dire), <i>visto</i> (vedere),
          <i>preso</i> (prendere), <i>messo</i> (mettere), <i>letto</i> (leggere),
          <i>scritto</i> (scrivere), <i>aperto</i> (aprire), <i>chiuso</i> (chiudere),
          <i>stato</i> (essere and stare), <i>rimasto</i> (rimanere), <i>offerto</i> (offrire),
          <i>scelto</i> (scegliere), <i>bevuto</i> (bere).</p>`,
      },
    ],
    watchOut: `With <i>avere</i> the participle normally doesn't change — but it
      <b>does</b> agree with a direct object pronoun placed before it.
      <i>Ho comprato le mele</i>, but <i>Le ho comprat<b>e</b></i>. It's a small detail
      that native speakers apply without thinking.`,
    keyPoints: [
      'Auxiliary + participle; covers both "I ate" and "I have eaten".',
      '-ato / -uto / -ito, plus a list of irregulars to memorise.',
      'essere for movement, change of state, and all reflexives.',
      'After essere the participle agrees with the subject.',
    ],
  },

  {
    id: 'L11',
    title: 'Passato prossimo vs imperfetto',
    subtitle: 'The hardest choice in Italian for an English speaker — because English doesn’t make it.',
    minutes: 5,
    sections: [
      {
        h: 'Two pasts, one English translation',
        p: `<p>"I ate" can be <i>ho mangiato</i> or <i>mangiavo</i>, and they mean different
          things. English marks this distinction only occasionally, with "used to" or "was
          —ing"; Italian marks it every single time you talk about the past.</p>
          <p>The useful image is <b>photograph versus video</b>. The passato prossimo is a
          snapshot: something happened, it finished. The imperfetto is footage still
          rolling: something was going on, with no particular end.</p>`,
      },
      {
        h: 'What each one is for',
        table: {
          head: ['Passato prossimo', 'Imperfetto'],
          rows: [
            ['A completed event', 'An ongoing situation'],
            ['Something that happened once', 'Something habitual or repeated'],
            ['Moves the story forward', 'Sets the scene'],
            ['ho mangiato — I ate', 'mangiavo — I was eating / used to eat'],
          ],
        },
      },
      {
        h: 'They work together',
        p: `<p>Most real sentences use both: the imperfetto paints the background, and the
          passato prossimo drops the event into it.</p>`,
        examples: [
          { it: 'Mangiavo quando è arrivato.', en: 'I was eating when he arrived.', note: 'background + event' },
          { it: 'Faceva freddo, così sono tornato a casa.', en: 'It was cold, so I went home.' },
          { it: 'Da bambino giocavo a calcio.', en: 'As a child I used to play football.', note: 'habit' },
        ],
      },
      {
        h: 'Descriptions are always imperfetto',
        p: `<p>Weather, age, time, feelings, appearance, and mental states in the past all
          take the imperfetto, because they're conditions rather than events.</p>`,
        examples: [
          { it: 'Era alto e aveva gli occhi verdi.', en: 'He was tall and had green eyes.' },
          { it: 'Erano le tre.', en: 'It was three o’clock.' },
          { it: 'Volevo un caffè.', en: 'I wanted a coffee.' },
        ],
      },
      {
        h: 'Some verbs change meaning',
        p: `<p>With a few verbs the choice isn't about duration at all — it flips the sense.</p>`,
        table: {
          head: ['Verb', 'Imperfetto', 'Passato prossimo'],
          rows: [
            ['sapere', 'sapevo — I knew', 'ho saputo — I found out'],
            ['conoscere', 'conoscevo — I knew (a person)', 'ho conosciuto — I met'],
            ['volere', 'volevo — I wanted', 'ho voluto — I insisted on'],
            ['potere', 'potevo — I was able to', 'ho potuto — I managed to'],
          ],
        },
      },
    ],
    watchOut: `Don't decide by the English words alone. "I was tired" is <i>ero stanco</i>
      (a state), but "I got tired" is <i>mi sono stancato</i> (an event). Ask whether you're
      describing a condition or reporting something that happened.`,
    keyPoints: [
      'Passato prossimo = completed event. Imperfetto = ongoing situation.',
      'Photograph vs video is a reliable instinct.',
      'Descriptions, habits, weather, age and time take the imperfetto.',
      'sapere, conoscere, volere and potere change meaning between the two.',
    ],
  },

  {
    id: 'L12',
    title: 'Reflexive verbs',
    subtitle: 'Verbs that turn back on the subject — and often don’t look reflexive in English at all.',
    minutes: 4,
    practise: 'g11',
    sections: [
      {
        h: 'The pronoun comes first',
        p: `<p>A reflexive verb is listed with <b>-si</b> on the end — <i>svegliarsi</i>,
          <i>chiamarsi</i>, <i>alzarsi</i>. In use, that <i>si</i> becomes a pronoun matching
          the subject, and it sits <i>before</i> the verb.</p>`,
        table: {
          head: ['', 'pronoun', 'svegliarsi'],
          rows: [
            ['io', 'mi', 'mi sveglio'],
            ['tu', 'ti', 'ti svegli'],
            ['lui / lei', 'si', 'si sveglia'],
            ['noi', 'ci', 'ci svegliamo'],
            ['voi', 'vi', 'vi svegliate'],
            ['loro', 'si', 'si svegliano'],
          ],
        },
      },
      {
        h: 'Often not "myself" in English',
        p: `<p>Some are literally reflexive — you wash yourself. But many are simply the
          normal way to say something, and translating them with "myself" produces nonsense.</p>`,
        examples: [
          { it: 'Mi chiamo Marco.', en: 'My name is Marco.', note: 'literally "I call myself"' },
          { it: 'Non mi sento bene.', en: 'I don’t feel well.' },
          { it: 'Ci vediamo domani!', en: 'See you tomorrow!', note: 'literally "we see each other"' },
          { it: 'Come si dice…?', en: 'How do you say…?' },
        ],
      },
      {
        h: 'Always essere in the past',
        p: `<p>Every reflexive verb takes <i>essere</i> in the passato prossimo, which means
          the participle agrees with the subject.</p>`,
        examples: [
          { it: 'Mi sono svegliato tardi.', en: 'I woke up late.', note: 'said by a man' },
          { it: 'Mi sono svegliata tardi.', en: 'I woke up late.', note: 'said by a woman' },
          { it: 'Ci siamo divertiti molto.', en: 'We had a great time.' },
        ],
      },
      {
        h: 'With modal verbs the pronoun can move',
        p: `<p>After <i>dovere, potere, volere</i> you have a genuine choice, and both are
          equally correct.</p>`,
        examples: [
          { it: 'Mi devo alzare presto.', en: 'I have to get up early.' },
          { it: 'Devo alzarmi presto.', en: 'I have to get up early.', note: 'attached to the infinitive' },
        ],
      },
    ],
    watchOut: `<i>Ci</i> and <i>vi</i> do double duty — they're reflexive pronouns
      <i>and</i> ordinary object pronouns. <i>Ci vediamo</i> is "we see each other", but
      <i>ci vede</i> is "he sees us". Word order and context tell them apart.`,
    keyPoints: [
      'The -si pronoun matches the subject and goes before the verb.',
      'Many reflexives aren’t reflexive in English: mi chiamo, ci vediamo.',
      'All reflexives take essere in the past, with agreement.',
      'With modals the pronoun may go before or attach to the infinitive.',
    ],
  },

  {
    id: 'L13',
    title: 'Object pronouns',
    subtitle: 'Replacing "the book" with "it" — and the difference between lo and gli.',
    minutes: 5,
    practise: 'g12',
    sections: [
      {
        h: 'Direct and indirect',
        p: `<p>A <b>direct</b> object receives the action straight: <i>I see <u>Anna</u></i>.
          An <b>indirect</b> object is who it's done <i>to</i> or <i>for</i>:
          <i>I write <u>to Anna</u></i>. Italian uses different pronouns for each, and the
          test is whether the verb needs <b>a</b>.</p>`,
        table: {
          head: ['', 'Direct', 'Indirect'],
          rows: [
            ['me', 'mi', 'mi'],
            ['you', 'ti', 'ti'],
            ['him', 'lo', 'gli'],
            ['her', 'la', 'le'],
            ['us', 'ci', 'ci'],
            ['you (pl)', 'vi', 'vi'],
            ['them', 'li / le', 'gli'],
          ],
        },
      },
      {
        h: 'They go before the verb',
        p: `<p>English puts the pronoun after the verb; Italian puts it in front. This feels
          backwards for a long time and then suddenly doesn't.</p>`,
        examples: [
          { it: 'Compro il pane. → Lo compro.', en: 'I buy the bread. → I buy it.' },
          { it: 'Vedo Anna. → La vedo.', en: 'I see Anna. → I see her.' },
          { it: 'Scrivo a Anna. → Le scrivo.', en: 'I write to Anna. → I write to her.', note: 'indirect — note "a"' },
        ],
      },
      {
        h: 'The exception: infinitives and commands',
        p: `<p>With an infinitive or an informal command, the pronoun attaches to the end
          instead, forming one word.</p>`,
        examples: [
          { it: 'Voglio vederlo.', en: 'I want to see it.' },
          { it: 'Puoi aiutarmi?', en: 'Can you help me?' },
          { it: 'Dimmi!', en: 'Tell me!' },
        ],
      },
      {
        h: 'Lo for a whole idea',
        p: `<p><i>Lo</i> can stand in for an entire statement rather than a noun — where
          English would say "it" or nothing at all.</p>`,
        examples: [
          { it: 'Non lo so.', en: 'I don’t know.', note: 'literally "I don’t know it"' },
          { it: 'Lo credo.', en: 'I believe so.' },
        ],
      },
    ],
    watchOut: `<i>Le</i> is two different words: the feminine plural direct object
      ("them", for feminine things) and the singular indirect ("to her"). <i>Le compro</i>
      is "I buy them"; <i>Le scrivo</i> is "I write to her". Only the verb tells you which.`,
    keyPoints: [
      'Direct answers "what/whom"; indirect answers "to whom" and pairs with a.',
      'Pronouns go before the conjugated verb.',
      'They attach to infinitives and informal commands: vederlo, dimmi.',
      'lo can replace an entire idea: non lo so.',
    ],
  },

  {
    id: 'L13a',
    title: 'To me, for me, with me',
    subtitle: 'A third set of pronouns — the ones that follow a preposition, and the ones that carry stress.',
    minutes: 5,
    practise: 'g12b',
    sections: [
      {
        h: 'Which verbs need the indirect set',
        p: `<p>The test from the last lesson was whether the verb reaches its person through
          <b>a</b>. The problem is that English hides this: "I phone him" looks as direct as
          "I see him", but Italian says <i>telefono <b>a</b> Marco</i>, so the pronoun has to
          be <i>gli</i>.</p>
          <p>The verbs that work this way are worth knowing as a list, because you can't
          feel it from the English: <i>dare, dire, scrivere, telefonare, rispondere,
          mandare, chiedere, regalare, offrire</i> — and <i>piacere</i>, which gets a lesson
          of its own shortly.</p>`,
        examples: [
          { it: 'Telefono a Marco. → Gli telefono.', en: 'I phone Marco. → I phone him.' },
          { it: 'Scrivo a mia madre. → Le scrivo.', en: 'I write to my mother. → I write to her.' },
          { it: 'Vedo Anna. → La vedo.', en: 'I see Anna. → I see her.', note: 'no "a" — so direct' },
        ],
      },
      {
        h: 'The three sets side by side',
        p: `<p>Most rows are identical, which is good news: only the third person really
          forces a decision.</p>`,
        table: {
          head: ['', 'Subject', 'Direct', 'Indirect', 'After a preposition'],
          rows: [
            ['1 sing.', 'io', 'mi', 'mi', 'me'],
            ['2 sing.', 'tu', 'ti', 'ti', 'te'],
            ['3 m.', 'lui', 'lo', 'gli', 'lui'],
            ['3 f.', 'lei', 'la', 'le', 'lei'],
            ['1 plur.', 'noi', 'ci', 'ci', 'noi'],
            ['2 plur.', 'voi', 'vi', 'vi', 'voi'],
            ['3 plur.', 'loro', 'li / le', 'gli', 'loro'],
          ],
        },
      },
      {
        h: 'The stressed forms: after a preposition, and for emphasis',
        p: `<p><i>Mi</i> and <i>ti</i> are unstressed — they lean on the verb and can't stand
          alone. The moment a preposition needs an object, you switch to <b>me</b> and
          <b>te</b>.</p>
          <p>The same forms let you emphasise. English does emphasis with the voice —
          "he told <i>me</i>" — but Italian moves the pronoun after the verb and puts
          <i>a</i> in front of it.</p>`,
        examples: [
          { it: 'Vieni al cinema con me?', en: 'Are you coming to the cinema with me?' },
          { it: 'Questo regalo è per te.', en: 'This present is for you.' },
          { it: 'Secondo me, è troppo caro.', en: 'In my opinion, it’s too expensive.' },
          { it: 'L’ha detto a me, non a te.', en: 'He said it to me, not to you.', note: 'emphasis moves the pronoun' },
        ],
      },
      {
        h: 'Two pronouns at once',
        p: `<p>When both a direct and an indirect pronoun turn up, the indirect one comes
          first and its <i>i</i> softens to <b>e</b> — the same distaste for awkward sounds
          that produced <i>lo studente</i> back in the articles lesson.</p>`,
        table: {
          head: ['', '+ lo', '+ la', '+ li / le'],
          rows: [
            ['mi', 'me lo', 'me la', 'me li / me le'],
            ['ti', 'te lo', 'te la', 'te li / te le'],
            ['gli / le', 'glielo', 'gliela', 'glieli / gliele'],
            ['ci', 'ce lo', 'ce la', 'ce li / ce le'],
          ],
        },
      },
      {
        h: 'glielo is one word',
        p: `<p><i>Gli</i> and <i>le</i> both become <b>glie-</b> and then fuse with what
          follows. So a single written word carries "to him", "to her" or "to them" plus
          whatever is being given — and the sentence stops telling you which.</p>`,
        examples: [
          { it: 'Me lo dai?', en: 'Will you give it to me?' },
          { it: 'Glielo dico domani.', en: 'I’ll tell him tomorrow.' },
          { it: 'Te la mando stasera.', en: 'I’ll send it to you this evening.' },
        ],
      },
    ],
    watchOut: `In everyday spoken Italian <b>gli</b> covers both "to him" and "to them".
      The textbook form for "to them" is <i>loro</i>, placed <i>after</i> the verb —
      <i>dico loro</i> — and it now sounds formal enough to be worth recognising but not
      producing. What you must not do is stretch <i>le</i> that way: it is only ever
      "to her".`,
    keyPoints: [
      'Verbs that reach their person through a need the indirect set: gli, le, gli.',
      'me, te, lui, lei, noi, voi, loro follow every preposition.',
      'Emphasis moves the pronoun after the verb: l’ha detto a me.',
      'Combined, mi + lo becomes me lo; gli/le + lo becomes glielo.',
    ],
  },

  {
    id: 'L14',
    title: 'Piacere — liking things backwards',
    subtitle: 'Italian doesn’t say "I like pizza". It says "pizza is pleasing to me".',
    minutes: 4,
    practise: 'g9',
    sections: [
      {
        h: 'The sentence turns around',
        p: `<p><i>Piacere</i> doesn't mean "to like". It means "to be pleasing". So the
          thing you like is the <b>subject</b>, and you are the indirect object — the
          opposite arrangement to English.</p>
          <p>Which means the verb agrees with <i>the thing</i>, not with you.</p>`,
        examples: [
          { it: 'Mi piace il caffè.', en: 'I like coffee.', note: 'one thing → piace' },
          { it: 'Mi piacciono i dolci.', en: 'I like sweets.', note: 'plural → piacciono' },
          { it: 'Mi piace viaggiare.', en: 'I like travelling.', note: 'a verb → piace' },
        ],
      },
      {
        h: 'Only two forms, mostly',
        p: `<p>In practice you need <b>piace</b> for one thing or an action, and
          <b>piacciono</b> for several. That's the whole decision.</p>`,
        table: {
          head: ['Person', 'Form', 'Example'],
          rows: [
            ['to me', 'mi', 'mi piace'],
            ['to you', 'ti', 'ti piace'],
            ['to him / her', 'gli / le', 'gli piace / le piace'],
            ['to us', 'ci', 'ci piace'],
            ['to you (pl)', 'vi', 'vi piace'],
            ['to them', 'gli', 'gli piace'],
          ],
        },
      },
      {
        h: 'The same pattern, other verbs',
        p: `<p>Once you see the shape, several other common verbs work identically —
          and one of them trips up nearly everybody.</p>`,
        examples: [
          { it: 'Mi manchi.', en: 'I miss you.', note: 'literally "you are missing to me"' },
          { it: 'Mi serve aiuto.', en: 'I need help.' },
          { it: 'Non mi basta.', en: 'It’s not enough for me.' },
          { it: 'Mi sembra strano.', en: 'It seems strange to me.' },
        ],
      },
      {
        h: 'In the past it takes essere',
        p: `<p>And so the participle agrees with the thing liked, not with you.</p>`,
        examples: [
          { it: 'Mi è piaciuto il film.', en: 'I liked the film.' },
          { it: 'Mi è piaciuta la cena.', en: 'I liked the dinner.' },
          { it: 'Mi sono piaciuti i dolci.', en: 'I liked the sweets.' },
        ],
      },
    ],
    watchOut: `<i>Mi manchi</i> means "I miss you" — but the ending is <i>-i</i> because
      <b>you</b> are the subject doing the missing-to-me. Say <i>mi manca</i> and you've
      said "I miss him/her/it". Getting this backwards in a message to someone is a
      memorable mistake.`,
    keyPoints: [
      'The thing liked is the subject; the verb agrees with it.',
      'piace for one thing or an infinitive; piacciono for plural.',
      'mancare, servire, bastare and sembrare follow the same pattern.',
      'Past tense uses essere, agreeing with the thing liked.',
    ],
  },

  {
    id: 'L15',
    title: 'Ci and ne',
    subtitle: 'Two tiny words that appear constantly and translate to almost nothing.',
    minutes: 4,
    sections: [
      {
        h: 'Ci = there',
        p: `<p>Its most common job is replacing a place already mentioned, exactly where
          English would just leave a gap.</p>`,
        examples: [
          { it: '— Vai a Roma? — Sì, ci vado domani.', en: '— Are you going to Rome? — Yes, I’m going tomorrow.' },
          { it: 'Ci sono stato l’anno scorso.', en: 'I went there last year.' },
        ],
      },
      {
        h: 'And c’è / ci sono',
        p: `<p>The "there is / there are" construction is the same <i>ci</i>, fused with
          <i>essere</i>. Don't confuse it with plain <i>è</i>.</p>`,
        examples: [
          { it: 'C’è un problema.', en: 'There is a problem.' },
          { it: 'È un problema.', en: 'It is a problem.', note: 'different meaning entirely' },
          { it: 'Ci sono due camere.', en: 'There are two rooms.' },
        ],
      },
      {
        h: 'Ne = of it, of them',
        p: `<p><i>Ne</i> replaces a quantity or a "of/about it" phrase. English usually
          drops this altogether, which is why it feels alien.</p>`,
        examples: [
          { it: '— Quante mele vuoi? — Ne voglio tre.', en: '— How many apples do you want? — I want three.', note: 'three of them' },
          { it: 'Ne parliamo domani.', en: 'We’ll talk about it tomorrow.' },
          { it: 'Non ne ho.', en: 'I haven’t got any.' },
        ],
      },
      {
        h: 'Fixed expressions worth knowing whole',
        p: `<p>Both appear in phrases where the logic has worn away — learn them as units:</p>`,
        examples: [
          { it: 'Ci vediamo!', en: 'See you!' },
          { it: 'Non ce la faccio.', en: 'I can’t manage it.' },
          { it: 'Che ne pensi?', en: 'What do you think (about it)?' },
          { it: 'Me ne vado.', en: 'I’m off.' },
        ],
      },
    ],
    watchOut: `Before another pronoun, <i>ci</i> becomes <i>ce</i>: <i>ce l’ho</i>
      ("I’ve got it"), <i>ce ne sono</i> ("there are some"). The spelling change is only
      for ease of pronunciation — nothing about the meaning shifts.`,
    keyPoints: [
      'ci = there, replacing a place already mentioned.',
      'c’è / ci sono is the same ci fused with essere.',
      'ne = of it / of them, especially with quantities.',
      'Both live inside fixed phrases best learned whole.',
    ],
  },

  {
    id: 'L16',
    title: 'Giving instructions',
    subtitle: 'The imperative — for directions, recipes, requests, and telling someone not to.',
    minutes: 4,
    sections: [
      {
        h: 'The forms',
        p: `<p>Commands exist for the people you can address: <i>tu</i>, the polite
          <i>Lei</i>, <i>noi</i> ("let's…") and <i>voi</i>.</p>`,
        table: {
          head: ['', '-are (parlare)', '-ere (prendere)', '-ire (dormire)'],
          rows: [
            ['tu', 'parla!', 'prendi!', 'dormi!'],
            ['Lei', 'parli!', 'prenda!', 'dorma!'],
            ['noi', 'parliamo!', 'prendiamo!', 'dormiamo!'],
            ['voi', 'parlate!', 'prendete!', 'dormite!'],
          ],
        },
      },
      {
        h: 'The vowels swap over',
        p: `<p>Notice what happens with <i>-are</i> verbs: informal <i>tu</i> ends in
          <b>-a</b> and polite <i>Lei</i> ends in <b>-i</b>. For <i>-ere</i> and <i>-ire</i>
          it's the other way round. That single letter carries the entire register — which
          is why <i>scusa</i> and <i>scusi</i> differ by one vowel and a whole social
          relationship.</p>`,
        examples: [
          { it: 'Scusa!', en: 'Sorry!', note: 'tu' },
          { it: 'Scusi!', en: 'Excuse me!', note: 'Lei' },
          { it: 'Senta, scusi…', en: 'Excuse me, listen…', note: 'polite, to a stranger' },
        ],
      },
      {
        h: 'Saying "don’t"',
        p: `<p>Here's the rule with no English parallel: to tell <b>one person you know</b>
          not to do something, use <i>non</i> + the <b>infinitive</b>.</p>`,
        examples: [
          { it: 'Non parlare!', en: 'Don’t speak!', note: 'tu — infinitive' },
          { it: 'Non andare!', en: 'Don’t go!' },
          { it: 'Non parli!', en: 'Don’t speak!', note: 'Lei — normal imperative' },
          { it: 'Non parlate!', en: 'Don’t speak!', note: 'voi' },
        ],
      },
      {
        h: 'Short forms and doubled letters',
        p: `<p>Five common verbs have clipped <i>tu</i> commands: <b>va’</b>, <b>da’</b>,
          <b>di’</b>, <b>fa’</b>, <b>sta’</b>. When a pronoun attaches, its consonant
          doubles.</p>`,
        examples: [
          { it: 'Dimmi!', en: 'Tell me!', note: 'di’ + mi' },
          { it: 'Dammi il libro.', en: 'Give me the book.', note: 'da’ + mi' },
          { it: 'Fallo!', en: 'Do it!' },
        ],
      },
      {
        h: 'Where you’ll actually meet it',
        p: `<p>Directions are almost entirely imperatives in the polite form, which is
          exactly what you'll hear when you ask a stranger the way:</p>`,
        examples: [
          { it: 'Vada sempre dritto.', en: 'Go straight ahead.' },
          { it: 'Giri a destra dopo il ponte.', en: 'Turn right after the bridge.' },
          { it: 'Prenda la seconda strada.', en: 'Take the second street.' },
        ],
      },
    ],
    watchOut: `Pronouns attach to the end for <i>tu/noi/voi</i> but go <b>in front</b>
      for the polite form: <i>Dimmi</i> but <i>Mi dica</i>. Say <i>dicami</i> and you've
      mixed the two registers in a single word.`,
    keyPoints: [
      'tu, Lei, noi and voi each have a command form.',
      '-are verbs: tu ends -a, Lei ends -i. The other conjugations reverse it.',
      'Negative tu commands use non + the infinitive.',
      'Pronouns attach for tu/noi/voi, but precede the polite Lei.',
    ],
  },

  {
    id: 'L17',
    title: 'Right now: stare + gerundio',
    subtitle: 'Italian has a present continuous — but uses it far less than English does.',
    minutes: 3,
    sections: [
      {
        h: 'How to build it',
        p: `<p><i>Stare</i> conjugated, plus the gerund: <b>-are → -ando</b>,
          <b>-ere / -ire → -endo</b>.</p>`,
        table: {
          head: ['', 'Form'],
          rows: [
            ['io', 'sto parlando'],
            ['tu', 'stai parlando'],
            ['lui / lei', 'sta parlando'],
            ['noi', 'stiamo parlando'],
            ['voi', 'state parlando'],
            ['loro', 'stanno parlando'],
          ],
        },
      },
      {
        h: 'Three irregular gerunds',
        p: `<p>They use the same odd stems as the imperfetto: <i>fare → facendo</i>,
          <i>dire → dicendo</i>, <i>bere → bevendo</i>. And <i>-isc-</i> verbs drop the
          insert here: <i>capire → capendo</i>.</p>`,
      },
      {
        h: 'The trap: it’s much narrower than English',
        p: `<p>English uses the continuous constantly — for now, for plans, for
          temporary situations. Italian reserves it for something <b>genuinely in progress
          at this moment</b>. The plain present already covers the rest, because
          <i>parlo</i> means both "I speak" and "I am speaking".</p>`,
        table: {
          head: ['English', 'Italian', 'Not'],
          rows: [
            ['What are you doing?', 'Che fai?', '(Che stai facendo? is heavier)'],
            ['I’m working tomorrow', 'Domani lavoro.', 'Domani sto lavorando'],
            ['— Where’s Marco? — He’s eating.', 'Sta mangiando.', '— correct, it’s in progress'],
          ],
        },
      },
      {
        h: 'In the past too',
        p: `<p>Put <i>stare</i> in the imperfetto and you get "was —ing", which pairs
          naturally with a passato prossimo event.</p>`,
        examples: [
          { it: 'Stavo mangiando quando è arrivato.', en: 'I was eating when he arrived.' },
        ],
      },
    ],
    watchOut: `Never use a gerund after a preposition, however natural it feels in
      English. "Before eating" is <i>prima di <b>mangiare</b></i>, and "I’m tired of
      waiting" is <i>sono stanco di <b>aspettare</b></i> — infinitives, both.`,
    keyPoints: [
      'stare + -ando / -endo, for an action happening right now.',
      'The plain present already means "am —ing"; the progressive is emphasis.',
      'Never use it for future plans — Italian uses the present for those.',
      'After a preposition, use the infinitive, not the gerund.',
    ],
  },

  {
    id: 'L18',
    title: 'More, less, as much as',
    subtitle: 'Two words do all the comparing. Choosing between di and che is where it goes wrong.',
    minutes: 4,
    practise: 'g15',
    sections: [
      {
        h: 'There is no -er ending',
        p: `<p>English has two ways to build a comparative — <i>bigger</i> but
          <i>more expensive</i> — and no reliable rule about which word takes which. Italian
          has one way. Put <b>più</b> ("more") or <b>meno</b> ("less") in front, and you're
          done, whatever the length of the adjective.</p>`,
        examples: [
          { it: 'Questa camera è più grande.', en: 'This room is bigger.' },
          { it: 'Questo albergo è meno caro.', en: 'This hotel is less expensive.' },
          { it: 'Vorrei un caffè più forte.', en: 'I’d like a stronger coffee.' },
        ],
      },
      {
        h: '"Than" is usually di',
        p: `<p>And because <i>di</i> fuses with the definite article, the "than" half often
          arrives welded to something: <i>più alto <b>del</b> padre</i>.</p>`,
        examples: [
          { it: 'Roma è più grande di Firenze.', en: 'Rome is bigger than Florence.' },
          { it: 'Ho più tempo di te.', en: 'I have more time than you.', note: 'stressed pronoun after di' },
          { it: 'Il treno è più veloce della macchina.', en: 'The train is faster than the car.' },
        ],
      },
      {
        h: 'But che when the two halves are parallel',
        p: `<p>Here's the rule that actually decides it. Use <b>di</b> when you're comparing
          <i>two things</i> against one quality. Use <b>che</b> when both halves hang off the
          same verb — two adjectives, two verbs, two nouns, or anything introduced by a
          preposition.</p>
          <p>Test: if what follows "than" isn't a plain noun or pronoun, it's almost
          certainly <i>che</i>.</p>`,
        examples: [
          { it: 'È più simpatico che intelligente.', en: 'He’s more likeable than clever.', note: 'two adjectives' },
          { it: 'È più facile parlare che scrivere.', en: 'It’s easier to speak than to write.', note: 'two verbs' },
          { it: 'Ho più amici che soldi.', en: 'I have more friends than money.', note: 'two nouns, one verb' },
          { it: 'Ci sono più macchine a Milano che a Roma.', en: 'There are more cars in Milan than in Rome.', note: 'after a preposition' },
        ],
      },
      {
        h: 'As … as',
        p: `<p>Equality uses <b>come</b> or <b>quanto</b>. The "as" that English puts in front
          — <i>così</i> or <i>tanto</i> — is optional and usually dropped.</p>`,
        examples: [
          { it: 'Marco è alto come me.', en: 'Marco is as tall as me.' },
          { it: 'Non è caro come pensavo.', en: 'It isn’t as expensive as I thought.' },
        ],
      },
      {
        h: 'When there’s no second half',
        p: `<p>If you're not comparing with anything in particular — just "more" or "less"
          in the abstract — Italian adds <b>di</b> in front: <i>di più</i>, <i>di meno</i>.</p>`,
        examples: [
          { it: 'Devo lavorare di più.', en: 'I need to work more.' },
          { it: 'Mangia di meno!', en: 'Eat less!' },
        ],
      },
    ],
    watchOut: `After <i>di</i> you need the stressed pronoun: <i>più alto di me</i>, never
      <i>di io</i>. English is famously undecided here ("taller than me" versus "taller than
      I"), and Italian is not — it's the same set that follows every other preposition.`,
    keyPoints: [
      'più / meno + adjective. There is no -er ending in Italian.',
      '"Than" is di before a noun or pronoun.',
      '"Than" is che before an adjective, a verb, or a preposition.',
      'come or quanto for "as … as"; di più / di meno with nothing following.',
    ],
  },

  {
    id: 'L19',
    title: 'The best, the worst, and -issimo',
    subtitle: 'Two kinds of superlative: one that compares, and one that just piles it on.',
    minutes: 4,
    practise: 'g15',
    sections: [
      {
        h: 'The most: article + più',
        p: `<p>To pick something out of a group, add the definite article to the comparative.
          The article goes with the noun, not with <i>più</i>, so it usually sits some way
          in front of it.</p>
          <p>And the "in" or "of" that follows is <b>di</b> — never <i>in</i>, however much
          "the best restaurant <b>in</b> town" pulls you that way.</p>`,
        examples: [
          { it: 'È la città più bella d’Italia.', en: 'It’s the most beautiful city in Italy.' },
          { it: 'Anna è la più brava della classe.', en: 'Anna is the best in the class.' },
          { it: 'Il giorno più lungo dell’anno.', en: 'The longest day of the year.' },
        ],
      },
      {
        h: '-issimo: very, with feeling',
        p: `<p>This one doesn't compare with anything. Drop the final vowel of the adjective
          and add <b>-issimo</b>, then let it agree normally. It means "very" — but a warmer,
          more emphatic very than <i>molto</i>, which is why Italians use it constantly.</p>
          <p>The spelling rules from the plurals lesson still apply: keep the consonant sound
          honest.</p>`,
        examples: [
          { it: 'Questo vino è buonissimo.', en: 'This wine is really good.' },
          { it: 'La cena era buonissima.', en: 'The dinner was delicious.' },
          { it: 'È un problema lunghissimo.', en: 'It’s an extremely long problem.', note: 'lungo → lunghissimo, h keeps the g hard' },
          { it: 'Grazie, sei gentilissimo.', en: 'Thank you, that’s very kind of you.' },
        ],
      },
      {
        h: 'The irregular four',
        p: `<p>Just as English has <i>good / better / best</i> rather than "gooder", a few
          Italian adjectives have their own comparative forms. The regular ones
          (<i>più buono</i>, <i>più cattivo</i>) do exist and are used for literal taste and
          character, but these are what you'll hear:</p>`,
        table: {
          head: ['Adjective', 'Comparative', 'Superlative'],
          rows: [
            ['buono', 'migliore', 'il migliore'],
            ['cattivo', 'peggiore', 'il peggiore'],
            ['grande', 'maggiore', 'il maggiore'],
            ['piccolo', 'minore', 'il minore'],
          ],
        },
      },
      {
        h: 'migliore describes a thing; meglio describes an action',
        p: `<p>English uses "better" for both — "this wine is better", "I feel better" — and
          Italian splits them. <b>Migliore</b> is an adjective and modifies a noun.
          <b>Meglio</b> is an adverb and modifies a verb. Same for
          <b>peggiore</b> and <b>peggio</b>.</p>`,
        examples: [
          { it: 'Questo vino è migliore.', en: 'This wine is better.', note: 'describing the wine' },
          { it: 'Oggi sto meglio.', en: 'I feel better today.', note: 'describing how I am' },
          { it: 'Parla italiano meglio di me.', en: 'He speaks Italian better than me.' },
        ],
      },
    ],
    watchOut: `Don't stack the two superlatives. <i>Il più buonissimo</i> is not more
      emphatic — it's simply wrong. Pick one: <i>il migliore</i> if you're comparing,
      <i>buonissimo</i> if you're just enthusiastic.`,
    keyPoints: [
      'The relative superlative is article + più, with di for "in/of".',
      '-issimo is an absolute "very", not a comparison.',
      'buono → migliore, cattivo → peggiore, and they behave as adjectives.',
      'meglio and peggio are the adverbs — they describe actions, not things.',
    ],
  },

  {
    id: 'L20',
    title: 'How something is done',
    subtitle: 'Italian’s answer to -ly is -mente, and it is built on the feminine for a reason.',
    minutes: 4,
    practise: 'g22',
    sections: [
      {
        h: 'Build it from the feminine',
        p: `<p>Take the adjective, put it in the <b>feminine singular</b>, add <b>-mente</b>.
          <i>lento → lenta → lentamente</i>.</p>
          <p>Why the feminine, of all things? Because <i>-mente</i> was once a separate Latin
          word: <i>mens</i>, "mind", which is feminine. "Slowly" started life as
          "with a slow mind", and the adjective had to agree with it. The agreement survived
          long after the noun was forgotten.</p>`,
        examples: [
          { it: 'Parla molto lentamente.', en: 'He speaks very slowly.' },
          { it: 'Veramente non lo so.', en: 'I really don’t know.' },
          { it: 'Probabilmente arrivo tardi.', en: 'I’ll probably arrive late.' },
        ],
      },
      {
        h: 'Two small adjustments',
        p: `<ul>
            <li>Adjectives already ending in <b>-e</b> have no separate feminine, so they
              just take the ending: <i>veloce → velocemente</i>, <i>forte → fortemente</i>.</li>
            <li>Those ending in <b>-le</b> or <b>-re</b> drop the final e first:
              <i>facile → facilmente</i>, <i>particolare → particolarmente</i>,
              <i>normale → normalmente</i>. Italian won't tolerate the extra syllable.</li>
          </ul>`,
      },
      {
        h: 'The ones you need most don’t use it at all',
        p: `<p>Exactly as in English — where "well" isn't "goodly" — the highest-frequency
          adverbs are irregular one-offs, and you already know several of them:
          <i>bene, male, meglio, peggio, presto, tardi, spesso, sempre, mai, insieme,
          volentieri, così</i>.</p>`,
      },
      {
        h: 'buono or bene?',
        p: `<p>This is the mistake to actually worry about. <b>Buono</b> is an adjective: it
          describes a thing, and it agrees. <b>Bene</b> is an adverb: it describes an action,
          and it never changes. English blurs them in casual speech ("it went good"), so the
          instinct isn't reliable.</p>`,
        examples: [
          { it: 'Il caffè è buono.', en: 'The coffee is good.', note: 'the coffee itself' },
          { it: 'Qui si mangia bene.', en: 'The food here is good.', note: 'literally "one eats well"' },
          { it: 'È un buon cuoco: cucina bene.', en: 'He’s a good cook: he cooks well.' },
        ],
      },
      {
        h: 'Where the adverb sits',
        p: `<p>Normally straight after the verb. But with a compound past, the short common
          adverbs slide <i>inside</i> — between the auxiliary and the participle, where
          English would not put them.</p>`,
        examples: [
          { it: 'Non ho mai visto un film così bello.', en: 'I’ve never seen such a good film.' },
          { it: 'Ho già mangiato.', en: 'I’ve already eaten.' },
          { it: 'Ho sempre pensato di sì.', en: 'I’ve always thought so.' },
        ],
      },
    ],
    watchOut: `<i>Anche</i> ("also", "too") goes immediately <b>before</b> the thing it
      applies to, not at the end of the sentence where English likes to park "too".
      <i>Anche io vengo</i> is "I'm coming too"; <i>vengo anche io</i> shifts the emphasis;
      and putting <i>anche</i> last just leaves it hanging.`,
    keyPoints: [
      'Feminine singular of the adjective + -mente.',
      '-le and -re adjectives drop the final e: facilmente.',
      'The most common adverbs — bene, male, meglio, presto — are irregular.',
      'buono describes a thing; bene describes an action.',
    ],
  },

  {
    id: 'L21',
    title: 'Someone, something, a few, every',
    subtitle: 'The words that stand in for people and things you can’t name — including one that looks plural and isn’t.',
    minutes: 4,
    practise: 'g21',
    sections: [
      {
        h: 'The two that never change',
        p: `<p><b>qualcuno</b> ("someone") and <b>qualcosa</b> ("something") are pronouns
          with a single form each. No gender, no plural, nothing to agree with. Their
          negative partners are the <i>nessuno</i> and <i>niente</i> you already met.</p>`,
        examples: [
          { it: 'C’è qualcuno alla porta.', en: 'There’s someone at the door.' },
          { it: 'Vuoi qualcosa da bere?', en: 'Would you like something to drink?' },
          { it: 'Non c’è nessuno.', en: 'There’s nobody there.' },
        ],
      },
      {
        h: 'An adjective after them needs di',
        p: `<p>English joins them directly — "something good", "nothing special". Italian
          needs a joint, and the adjective then stays stubbornly masculine singular no matter
          what you're talking about.</p>`,
        examples: [
          { it: 'Vorrei qualcosa di fresco.', en: 'I’d like something cool.' },
          { it: 'Niente di speciale.', en: 'Nothing special.' },
          { it: 'C’è qualcosa di buono?', en: 'Is there anything good?' },
        ],
      },
      {
        h: 'qualche takes a singular noun',
        p: `<p>This is the one that looks like an error. <b>Qualche</b> means "a few" — a
          plural idea — and it is followed by a <b>singular</b> noun with singular agreement
          everywhere. <i>Qualche amico</i> means several friends.</p>
          <p><b>Alcuni / alcune</b> means exactly the same thing and behaves the way you'd
          expect, with a plural noun. Either is fine; only the grammar differs.</p>`,
        examples: [
          { it: 'Ho qualche amico a Roma.', en: 'I have a few friends in Rome.', note: 'singular noun, plural meaning' },
          { it: 'Ho alcuni amici a Roma.', en: 'I have a few friends in Rome.', note: 'the same thing, said normally' },
          { it: 'Qualche volta vado al cinema.', en: 'Sometimes I go to the cinema.' },
        ],
      },
      {
        h: 'ogni, ognuno, tutti',
        p: `<p><b>Ogni</b> ("every") is also always singular and never changes at all —
          no <i>ogna</i>, no <i>ogni giorni</i>. Its pronoun is <b>ognuno</b>, "each one".</p>
          <p>Where English says "every day", Italian offers two routes: <i>ogni giorno</i>,
          or <i>tutti i giorni</i> — plural, and with the article, because <i>tutto</i>
          always demands one.</p>`,
        examples: [
          { it: 'Ogni giorno vado a lavorare.', en: 'Every day I go to work.' },
          { it: 'Tutti i giorni la stessa cosa.', en: 'The same thing every day.' },
          { it: 'Ognuno di noi ha una chiave.', en: 'Each of us has a key.' },
          { it: 'Ho mangiato tutta la pizza.', en: 'I ate the whole pizza.', note: 'tutto + article' },
        ],
      },
    ],
    watchOut: `<i>Qualche amici</i> is the mistake, and it's an easy one because every
      instinct says a plural meaning wants a plural noun. If you can't trust yourself in the
      moment, say <i>alcuni</i> instead — it means the same and agrees the way you expect.`,
    keyPoints: [
      'qualcuno and qualcosa are invariable pronouns.',
      'An adjective after them takes di, and stays masculine singular.',
      'qualche + singular noun = "a few"; alcuni + plural means the same.',
      'ogni is invariable and singular; tutto always brings the article.',
    ],
  },

  {
    id: 'L22',
    title: 'The future you often don’t need',
    subtitle: 'Italian has a full future tense, and then mostly uses the present instead.',
    minutes: 5,
    practise: 'g24',
    sections: [
      {
        h: 'One set of endings for everything',
        p: `<p>Unusually for Italian, all three conjugations share the same future endings.
          The stem is the infinitive minus its final <b>-e</b>, with <b>-are</b> shifting to
          <b>-er-</b> so that <i>parlare</i> and <i>credere</i> end up rhyming.</p>`,
        table: {
          head: ['', 'parlare', 'credere', 'dormire'],
          rows: [
            ['io', 'parlerò', 'crederò', 'dormirò'],
            ['tu', 'parlerai', 'crederai', 'dormirai'],
            ['lui / lei', 'parlerà', 'crederà', 'dormirà'],
            ['noi', 'parleremo', 'crederemo', 'dormiremo'],
            ['voi', 'parlerete', 'crederete', 'dormirete'],
            ['loro', 'parleranno', 'crederanno', 'dormiranno'],
          ],
        },
      },
      {
        h: 'The irregular stems are worth the effort twice',
        p: `<p>They're all contractions — the language squeezing out a syllable — and every
          one of them serves the conditional as well, so learning the list once pays for two
          tenses.</p>
          <p><i>essere → sarò</i>, <i>avere → avrò</i>, <i>andare → andrò</i>,
          <i>fare → farò</i>, <i>stare → starò</i>, <i>potere → potrò</i>,
          <i>volere → vorrò</i>, <i>dovere → dovrò</i>, <i>sapere → saprò</i>,
          <i>vedere → vedrò</i>, <i>venire → verrò</i>, <i>bere → berrò</i>,
          <i>rimanere → rimarrò</i>.</p>`,
      },
      {
        h: 'For a settled plan, use the present',
        p: `<p>This is the part that matters more than the conjugation. If a plan is decided
          and a time word makes the timing obvious, Italians use the plain present. Reaching
          for the future there isn't wrong, but it sounds heavier and more formal than you
          probably intend.</p>`,
        examples: [
          { it: 'Domani vado a Roma.', en: 'I’m going to Rome tomorrow.' },
          { it: 'Stasera ceniamo fuori.', en: 'We’re eating out tonight.' },
          { it: 'L’anno prossimo cambio lavoro.', en: 'Next year I’m changing jobs.' },
        ],
      },
      {
        h: 'There is no "going to" future',
        p: `<p>English has a second future built from "going to", and Spanish has one too, so
          the reflex to build <i>vado a mangiare</i> is strong. Resist it: in Italian that
          sentence means you are physically going somewhere in order to eat.</p>
          <p>For an intention, the present is enough. For something on the very brink of
          happening, Italian has a dedicated phrase: <b>stare per</b> + infinitive.</p>`,
        examples: [
          { it: 'Vado a mangiare.', en: 'I’m going off to eat.', note: 'actual movement' },
          { it: 'Mangio adesso.', en: 'I’m going to eat now.' },
          { it: 'Sto per uscire.', en: 'I’m about to go out.' },
          { it: 'Il treno sta per partire.', en: 'The train is about to leave.' },
        ],
      },
      {
        h: 'What the futuro is really for',
        p: `<p>Three jobs. Genuine prediction, promises — and, the one nobody expects,
          <b>guessing about the present</b>. When an Italian doesn't know something and is
          estimating, the verb goes into the future even though the time is now.</p>`,
        examples: [
          { it: 'Domani pioverà.', en: 'It’ll rain tomorrow.', note: 'prediction' },
          { it: 'Ti chiamerò stasera.', en: 'I’ll call you this evening.', note: 'promise' },
          { it: '— Che ora è? — Saranno le tre.', en: '— What time is it? — It must be about three.' },
          { it: 'Marco non risponde: dormirà.', en: 'Marco isn’t answering — he must be asleep.' },
        ],
      },
    ],
    watchOut: `After <i>quando</i>, <i>appena</i> and <i>se</i>, English switches to the
      present — "when I <b>arrive</b>, I'll call you" — while Italian is free to keep the
      future in both halves: <i>Quando arriverò, ti chiamerò</i>. Both are correct in Italian;
      only one is correct in English, which is why it sounds strange at first.`,
    keyPoints: [
      'One set of endings: -ò, -ai, -à, -emo, -ete, -anno.',
      'The irregular stems are shared with the conditional.',
      'For settled plans, Italians use the present tense.',
      'The futuro also expresses a guess about right now: saranno le tre.',
    ],
  },

  {
    id: 'L23',
    title: 'Vorrei — the polite tense',
    subtitle: 'You have been using the conditional since your first coffee. Here is the rest of it.',
    minutes: 4,
    practise: 'g25',
    sections: [
      {
        h: 'Same stem as the future',
        p: `<p>Which means the hard part is already done. Take the future stem and change the
          endings to <b>-ei, -esti, -ebbe, -emmo, -este, -ebbero</b>. Every irregular you
          learned for the future carries straight over: <i>sarò → sarei</i>,
          <i>avrò → avrei</i>, <i>vorrò → vorrei</i>.</p>`,
        table: {
          head: ['', 'parlare', 'essere', 'volere'],
          rows: [
            ['io', 'parlerei', 'sarei', 'vorrei'],
            ['tu', 'parleresti', 'saresti', 'vorresti'],
            ['lui / lei', 'parlerebbe', 'sarebbe', 'vorrebbe'],
            ['noi', 'parleremmo', 'saremmo', 'vorremmo'],
            ['voi', 'parlereste', 'sareste', 'vorreste'],
            ['loro', 'parlerebbero', 'sarebbero', 'vorrebbero'],
          ],
        },
      },
      {
        h: 'What it mostly does is soften',
        p: `<p>Nine times out of ten, the conditional is politeness. <i>Voglio un caffè</i>
          is a statement of appetite; <i>vorrei un caffè</i> is a request. It's the same move
          English makes with "I'd like" instead of "I want", and it works on every verb you
          might use to ask for something.</p>`,
        examples: [
          { it: 'Vorrei un caffè, per favore.', en: 'I’d like a coffee, please.' },
          { it: 'Potresti aiutarmi?', en: 'Could you help me?' },
          { it: 'Mi darebbe il conto, per favore?', en: 'Could you give me the bill, please?', note: 'Lei — the polite form' },
        ],
      },
      {
        h: 'Advice, and opinions you don’t want to force',
        p: `<p><i>Dovresti</i> is how you tell someone what to do without telling them what
          to do. And the conditional lets you put an opinion at one remove, which is often
          exactly the register you want with someone you've just met.</p>`,
        examples: [
          { it: 'Dovresti riposare.', en: 'You should rest.' },
          { it: 'Sarebbe meglio partire presto.', en: 'It would be better to leave early.' },
          { it: 'Io non lo farei.', en: 'I wouldn’t do it.' },
        ],
      },
      {
        h: 'Reporting what you can’t vouch for',
        p: `<p>Italian newspapers use the conditional to mark a claim as unconfirmed. English
          needs a whole extra word — "reportedly", "apparently" — where Italian just changes
          the verb. Once you notice it you'll see it in every headline.</p>`,
        examples: [
          { it: 'Secondo il giornale, il treno sarebbe in ritardo.', en: 'According to the paper, the train is reportedly late.' },
        ],
      },
      {
        h: 'And the "would" of a hypothesis',
        p: `<p>The other half of an <i>if</i> sentence is always a conditional:
          <i>with more time, I would study more</i>. That construction has its own lesson
          coming, because the <i>if</i> half is where the difficulty lives — but the
          conditional half is just this tense.</p>`,
        examples: [
          { it: 'Con più tempo studierei di più.', en: 'With more time I’d study more.' },
          { it: 'Verrebbero volentieri, ma sono in ritardo.', en: 'They’d gladly come, but they’re late.' },
        ],
      },
    ],
    watchOut: `English "would" has a second life meaning "used to" — "as a child I would play
      football". That is <b>not</b> the conditional: it's the imperfetto,
      <i>da bambino giocavo a calcio</i>. Ask whether "would" is describing a repeated past
      or an unreal present; only the second one is <i>giocherei</i>.`,
    keyPoints: [
      'Future stem plus -ei, -esti, -ebbe, -emmo, -este, -ebbero.',
      'Its everyday job is politeness: vorrei, potresti, dovresti.',
      'It also reports claims the speaker won’t vouch for.',
      'English "would" meaning "used to" is the imperfetto, not this.',
    ],
  },

  {
    id: 'L24',
    title: 'When nobody in particular does it',
    subtitle: 'How Italian says "one", "you", or "people" without naming anyone at all.',
    minutes: 4,
    practise: 'g23',
    sections: [
      {
        h: 'English has no comfortable word for this',
        p: `<p>"One eats well in Italy" is stiff. "You eat well in Italy" isn't really about
          you. "They eat well" raises the question of who. English keeps improvising, and
          none of the options is neutral.</p>
          <p>Italian has a dedicated construction and uses it constantly: <b>si</b> plus the
          third person singular.</p>`,
        examples: [
          { it: 'In Italia si mangia bene.', en: 'The food is good in Italy.' },
          { it: 'Qui non si fuma.', en: 'There’s no smoking here.' },
          { it: 'A che ora si cena in Italia?', en: 'What time do people have dinner in Italy?' },
        ],
      },
      {
        h: 'You already know one of them',
        p: `<p><i>Come si dice…?</i> — "How do you say…?" — is this construction, not a
          reflexive. Nobody is doing anything to themselves; the <i>si</i> is standing in for
          people in general. Same with <i>come si scrive</i> and <i>si può</i>.</p>`,
        examples: [
          { it: 'Come si dice in italiano?', en: 'How do you say it in Italian?' },
          { it: 'Non si può fumare qui.', en: 'You can’t smoke here.' },
          { it: 'Come si va alla stazione?', en: 'How do you get to the station?' },
        ],
      },
      {
        h: 'A plural object drags the verb plural',
        p: `<p>This looks like a mistake and it's the rule. If what follows is plural, so is
          the verb — because grammatically the object <i>is</i> the subject. <i>Qui si
          parlano tre lingue</i> is really "three languages are spoken here", with the
          languages doing the work.</p>`,
        examples: [
          { it: 'Qui si parla inglese.', en: 'English is spoken here.' },
          { it: 'Qui si parlano tre lingue.', en: 'Three languages are spoken here.', note: 'plural object, plural verb' },
          { it: 'In questo negozio si vendono libri usati.', en: 'This shop sells second-hand books.' },
        ],
      },
      {
        h: 'The register of signs and rules',
        p: `<p>Once you've noticed it, it's everywhere in public writing — shop windows,
          notices, instructions. It lets a rule exist without anyone appearing to impose
          it.</p>`,
        examples: [
          { it: 'Si vende.', en: 'For sale.' },
          { it: 'Non si accettano carte.', en: 'Cards not accepted.' },
        ],
      },
    ],
    watchOut: `<i>Si</i> is already the reflexive pronoun, so a reflexive verb can't take
      another one. Italian solves it with <b>ci si</b>: <i>ci si alza presto</i>, "people get
      up early". And in the past the whole construction takes <i>essere</i>, whatever the
      verb would normally use — <i>si è mangiato bene</i>, with <i>essere</i>, even though
      <i>mangiare</i> takes <i>avere</i>.`,
    keyPoints: [
      'si + third person singular = one / you / people in general.',
      'Come si dice…? is this construction, not a reflexive.',
      'A plural object makes the verb plural: si vendono libri.',
      'Reflexives become ci si, and the past always uses essere.',
    ],
  },

  {
    id: 'L25',
    title: 'Joining two sentences: che and cui',
    subtitle: 'The little word English lets you leave out — and Italian never does.',
    minutes: 4,
    practise: 'g28',
    sections: [
      {
        h: 'che covers almost everything',
        p: `<p>One word, and it doesn't care about any of the things Italian usually cares
          about. <b>Che</b> works for people and for things, for subjects and for objects,
          singular and plural. Where English chooses between <i>who</i>, <i>whom</i>,
          <i>which</i> and <i>that</i>, Italian just says <i>che</i>.</p>`,
        examples: [
          { it: 'Il ragazzo che parla è mio fratello.', en: 'The boy who’s talking is my brother.' },
          { it: 'Il libro che ho letto era bellissimo.', en: 'The book I read was wonderful.' },
          { it: 'Le ragazze che ho visto ieri.', en: 'The girls I saw yesterday.' },
        ],
      },
      {
        h: 'And it can never be dropped',
        p: `<p>English quietly deletes it: "the book I read", "the man I saw", "the film we
          watched". Italian has no such option — the sentence falls apart without it. This is
          probably the most common structural mistake English speakers make in Italian,
          because there's nothing in the English to remind you that a word is missing.</p>
          <p>A useful habit: when you catch yourself putting two nouns and two verbs into one
          sentence, check that a <i>che</i> is holding them together.</p>`,
      },
      {
        h: 'After a preposition it becomes cui',
        p: `<p>And the preposition goes <b>in front</b>. English strands prepositions at the
          end of the clause — "the city I live in", "the girl I go out with" — and Italian
          cannot do that at all.</p>`,
        examples: [
          { it: 'La città in cui abito è piccola.', en: 'The city I live in is small.' },
          { it: 'L’amico a cui ho scritto vive a Roma.', en: 'The friend I wrote to lives in Rome.' },
          { it: 'La ragazza con cui esco è italiana.', en: 'The girl I go out with is Italian.' },
          { it: 'Il motivo per cui non vengo.', en: 'The reason I’m not coming.' },
        ],
      },
      {
        h: '"What" in the middle of a sentence is quello che',
        p: `<p>When English uses <i>what</i> and isn't asking a question, it means "the thing
          that" — and Italian says exactly that: <b>quello che</b>, or the slightly more
          literary <i>ciò che</i>. A bare <i>che</i> won't do the job.</p>`,
        examples: [
          { it: 'Non capisco quello che dici.', en: 'I don’t understand what you’re saying.' },
          { it: 'Fai quello che vuoi.', en: 'Do what you like.' },
        ],
      },
    ],
    watchOut: `<i>Chi</i> is a question word, not a relative pronoun — <i>l’uomo chi parla</i>
      is wrong, and it's <i>che</i>. The one place <i>chi</i> does join clauses is at the
      start of a general statement, meaning "whoever": <i>Chi dorme non piglia pesci</i> —
      "he who sleeps catches no fish".`,
    keyPoints: [
      'che serves as who, whom, which and that, for any gender or number.',
      'It can never be omitted, however natural that feels in English.',
      'After a preposition use cui, with the preposition in front.',
      '"What" mid-sentence is quello che.',
    ],
  },

  {
    id: 'L26',
    title: 'The congiuntivo: what you think, want and doubt',
    subtitle: 'A whole mood English has almost lost — and the fastest way to stop sounding like a beginner.',
    minutes: 6,
    practise: 'g26',
    sections: [
      {
        h: 'English had this too',
        p: `<p>"If I <b>were</b> you." "I insist that he <b>be</b> present." "God <b>save</b>
          the Queen." Those aren't mistakes and they aren't archaic flourishes — they're the
          last survivors of the English subjunctive, a mood that once ran through the whole
          language and has now shrunk to a handful of phrases.</p>
          <p>Italian kept all of it. So the concept isn't foreign to you; only the coverage
          is.</p>`,
      },
      {
        h: 'The dividing line is fact versus attitude',
        p: `<p>The indicative states what is. The congiuntivo appears in the second half of a
          sentence when the <b>first</b> half frames it as an opinion, a wish, a doubt or a
          feeling rather than a fact.</p>
          <p>Which means the decision is made before you get there. Look at the verb you
          started with, not the one you're about to write.</p>`,
        examples: [
          { it: 'So che Marco è a casa.', en: 'I know Marco is at home.', note: 'a fact → indicative' },
          { it: 'Penso che Marco sia a casa.', en: 'I think Marco is at home.', note: 'an opinion → congiuntivo' },
          { it: 'È vero che Anna parte.', en: 'It’s true that Anna is leaving.', note: 'asserted → indicative' },
          { it: 'Spero che Anna parta.', en: 'I hope Anna leaves.', note: 'a wish → congiuntivo' },
        ],
      },
      {
        h: 'The forms',
        p: `<p>The two patterns swap the vowels you'd expect, which is the same trick the
          polite imperative plays — and for the same reason, since the <i>Lei</i> command
          <i>is</i> a subjunctive.</p>`,
        table: {
          head: ['', '-are (parlare)', '-ere (credere)', '-ire (dormire)'],
          rows: [
            ['che io', 'parli', 'creda', 'dorma'],
            ['che tu', 'parli', 'creda', 'dorma'],
            ['che lui / lei', 'parli', 'creda', 'dorma'],
            ['che noi', 'parliamo', 'crediamo', 'dormiamo'],
            ['che voi', 'parliate', 'crediate', 'dormiate'],
            ['che loro', 'parlino', 'credano', 'dormano'],
          ],
        },
      },
      {
        h: 'All three singulars are identical',
        p: `<p>Which is why the pronoun comes back from the dead here. <i>Che parli</i> could
          be I, you or he, so Italian puts <i>tu</i> in: <i>Penso che tu parli bene</i>. It's
          one of the few places where dropping the subject genuinely costs you information.</p>
          <p>The irregulars are the usual suspects, and most are built from the <i>io</i>
          form of the present: <i>sia, abbia, faccia, vada, stia, possa, voglia, debba,
          sappia, venga, dia, dica</i>.</p>`,
      },
      {
        h: 'The triggers worth memorising',
        p: `<p>Opinion and belief: <i>penso che, credo che, mi sembra che</i>.<br>
          Wanting and hoping: <i>voglio che, spero che, preferisco che</i>.<br>
          Feeling: <i>ho paura che, sono contento che</i>.<br>
          Impersonal judgements: <i>è importante che, è possibile che, è meglio che</i>.<br>
          Conjunctions: <i>benché, sebbene, prima che, a meno che, purché</i>.</p>
          <p>And what does <b>not</b> trigger it: anything that asserts a fact —
          <i>so che, è vero che, è certo che, dico che, ho visto che</i>.</p>`,
        examples: [
          { it: 'Voglio che tu venga con me.', en: 'I want you to come with me.' },
          { it: 'È meglio che tu parta presto.', en: 'It’s better if you leave early.' },
          { it: 'Benché faccia freddo, esco lo stesso.', en: 'Although it’s cold, I’m going out anyway.' },
        ],
      },
      {
        h: 'Same subject, no che at all',
        p: `<p>This is the rule that saves you half the work. You only need the congiuntivo
          when the two halves have <b>different subjects</b>. If it's you doing both things,
          drop the <i>che</i> and use <b>di</b> + infinitive.</p>`,
        examples: [
          { it: 'Penso di avere ragione.', en: 'I think I’m right.', note: 'same person → di + infinitive' },
          { it: 'Penso che tu abbia ragione.', en: 'I think you’re right.', note: 'different person → congiuntivo' },
          { it: 'Spero di vederti presto.', en: 'I hope to see you soon.' },
          { it: 'Voglio partire domani.', en: 'I want to leave tomorrow.' },
        ],
      },
    ],
    watchOut: `<i>Penso che è</i> is extremely common in casual speech and is still corrected
      in writing, so it isn't a safe model. If a form deserts you mid-sentence, there's an
      honest way out that native speakers use too: reframe with something that takes the
      indicative. <i>Secondo me è a casa</i> and <i>forse è a casa</i> both say what you
      meant, and neither needs a subjunctive.`,
    keyPoints: [
      'The first verb decides: opinion, wish, doubt or feeling triggers the congiuntivo.',
      'Facts keep the indicative — so che, è vero che.',
      'All three singular forms are identical, so the pronoun comes back.',
      'Same subject in both halves? Use di + infinitive and skip it entirely.',
    ],
  },

  {
    id: 'L27',
    title: 'If — and the sentence that goes with it',
    subtitle: 'Three patterns, and one rule Italian schoolchildren get red pen for breaking.',
    minutes: 5,
    practise: 'g27',
    sections: [
      {
        h: 'Type 1: it might really happen',
        p: `<p>Nothing exotic here. Both halves stay in the indicative, exactly as in
          English. Use this whenever the condition is a live possibility.</p>`,
        examples: [
          { it: 'Se piove, resto a casa.', en: 'If it rains, I’ll stay home.' },
          { it: 'Se hai tempo, vieni con noi.', en: 'If you have time, come with us.' },
          { it: 'Se studi, passerai l’esame.', en: 'If you study, you’ll pass the exam.' },
        ],
      },
      {
        h: 'Type 2: it isn’t so',
        p: `<p>For something contrary to the facts — you don't have the time, you haven't won
          the lottery — Italian uses <b>se</b> + congiuntivo imperfetto in the first half, and
          the <b>condizionale</b> in the second.</p>
          <p>English does the same shape and just uses a past tense where Italian uses a
          subjunctive: "if I <i>had</i> time, I <i>would</i> come". The second half is
          identical in both languages.</p>`,
        examples: [
          { it: 'Se avessi tempo, verrei.', en: 'If I had time, I’d come.' },
          { it: 'Se fossi ricco, comprerei una casa a Roma.', en: 'If I were rich, I’d buy a house in Rome.' },
          { it: 'Se potessimo, verremmo volentieri.', en: 'If we could, we’d gladly come.' },
        ],
      },
      {
        h: 'The congiuntivo imperfetto',
        p: `<p>Mercifully regular — even most verbs that are irregular everywhere else behave
          here, because the form is built from the infinitive: <i>facessi, dicessi, potessi,
          venissi, sapessi</i>.</p>`,
        table: {
          head: ['', '-are', '-ere', '-ire', 'essere'],
          rows: [
            ['che io', 'parlassi', 'credessi', 'dormissi', 'fossi'],
            ['che tu', 'parlassi', 'credessi', 'dormissi', 'fossi'],
            ['che lui / lei', 'parlasse', 'credesse', 'dormisse', 'fosse'],
            ['che noi', 'parlassimo', 'credessimo', 'dormissimo', 'fossimo'],
            ['che voi', 'parlaste', 'credeste', 'dormiste', 'foste'],
            ['che loro', 'parlassero', 'credessero', 'dormissero', 'fossero'],
          ],
        },
      },
      {
        h: 'Type 3: it didn’t happen',
        p: `<p>Regret, in other words. Put both halves one step further into the past: the
          <i>if</i> half becomes <i>avessi</i> or <i>fossi</i> plus a participle, and the
          other half becomes the conditional of <i>essere</i> or <i>avere</i> plus a
          participle.</p>`,
        examples: [
          { it: 'Se avessi avuto tempo, sarei venuto.', en: 'If I’d had time, I would have come.' },
          { it: 'Se lo avessi saputo, te lo avrei detto.', en: 'If I’d known, I would have told you.' },
        ],
      },
      {
        h: 'The one hard rule',
        p: `<p><b>Never put a conditional straight after se.</b> <i>Se avrei</i>,
          <i>se vorrei</i>, <i>se sarebbe</i> — these are the errors Italians themselves are
          drilled out of at school, and they're conspicuous.</p>
          <p>The conditional belongs in the <i>other</i> half of the sentence. If you can see
          a <i>would</i> in the English right after "if", it isn't going where you think.</p>`,
      },
    ],
    watchOut: `<i>Se</i> also means "whether", and there it's just an embedded question with
      no hypothesis involved: <i>Non so se viene</i>, "I don't know whether he's coming".
      No congiuntivo, no condizionale. And <i>se fossi in te</i> — "if I were you" — is worth
      learning whole, because you'll want it long before you can build it.`,
    keyPoints: [
      'Real possibility: indicative in both halves.',
      'Unreal now: se + congiuntivo imperfetto, then condizionale.',
      'Unreal in the past: se + avessi/fossi + participle, then the conditional past.',
      'Never a conditional immediately after se.',
    ],
  },
];

export function findLesson(id) {
  return LESSONS_LONG.find((l) => l.id === id);
}
