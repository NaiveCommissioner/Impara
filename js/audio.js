// Italian text-to-speech via the browser's built-in speech synthesis.
// No network, no keys — but voice availability varies by OS, so every call is
// best-effort and silently does nothing when no Italian voice exists.

import { settings } from './store.js';

let voice = null;
let looked = false;

function pickVoice() {
  if (looked && voice) return voice;
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  if (!voices.length) return null;
  looked = true;
  voice =
    voices.find((v) => v.lang === 'it-IT' && /Alice|Federica|Luca|Emma/i.test(v.name)) ||
    voices.find((v) => v.lang === 'it-IT') ||
    voices.find((v) => v.lang && v.lang.startsWith('it')) ||
    null;
  return voice;
}

if (window.speechSynthesis) {
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    looked = false;
    pickVoice();
  });
  pickVoice();
}

export function available() {
  return !!(window.speechSynthesis && pickVoice());
}

export function speak(text, { force = false, rate = 0.9 } = {}) {
  if (!window.speechSynthesis || !text) return;
  if (!force && !settings().audio) return;
  const v = pickVoice();
  const u = new SpeechSynthesisUtterance(String(text).replace(/[_—]/g, ' '));
  u.lang = 'it-IT';
  if (v) u.voice = v;
  u.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/** The little speaker button used all over the app. */
export function speakerButton(text, extraClass = '') {
  return `<button class="speak ${extraClass}" data-speak="${text.replace(/"/g, '&quot;')}"
    title="Hear it in Italian" aria-label="Hear it in Italian">🔊</button>`;
}
