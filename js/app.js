// Router. Hash-based so the whole thing works from a plain static file server.

import * as home from './ui/home.js';
import * as study from './ui/study.js';
import * as drill from './ui/drill.js';
import * as browse from './ui/browse.js';
import * as lessons from './ui/lessons.js';
import * as progress from './ui/progress.js';
import * as settingsScreen from './ui/settings.js';
import { saveNow } from './store.js';
import { $$ } from './ui/dom.js';

const ROUTES = {
  '/home': () => home.render(),
  '/study': (params) => study.render({
    includeNew: params.get('new') !== '0',
    ahead: params.get('ahead') === '1',
  }),
  '/lessons': (params) => lessons.render(params),
  '/drill': () => drill.render(),
  '/browse': () => browse.render(),
  '/progress': () => progress.render(),
  '/settings': () => settingsScreen.render(),
};

let currentPath = null;

function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/home';
  const [path, query = ''] = raw.split('?');
  return { path: ROUTES[path] ? path : '/home', params: new URLSearchParams(query) };
}

function route() {
  const { path, params } = parseHash();
  // The study screen owns a global key listener; always let it clean up.
  if (currentPath === '/study' && path !== '/study') study.teardown();
  currentPath = path;
  ROUTES[path](params);
  $$('.nav a').forEach((a) => {
    a.classList.toggle('on', a.getAttribute('href') === `#${path}`);
  });
  document.body.dataset.screen = path.slice(1);
}

window.addEventListener('hashchange', route);
window.addEventListener('beforeunload', saveNow);
window.addEventListener('pagehide', saveNow);

route();
