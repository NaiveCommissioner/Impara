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
];

export function findLesson(id) {
  return LESSONS_LONG.find((l) => l.id === id);
}
