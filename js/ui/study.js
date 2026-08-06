// The study screen. One card at a time: prompt → answer → grade.

import { Session, overview } from '../session.js';
import { AGAIN, HARD, GOOD, EASY } from '../srs.js';
import { checkAnswer, normalize } from '../text.js';
import { settings } from '../store.js';
import { speak, speakerButton, available as audioAvailable } from '../audio.js';
import { paradigm } from '../conjugator.js';
import { findVerb, TENSES, PERSONS } from '../../data/verbs.js';
import { LESSONS } from '../../data/grammar.js';
import { glossSentence, englishForm } from '../gloss.js';
import { exampleFor } from '../example.js';
import { $, mount, escapeHtml, delegate } from './dom.js';

const KIND_LABEL = {
  recog: 'Italian → English',
  prod: 'English → Italian',
  conj: 'Conjugation',
  grammar: 'Grammar',
  sentence: 'Conversation',
  listen: 'Listening',
};

let assembled = [];      // tiles the learner has placed, in order
let tileBank = [];       // [{word, used}] offered for the current sentence

let session = null;
let current = null;
let revealed = false;
let suggestion = GOOD;
let keyHandler = null;
let opts = {};              // how this session was started, for the end screen
let teaching = false;       // first sight of a conjugation/grammar card: show, don't test

export function render(sessionOpts = {}) {
  opts = sessionOpts;
  session = new Session(opts);
  mount(`
    <section class="study" id="study">
      <header class="study-bar">
        <button class="ghost" data-act="quit" title="End session (Esc)">← Done</button>
        <div class="progress"><div class="progress-fill" id="progress-fill"></div></div>
        <span class="counter" id="counter"></span>
      </header>
      <div id="card-slot"></div>
    </section>
  `);

  const root = $('#study');
  delegate(root, '[data-act]', 'click', (e, t) => act(t.dataset.act, t));
  delegate(root, '[data-speak]', 'click', (e, t) => {
    e.stopPropagation();
    speak(t.dataset.speak, { force: true });
  });

  installKeys();
  step();
}

export function teardown() {
  if (keyHandler) document.removeEventListener('keydown', keyHandler);
  keyHandler = null;
  session = null;
}

function installKeys() {
  if (keyHandler) document.removeEventListener('keydown', keyHandler);
  keyHandler = (e) => {
    if (!session) return;
    if (e.key === 'Escape') { e.preventDefault(); finish(); return; }

    // On a teaching card there is nothing to reveal or grade — just acknowledge.
    if (teaching) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); grade(GOOD); }
      else if (e.key.toLowerCase() === 's') speak(current.card.speak, { force: true });
      return;
    }

    const typing = document.activeElement && document.activeElement.tagName === 'INPUT';

    // Replay controls. Plain R/S work when you're not typing; Alt+R / Alt+S
    // always work, since a listening card keeps focus in the answer box.
    const key = e.key.toLowerCase();
    if ((key === 'r' || key === 's') && (e.altKey || !typing)) {
      if (current && current.card.kind === 'listen') {
        e.preventDefault();
        speak(current.card.speak, { force: true, rate: key === 's' ? 0.55 : 0.9 });
        return;
      }
    }

    if (!revealed) {
      if (e.key === 'Enter' || (e.key === ' ' && !typing)) {
        e.preventDefault();
        reveal();
      }
      return;
    }
    if (e.key === 'Enter') { e.preventDefault(); grade(suggestion); return; }
    if (['1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      grade(Number(e.key) - 1);
    }
    if (e.key.toLowerCase() === 's') speak(current.card.speak, { force: true });
  };
  document.addEventListener('keydown', keyHandler);
}

function step() {
  current = session.peek();
  revealed = false;
  teaching = false;
  if (!current) { finish(); return; }
  drawProgress();
  drawFront();
}

function drawProgress() {
  const done = session.answered;
  const left = session.remaining();
  const pct = done + left === 0 ? 100 : Math.round((done / (done + left)) * 100);
  $('#progress-fill').style.width = `${pct}%`;
  $('#counter').textContent = `${left} left`;
}

// ---- front ---------------------------------------------------------------

