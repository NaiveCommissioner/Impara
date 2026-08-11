# Impara — an Italian trainer that sets its own pace

A local, offline web app for learning to speak Italian. Vocabulary, verb
conjugation and grammar all flow through one spaced-repetition scheduler, so
each day you get a fixed, finite amount of work rather than an open-ended pile.

No accounts, no network calls, no dependencies. Progress lives in your browser's
local storage.

## Installing it (phone or desktop)

Impara is a PWA: a manifest, a service worker and icons. Once loaded it caches
all 30 files and runs with **no network at all** — no server, no wifi.

**On this Mac:** open http://localhost:8123 and use your browser's install
action (Chrome: the icon in the address bar; Safari: File → Add to Dock). It
opens in its own window with no browser chrome.

**On your phone there is one obstacle**, and it isn't optional: service workers
require a **secure context**. `localhost` counts as secure, but
`http://192.168.x.x:8123` does not — over your LAN the browser silently refuses
to register the worker, so the app runs but won't install or work offline.

Three ways round it, worst to best:

1. **Add to Home Screen over LAN anyway.** iOS will honour the manifest and
   give you a standalone icon, but with no offline support — it breaks the
   moment the Mac sleeps. Fine for a look, useless as a habit.
2. **A tunnel** (`cloudflared tunnel --url http://localhost:8123`, or ngrok)
   gives you a real https URL in seconds. Works properly, but only while the
   Mac is awake and the tunnel is up.
3. **Host the static files** — GitHub Pages, Netlify, Cloudflare Pages. This is
   a folder of static files with no backend, so any of them work for free, and
   it's the only option that survives the laptop being shut. Your progress
   still lives entirely in your phone's browser; nothing is uploaded.

## Running it

**Double-click `Impara.command` in Finder.** It starts the server and opens the
app in your browser. Stop it with `Ctrl+C` in the Terminal window it opens, or
just close that window.

From a terminal, the same thing:

```bash
python3 serve.py
```

Options:

| | |
|---|---|
| `python3 serve.py 9000` | serve on a different port |
| `python3 serve.py --no-open` | start the server without opening a browser |
| `pkill -f serve.py` | stop a server you started in the background |

It handles the awkward cases: launching it twice just opens a tab pointing at the
copy that's already running, and if something unrelated is occupying port 8123 it
moves to the next free port and tells you.

The app is plain ES modules, so it does need to be *served* — opening
`index.html` straight off disk breaks module loading in some browsers.

## How the pace works

You set one number: **new cards a day**. Everything else follows from it.

- Gentle (5/day) ≈ 5 minutes · Steady (10/day) ≈ 10–15 · Intense (20/day) ≈ 25–30
- Reviews are capped separately so a backlog can't ambush you.
- Falling behind? Lower the new-card number. Reviews shrink on their own within
  a week or so — you never need to "catch up".
- A day rolls over at 4am by default, so a late-night session still counts.

Cards are graded **Again / Hard / Good / Easy** (keys `1`–`4`, or `↵` for the
suggested one). New cards run through 1-minute and 10-minute steps before
graduating to a real interval; after that it's an SM-2 style schedule with
lapses shortening the interval and lowering the ease.

## What's in it

| | |
|---|---|
| **590 words** | 14 units, from greetings through food, directions, work and small talk. Each word becomes three cards: recognise it, produce it, hear it. |
| **50 verbs × 6 tenses** | presente, presente progressivo, passato prossimo, imperfetto, futuro semplice, condizionale — one card per person, so 6 per verb-tense. Verbs are tiered (11 essential, 22 common, 17 broadening) so the load-bearing ones come first. |
| **17 lessons** | Long-form explanations, one a day: gender, articles, pronunciation, plurals, agreement, dropping the subject, essere/avere, tu vs Lei, prepositions, the past tenses, reflexives, object pronouns, piacere, ci/ne, the imperative, the progressive. ~71 minutes of reading. |
| **16 grammar drills** | 101 exercises: subject pronouns, articles, plurals, agreement, articulated prepositions, `c'è`/`ci sono`, possessives, `piacere`, auxiliary choice, reflexives, direct and indirect object pronouns, and more. |
| **8 conversations** | 64 lines — the café, meeting someone, directions, the restaurant, the hotel, the shop, the station, making plans. Each line is rebuilt from word tiles, in order, with the previous line as context. |
| **331 listening cards** | Every word and every conversation line, heard with no text on screen. |

3,499 cards in total, though only what you switch on is ever queued — the
default deck (all vocabulary, presente only, essential + common verbs) is 2,197,
or 1,543 with listening turned off.

