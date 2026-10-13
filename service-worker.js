/* PWA offline-first — isolamento por projeto e atualização de manifesto. */
'use strict';
const CACHE = "porcaria-falhas-offline-v1.0.4";
const PREFIX = "porcaria-falhas-";
const FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/core.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
const SCOPE = new URL(self.registration.scope);
const MANIFEST_URL = new URL('./manifest.webmanifest', SCOPE);
const INDEX_URL = new URL('./index.html', SCOPE);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;

  if (url.pathname === MANIFEST_URL.pathname) {
    // Manifestos versionados no HTML devem ser obtidos online; offline usa a cópia local.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(request, { cache: 'no-store' });
        if (fresh.ok) {
          await cache.put(MANIFEST_URL, fresh.clone());
          return fresh;
        }
      } catch (_) {}
      return (await cache.match(MANIFEST_URL)) || Response.error();
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const saved = await cache.match(request);
    if (saved) return saved;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return (request.mode === 'navigate' ? await cache.match(INDEX_URL) : null) || Response.error();
    }
  })());
});