/**
 * A conjugation or grammar card has no recognise/produce pair to lean on, so
 * the first time one appears it is *shown*, not tested: the answer, the full
 * paradigm or the lesson note, and a button. Grading it Good puts it on the
 * 10-minute learning step, so the real typed test comes round later in the
 * same sitting — taught first, then examined.
 */
/**
 * Nothing is ever tested on first contact. Whatever the card kind, the first
 * time it comes up it is presented; the test follows on the 10-minute step.
 */
function shouldTeach(card, isNew) {
  return isNew;
}

const TEACH_LABEL = {
  recog: 'Vocabulary',
  prod: 'Vocabulary',
  conj: 'Conjugation',
  grammar: 'Grammar',
  sentence: 'Conversation',
  listen: 'Listening',
};

/** The audio control block on a listening card: play, replay slowly. */
function listenControls() {
  return `<div class="listen-controls">
      <button class="play-big" data-act="replay" title="Play again (alt+R)" aria-label="Play again">▶</button>
      <button class="button" data-act="replay-slow" title="Play slowly (alt+S)">Slower</button>
    </div>
    ${audioAvailable() ? '' : `<p class="verdict warn">No Italian voice is installed on this device,
      so these cards can't play. Turn listening off in settings, or add a voice
      under System Settings → Accessibility → Spoken Content.</p>`}`;
}

/** The line before this one, so a reply is never rehearsed out of context. */
function contextHtml(card) {
  if (!card.contextIt) return '';
  return `<div class="context-line">
      <span class="ctx-who">${escapeHtml(card.speaker === 'A' ? 'B' : 'A')}</span>
      <span class="ctx-body">
        <span class="it">${escapeHtml(card.contextIt)} ${speakerButton(card.contextIt)}</span>
        <span class="en">${escapeHtml(card.contextEn)}</span>
      </span>
    </div>`;
}

function dialogueTags(card) {
  return `<span class="tag subtle">${escapeHtml(card.dialogueTitle)} · line ${card.lineNumber}/${card.lineCount}</span>`;
}

/** The form doing something, so a paradigm row isn't the only thing you see. */
function conjExample(card) {
  const ex = exampleFor(findVerb(card.verb), card.tense, personIndex(card));
  if (!ex) return '';
  return `<div class="example">
      <span class="it">${escapeHtml(ex.it)} ${speakerButton(ex.it)}</span>
      <span class="en">${escapeHtml(ex.en)}</span>
      ${interlinear(ex.it)}
    </div>`;
}

function drawTeach() {
  const { card } = current;
  const lesson = card.kind === 'grammar' ? LESSONS.find((l) => l.id === card.group) : null;

  let body;
  if (card.kind === 'listen') {
    body = `
      <div class="teach-answer${card.mode === 'line' ? ' line' : ''}">${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>
      <p class="teach-english">${escapeHtml(card.en || '')}</p>
      ${card.mode === 'line' ? interlinear(card.answer) : ''}
      <p class="prompt-sub">Listen to it — next time you'll hear this with no text.</p>`;
  } else if (card.kind === 'recog' || card.kind === 'prod') {
    body = `
      <div class="teach-answer">${escapeHtml(card.it)} ${speakerButton(card.speak)}</div>
      <p class="teach-english">${escapeHtml(card.en)}</p>
      ${card.ex ? `<div class="example">
          <span class="it">${escapeHtml(card.ex)} ${speakerButton(card.ex)}</span>
          <span class="en">${escapeHtml(card.exEn || '')}</span>
          ${interlinear(card.ex)}
        </div>` : ''}`;
  } else if (card.kind === 'sentence') {
    body = `
      ${contextHtml(card)}
      <div class="teach-answer line">${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>
      <p class="teach-english">${escapeHtml(card.prompt)}</p>
      ${interlinear(card.answer)}`;
  } else if (card.kind === 'conj') {
    body = `
      <div class="prompt-main">${escapeHtml(card.verb)}</div>
      <p class="prompt-sub">${escapeHtml(card.verbEn)} · ${escapeHtml(card.tenseLabel)}</p>
      <div class="person-chip">${escapeHtml(card.person)}<em>${escapeHtml(card.personEn)}</em></div>
      <div class="teach-answer">${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>
      <p class="teach-english">${escapeHtml(englishForm(findVerb(card.verb), card.tense, personIndex(card)))}</p>
      ${conjExample(card)}
      ${paradigmTable(card)}`;
  } else {
    const filled = card.prompt.replace('___', card.answer);
    body = `
      <div class="prompt-cloze">${filledClozeHtml(card.prompt, card.answer)}
        ${speakerButton(card.speak)}</div>
      ${interlinear(filled, { highlight: card.answer })}
      ${card.hint ? `<p class="prompt-sub">${escapeHtml(card.hint)}</p>` : ''}
      ${lesson ? `<div class="teach-note">${lesson.note}</div>` : ''}`;
  }

  $('#card-slot').innerHTML = `
    <article class="card teaching">
      <div class="card-tags">
        <span class="tag tag-learn">Learn this</span>
        <span class="tag">${TEACH_LABEL[card.kind] || KIND_LABEL[card.kind]}</span>
        ${card.unitTitle ? `<span class="tag subtle">${escapeHtml(card.unitTitle)}</span>` : ''}
        ${card.lessonTitle ? `<span class="tag subtle">${escapeHtml(card.lessonTitle)}</span>` : ''}
        ${card.dialogueTitle ? dialogueTags(card) : ''}
      </div>
      ${body}
      <div class="card-actions">
        <button class="primary" data-act="learned">Got it <kbd>↵</kbd></button>
        <p class="grade-hint">You'll be asked to type this a few minutes from now.</p>
      </div>
    </article>`;
}