The last four units are built for conversation specifically: **Conversation
glue** (the discourse markers and reactions that hold real speech together —
`comunque`, `insomma`, `figurati`, `meno male`, `boh`), **Everyday verbs**,
**Describing things**, and **Weather & seasons**.

### Listening

Audio everywhere else is a *support* — it plays alongside text you can already
see, so it never trains the ear on its own. Listening cards remove the text:

- a **word** plays, and you write what you heard, in Italian;
- a **conversation line** plays, and you rebuild it from tiles.

Nothing is shown but a play button, a **Slower** control (0.55× rate, for when
a run of syllables won't separate) and the answer box. `alt`+`R` replays,
`alt`+`S` replays slowly — usable while your hands are still in the answer box.

A listening card requires the word's *produce* card, so you're only asked to
hear what you can already write. The whole kind can be switched off in settings,
which is also what the app does implicitly when no Italian voice exists —
otherwise these cards would be silent and unanswerable.

### Curriculum order

Cards are introduced by a weighted round-robin (3 vocabulary : 2 conjugation :
1 grammar), but weights alone can't express "teach this before that", so cards
may declare prerequisites in `requires`:

- a **produce** card (English → Italian) requires its own **recognise** card, so
  you're never asked to write a word you haven't met;
- every **conjugation** card requires the first three subject-pronoun exercises,
  so `io`, `tu` and `lei` mean something before a drill asks you for `tu sei`.

`pickNew` only ever takes the head of each stream, and treats a prerequisite as
met once that card has been introduced — in an earlier session or earlier in the
same batch. Requirements pointing at cards your settings have switched off are
ignored, so turning a lesson off can't deadlock the deck.

### Lessons

The cards drill rules; the **Lessons** section explains them. Seventeen
long-form pieces in `data/lessons.js`, written for an English speaker and
ordered so each leans only on what came before — starting with the fact that
every Italian noun has a gender, which English gives you no preparation for.

Each has sections of prose, worked examples with audio and word-by-word
glosses, a **Watch out** callout for the mistake English speakers actually
make, and a short summary.

**One a day by default**, configurable in Settings from 0 (off) to 3. The
pacing is a recommendation, not a lock: today's lesson is surfaced on the home
screen, but the full list is always open and you can read ahead whenever you
want. Reading isn't something that benefits from being forbidden.

### Taught before tested, then always active recall

Two rules, applied to every card without exception:

**Nothing is tested on first contact.** Whatever the kind, the first time a card
comes up it is *presented*:

- **vocabulary** shows the word, its meaning, an example sentence with audio and
  a gloss;
- **conjugation** shows the form, the person with its English gloss, an example
  sentence using that exact form, and the whole paradigm;
- **grammar** shows the sentence with the blank already filled in, plus the
  lesson note;
- **conversation** shows the line, its translation and the preceding line.

One button acknowledges it, which grades it Good and puts it on the 10-minute
learning step — so the test comes back later in the same sitting.

**Every review is active recall.** There is no "show the answer, grade
yourself" card left: you type the answer, or assemble it from tiles. That
includes Italian → English, where the grader accepts any sense of the gloss —
`ciao` takes "hi", "bye", "hi / bye" or the full "hi / bye (informal)", and
`il libro` takes "book" as readily as "the book".

### Conversations

Whole sentences are practised by **assembling them from word tiles**, not by
typing. Typing a long sentence grades you on accents and typos; tapping words
into order tests the thing that's actually hard — word order and which words
belong there at all. Two decoy tiles are drawn from elsewhere in the same
conversation, so a short line can't be solved by using every tile on offer.

Every line is shown with the **previous line above it**, so a reply is never
rehearsed out of context, and lines are gated in sequence (`requires` again) so
a conversation is always learned front to back. Reference → Conversations shows
each script in full, with audio and glosses on every line.

### Generated example sentences

Every conjugation teaching card shows the form in a sentence — *io sono →*
**"Io sono a casa." / "I am at home."** — with audio and a word-by-word gloss.

Writing those by hand would mean 1,752 sentences (50 verbs × 6 tenses × 6
persons). Instead `data/examples.js` gives each verb a **complement frame**
(`parlare` → *italiano*) and each tense a time adverb (passato → *ieri*), and
`js/example.js` assembles the sentence around whatever form is being taught:

```
parlare · presente · io    Io parlo italiano.                 I speak Italian.
parlare · passato  · noi   Noi abbiamo parlato italiano ieri. We spoke Italian yesterday.
parlare · futuro   · voi   Voi parlerete italiano domani.     You (pl.) will speak Italian tomorrow.
```

Frames avoid adjectives on purpose: *sono stanco* would have to become *siamo
stanchi* for noi, and agreement isn't what these cards teach. All 1,500
generated sentences gloss at 100% coverage.

### Word-by-word glosses

Example sentences inevitably use vocabulary from units you haven't reached, and
a whole-sentence translation doesn't tell you *which word means what*. So every
Italian sentence shown — grammar cards and vocabulary examples alike — carries
an interlinear gloss with each word's English directly beneath it, and every
conjugation paradigm carries the English of each form (`sei stato` → "you were").

`js/gloss.js` builds its index from content that already exists: every
vocabulary entry (with and without its article), every conjugated form of every
verb, and every participle. `data/lexicon.js` supplies only what can't be
derived — the function words, a few verbs outside the drill list, and the
English simple past used to gloss the passato prossimo. Add a word to a unit and
the glosses improve everywhere that word appears.

It covers **99.9%** of the words across all 152 example sentences in the deck.
English asides inside prompts — `(my)`, `"I speak Italian"` — are detected and
left unglossed rather than mistranslated as Italian.

Conjugation prompts and paradigm tables also carry the English gloss beside each
pronoun, so `voi` teaches itself at the moment you need it.

Conjugations are **generated**, not stored: `js/conjugator.js` implements the
real rules (including `cercare → cerchi`, `mangiare → mangerò`,
`studiare → studierò`, participle agreement with *essere*, reflexive pronouns),
and `data/verbs.js` declares only what genuinely breaks the pattern.

Typed answers are graded leniently where it doesn't matter — case, spacing,
curly apostrophes — and explicitly where it does: a missing accent or article is
marked *right word, but* rather than silently accepted. Strict accents can be
turned on in settings.

## Screens

- **Home** — what's due, your streak, and the pace switch.
- **Study** — the scheduled session. Keyboard: `space`/`↵` reveal, `1`–`4` grade, `s` speak, `Esc` end.
- **Practice** — free, untracked drilling: fill a whole conjugation table, or sprint ten words from a unit.
- **Reference** — every word, every full paradigm, every grammar note.
- **Progress** — 30-day activity, a two-week forecast of what's coming, and per-unit breakdown.
- **Settings** — pace, which units/tenses/lessons are active, audio, and backup export/import.

Audio uses the browser's built-in Italian voice (Web Speech API). On macOS you
may need to add an Italian voice under System Settings → Accessibility → Spoken
Content → System Voice → Manage Voices.

## Adding your own content

- **Words** — add to a unit's `items` in `data/vocab.js`. Append rather than
  insert: card ids are `v:<unit>:<index>:<r|p>`, so inserting mid-unit reshuffles
  the scheduling history of everything after it.
- **Verbs** — add to `data/verbs.js`. A regular verb needs only `inf`, `en`,
  `type`, `aux`, `tier`; irregulars add `pres`, `pp`, `impStem` or `futStem`.
- **Grammar** — add a lesson or exercises in `data/grammar.js`.

New cards from anything you add flow into the queue automatically, still
throttled by your daily limit.

## Layout

```
index.html          shell + nav
css/app.css         all styling (light and dark)
data/vocab.js       10 units of vocabulary
data/verbs.js       verb inventory, tenses, persons
data/grammar.js     grammar notes and drill exercises
data/lessons.js     long-form lessons
js/lessons.js       lesson pacing (one a day by default)
data/dialogues.js   scripted conversations
data/examples.js    complement frames for generated example sentences
data/lexicon.js     function words + English pasts, for glossing
js/conjugator.js    conjugation rules
js/gloss.js         word-by-word English under Italian sentences
js/example.js       builds an example sentence for any conjugated form
js/srs.js           the scheduler
js/store.js         localStorage: settings, card states, history
js/cards.js         builds the card catalogue from the data
js/session.js       decides what to show next
js/text.js          answer grading
js/audio.js         Italian text-to-speech
js/ui/*.js          one module per screen
serve.py            static file server + browser launcher
Impara.command      double-click launcher for Finder
sw.js               service worker: precaches everything for offline use
manifest.webmanifest  install metadata (name, icons, standalone display)
icons/              generated PNG app icons
```

**Editing note:** the service worker serves from cache first. Your edits appear
on the *second* reload (it revalidates in the background), or immediately if you
bump `CACHE_VERSION` in `sw.js`. If a change stubbornly won't show, that's why.

## Backing up

Settings → Export backup writes a JSON file with all your scheduling state.
Clearing site data in your browser wipes progress, so export before you do.
