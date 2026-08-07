// Service worker: makes Impara work with no network at all.
//
// The whole app is a few hundred KB of static files, so there's no reason to
// be clever — everything is precached on install. Bump CACHE_VERSION whenever
// you change any file, or the old copy will keep being served.

const CACHE_VERSION = 'impara-v4';

const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './js/app.js',
  './js/audio.js',
  './js/cards.js',
  './js/conjugator.js',
  './js/example.js',
  './js/gloss.js',
  './js/lessons.js',
  './js/session.js',
  './js/srs.js',
  './js/store.js',
  './js/text.js',
  './js/ui/browse.js',
  './js/ui/dom.js',
  './js/ui/drill.js',
  './js/ui/home.js',
  './js/ui/lessons.js',
  './js/ui/progress.js',
  './js/ui/settings.js',
  './js/ui/study.js',
  './data/dialogues.js',
  './data/examples.js',
  './data/grammar.js',
  './data/lessons.js',
  './data/lexicon.js',
  './data/verbs.js',
  './data/vocab.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      // addAll is atomic: one bad entry means no cache at all, which is the
      // behaviour we want — a half-cached app fails in confusing ways.
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Serve from cache immediately, and refresh the copy in the background so
  // edits show up on the next launch. A navigation to any URL is the same
  // single-page app, so it resolves to index.html — and ignoreSearch matters
  // there, because cache-busting query strings must not cause a miss.
  const navigation = request.mode === 'navigate';
  const key = navigation ? './index.html' : request;

  event.respondWith(
    caches.match(key, { ignoreSearch: true }).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(key, copy));
          }
          return response;
        })
        .catch(() => cached);
      // Revalidate even when we answer from cache, so the next load is current.
      if (cached) {
        event.waitUntil(network.catch(() => {}));
        return cached;
      }
      return network;
    }),
  );
});