/** The cloze sentence with the blank already filled in, highlighted. */
function filledClozeHtml(prompt, answer) {
  return escapeHtml(prompt).replace('___', `<b class="filled">${escapeHtml(answer)}</b>`);
}

/**
 * The sentence again, word by word, with each Italian word's English sitting
 * under it — the example sentences lean on vocabulary from later units, and
 * a whole-sentence translation doesn't tell you which word means what.
 */
function interlinear(sentence, { highlight = null } = {}) {
  const words = glossSentence(sentence);
  if (!words.some((w) => w.gloss)) return '';
  const cells = words.map((w) => {
    const isAnswer = highlight && w.word.replace(/[.,!?;:]$/, '').toLowerCase() === String(highlight).toLowerCase();
    return `<span class="gw${w.english ? ' gw-en' : ''}${isAnswer ? ' gw-key' : ''}">
        <b>${escapeHtml(w.word)}</b>
        <em>${w.gloss ? escapeHtml(w.gloss) : ''}</em>
      </span>`;
  }).join('');
  return `<div class="gloss">${cells}</div>`;
}

function drawFront() {
  const { card, isNew } = current;
  if (shouldTeach(card, isNew)) {
    teaching = true;
    drawTeach();
    if (settings().audio) speak(card.speak);
    return;
  }

  const tag = `<div class="card-tags">
      <span class="tag ${isNew ? 'tag-new' : ''}">${isNew ? 'New' : 'Review'}</span>
      <span class="tag">${KIND_LABEL[card.kind]}</span>
      ${card.unitTitle ? `<span class="tag subtle">${escapeHtml(card.unitTitle)}</span>` : ''}
      ${card.lessonTitle ? `<span class="tag subtle">${escapeHtml(card.lessonTitle)}</span>` : ''}
    </div>`;

  let body = '';
  if (card.kind === 'recog') {
    body = `<div class="prompt-main">${escapeHtml(card.prompt)} ${speakerButton(card.speak)}</div>
            <p class="prompt-sub">What does this mean?</p>
            ${inputHtml('in English…')}`;
  } else if (card.kind === 'prod') {
    body = `<div class="prompt-main">${escapeHtml(card.prompt)}</div>
            <p class="prompt-sub">Say it in Italian</p>
            ${inputHtml()}`;
  } else if (card.kind === 'conj') {
    body = `<div class="prompt-main">${escapeHtml(card.verb)}</div>
            <p class="prompt-sub">${escapeHtml(card.verbEn)} · ${escapeHtml(card.tenseLabel)}</p>
            <div class="person-chip">${escapeHtml(card.person)}<em>${escapeHtml(card.personEn)}</em></div>
            ${inputHtml()}`;
  } else if (card.kind === 'listen') {
    if (card.mode === 'line') {
      prepareTiles(card);
      body = `${listenControls()}
              <p class="prompt-sub">Build what you hear</p>
              ${assemblyHtml()}`;
    } else {
      body = `${listenControls()}
              <p class="prompt-sub">Write what you hear, in Italian</p>
              ${inputHtml('what did you hear?')}`;
    }
  } else if (card.kind === 'sentence') {
    prepareTiles(card);
    body = `${contextHtml(card)}
            <div class="prompt-line">${escapeHtml(card.prompt)}</div>
            <p class="prompt-sub">Build the Italian, word by word</p>
            ${assemblyHtml()}`;
  } else {
    body = `<div class="prompt-cloze">${clozeHtml(card.prompt)}</div>
            ${card.hint ? `<p class="prompt-sub">${escapeHtml(card.hint)}</p>` : ''}
            ${inputHtml()}`;
  }

  const action = card.typed || card.kind === 'sentence' || card.kind === 'listen'
    ? `<button class="primary" data-act="reveal">Check <kbd>↵</kbd></button>`
    : `<button class="primary" data-act="reveal">Show answer <kbd>space</kbd></button>`;

  $('#card-slot').innerHTML = `
    <article class="card">
      ${tag}
      ${body}
      <div class="card-actions">${action}</div>
    </article>`;

  const input = $('#answer');
  if (input) setTimeout(() => input.focus(), 0);
  // Hearing the word is part of the prompt when the Italian is on screen.
  if (settings().audio && card.kind === 'recog') speak(card.speak);
  // On a listening card the audio *is* the question, so it plays regardless of
  // the auto-speak preference.
  if (card.kind === 'listen') setTimeout(() => speak(card.speak, { force: true }), 120);
}

// ---- sentence assembly ---------------------------------------------------

function shuffled(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function prepareTiles(card) {
  assembled = [];
  tileBank = shuffled([...card.tokens, ...(card.distractors || [])])
    .map((word, i) => ({ word, id: i, used: false }));
}

function assemblyInner() {
  const slots = assembled.length
    ? assembled.map((t, i) => `<button class="tile placed" data-act="unplace" data-i="${i}">${escapeHtml(t.word)}</button>`).join('')
    : '<span class="slots-empty">tap the words in order…</span>';
  const bank = tileBank
    .filter((t) => !t.used)
    .map((t) => `<button class="tile" data-act="place" data-id="${t.id}">${escapeHtml(t.word)}</button>`)
    .join('');
  return `<div class="slots">${slots}</div><div class="bank">${bank}</div>`;
}

function assemblyHtml() {
  return `<div class="assembly" id="assembly">${assemblyInner()}</div>`;
}

function redrawAssembly() {
  const node = $('#assembly');
  if (node) node.innerHTML = assemblyInner();
}

function placeTile(id) {
  const tile = tileBank.find((t) => t.id === Number(id));
  if (!tile || tile.used) return;
  tile.used = true;
  assembled.push(tile);
  redrawAssembly();
}

function unplaceTile(index) {
  const [tile] = assembled.splice(Number(index), 1);
  if (tile) tile.used = false;
  redrawAssembly();
}

function inputHtml(placeholder = 'type your answer…') {
  return `<input id="answer" class="answer-input" type="text" autocomplete="off"
    autocapitalize="off" autocorrect="off" spellcheck="false"
    placeholder="${escapeHtml(placeholder)}">`;
}

function clozeHtml(prompt) {
  return escapeHtml(prompt).replace('___', '<span class="blank"></span>');
}

// ---- back ----------------------------------------------------------------

function reveal() {
  if (revealed) return;
  revealed = true;
  const { card } = current;

  let verdict = null;
  let given = '';
  if (card.kind === 'sentence' || (card.kind === 'listen' && card.mode === 'line')) {
    given = assembled.map((t) => t.word).join(' ');
    verdict = normalize(given) === normalize(card.tokens.join(' ')) ? 'correct' : 'wrong';
    suggestion = verdict === 'correct' ? GOOD : AGAIN;
  } else if (card.typed) {
    const input = $('#answer');
    given = input ? input.value : '';
    verdict = checkAnswer(given, card.answer, card.alts || [], settings().strictAccents);
    suggestion = verdict === 'correct' ? GOOD : verdict === 'wrong' ? AGAIN : HARD;
  } else {
    suggestion = GOOD;
  }

  drawBack(verdict, given);
  if (settings().audio) speak(card.speak);
}

function verdictBanner(verdict, given, answer) {
  if (!verdict) return '';
  const map = {
    correct: ['ok', 'Correct'],
    accent: ['warn', 'Right word — mind the accent'],
    article: ['warn', 'Right word — include the article'],
    wrong: ['bad', 'Not quite'],
  };
  const [cls, label] = map[verdict];
  const yours = given.trim()
    ? `<span class="yours">you wrote “${escapeHtml(given.trim())}”</span>`
    : '<span class="yours">no answer</span>';
  return `<div class="verdict ${cls}"><b>${label}</b> ${verdict === 'correct' ? '' : yours}</div>`;
}

function drawBack(verdict, given) {
  const { card, previews } = current;

  let answerBlock = '';
  if (card.kind === 'recog') {
    answerBlock = `<div class="answer-main">${escapeHtml(card.answer)}</div>`;
  } else if (card.kind === 'prod') {
    answerBlock = `<div class="answer-main">${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>`;
  } else if (card.kind === 'listen') {
    answerBlock = `<div class="answer-main${card.mode === 'line' ? ' line' : ''}">${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>
                   <p class="teach-english">${escapeHtml(card.en || '')}</p>
                   ${card.mode === 'line' ? interlinear(card.answer) : ''}`;
  } else if (card.kind === 'sentence') {
    answerBlock = `${contextHtml(card)}
                   <div class="answer-main line">${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>
                   <p class="teach-english">${escapeHtml(card.prompt)}</p>
                   ${interlinear(card.answer)}`;
  } else if (card.kind === 'conj') {
    answerBlock = `<div class="answer-main">${escapeHtml(card.person)} ${escapeHtml(card.answer)} ${speakerButton(card.speak)}</div>
                   ${paradigmTable(card)}`;
  } else {
    const filled = card.prompt.replace('___', card.answer);
    answerBlock = `<div class="answer-main">${escapeHtml(filled)} ${speakerButton(card.speak)}</div>
                   ${interlinear(filled, { highlight: card.answer })}`;
  }

  const example = card.ex
    ? `<div class="example"><span class="it">${escapeHtml(card.ex)} ${speakerButton(card.ex)}</span>
        <span class="en">${escapeHtml(card.exEn || '')}</span>
        ${interlinear(card.ex)}</div>`
    : '';

  const alts = (card.alts && card.alts.length && card.kind === 'conj')
    ? `<p class="alt-note">also accepted: ${card.alts.map(escapeHtml).join(', ')}</p>` : '';

  const labels = ['Again', 'Hard', 'Good', 'Easy'];
  const buttons = labels.map((l, i) => `
    <button class="grade grade-${i} ${i === suggestion ? 'suggested' : ''}" data-act="grade" data-rating="${i}">
      <span class="g-label">${l}</span>
      <span class="g-interval">${previews[i]}</span>
      <kbd>${i + 1}</kbd>
    </button>`).join('');

  $('#card-slot').innerHTML = `
    <article class="card revealed">
      <div class="card-tags">
        <span class="tag subtle">${escapeHtml(card.kind === 'conj' ? card.prompt : (card.prompt || ''))}</span>
      </div>
      ${verdictBanner(verdict, given, card.answer)}
      ${answerBlock}
      ${alts}
      ${example}
      <div class="grades">${buttons}</div>
      <p class="grade-hint">Press <kbd>↵</kbd> for <b>${labels[suggestion]}</b>, or <kbd>1</kbd>–<kbd>4</kbd></p>
    </article>`;
}

function personIndex(card) {
  return PERSONS.findIndex((x) => x.label === card.person);
}

function paradigmTable(card) {
  const verb = findVerb(card.verb);
  if (!verb) return '';
  const forms = paradigm(verb, card.tense);
  const here = personIndex(card);
  const rows = PERSONS.map((p, i) => `
    <tr class="${i === here ? 'here' : ''}">
      <th>${escapeHtml(p.label)}<em>${escapeHtml(p.en)}</em></th>
      <td>${escapeHtml(forms[i])}</td>
      <td class="p-en">${escapeHtml(englishForm(verb, card.tense, i))}</td>
    </tr>`).join('');
  const tense = TENSES.find((t) => t.id === card.tense);
  return `<table class="paradigm"><caption>${escapeHtml(verb.inf)} · ${escapeHtml(tense.label)}</caption>${rows}</table>`;
}

// ---- actions -------------------------------------------------------------

function act(name, target) {
  if (name === 'reveal') reveal();
  else if (name === 'replay') speak(current.card.speak, { force: true });
  else if (name === 'replay-slow') speak(current.card.speak, { force: true, rate: 0.55 });
  else if (name === 'place') placeTile(target.dataset.id);
  else if (name === 'unplace') unplaceTile(target.dataset.i);
  else if (name === 'learned') grade(GOOD);
  else if (name === 'grade') grade(Number(target.dataset.rating));
  else if (name === 'quit') finish();
  else if (name === 'again') render(opts);
}

function grade(rating) {
  if (!revealed && !teaching) return;
  session.answer(rating);
  step();
}

/** "in 2 hours", "tomorrow", "in 5 days" */
function relativeDue(ts) {
  const mins = (ts - Date.now()) / 60000;
  if (mins < 60) return `in ${Math.max(1, Math.round(mins))} min`;
  if (mins < 20 * 60) return `in ${Math.round(mins / 60)} hour${Math.round(mins / 60) === 1 ? '' : 's'}`;
  const days = Math.round(mins / (60 * 24));
  return days <= 1 ? 'tomorrow' : `in ${days} days`;
}

/** Landing here with nothing answered means the queue was empty — say why. */
function emptyState() {
  const o = overview();
  const canGoAhead = !opts.ahead && o.aheadAvailable > 0;
  const why = opts.ahead
    ? 'You’re genuinely up to date — there’s nothing due in the next few days to pull forward.'
    : o.doneToday
      ? 'Today’s target is done, and nothing else is due yet.'
      : 'Nothing is due right now.';

  return `
    <section class="done" id="done">
      <h2>All clear</h2>
      <p class="done-sub">${why}</p>
      ${o.nextDue ? `<p class="done-sub">Next card due ${relativeDue(o.nextDue)}.</p>` : ''}
      <div class="done-actions">
        ${canGoAhead ? '<button class="primary" data-act="ahead">Study ahead anyway</button>' : ''}
        <a class="button" href="#/home">Back to home</a>
        <a class="button" href="#/drill">Free practice</a>
      </div>
    </section>`;
}

function finish() {
  const s = session ? session.stats() : { answered: 0, accuracy: 0, minutes: 0 };
  const left = session ? session.remaining() : 0;
  const wasAhead = opts.ahead;
  teardown();

  mount(s.answered === 0 ? emptyState() : `
    <section class="done" id="done">
      <h2>${left ? 'Session paused' : wasAhead ? 'Nicely ahead' : 'Session complete'}</h2>
      <p class="done-sub">${s.answered} card${s.answered === 1 ? '' : 's'} · ${s.accuracy}% first-try correct · ${s.minutes} min</p>
      ${left ? `<p class="done-sub">${left} card${left === 1 ? '' : 's'} still waiting.</p>` : ''}
      <div class="done-actions">
        ${left ? '<button class="primary" data-act="again">Keep going</button>' : ''}
        <a class="button" href="#/home">Back to home</a>
      </div>
    </section>
  `);

  // Scoped to this screen's own node, so it dies with the next render.
  const root = $('#done');
  delegate(root, '[data-act="again"]', 'click', () => render(opts));
  delegate(root, '[data-act="ahead"]', 'click', () => { location.hash = '#/study?ahead=1'; });
}
