// ⚠️ Change ce numéro à chaque mise en ligne pour que les iPad récupèrent la nouvelle version
const CACHE_NAME = 'musculation-v4.5';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './libs/chart.umd.min.js',
  './libs/jspdf.umd.min.js'
];

// Installation : on met tout en cache (un fichier manquant ne bloque pas l'installation)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(urlsToCache.map((url) => cache.add(url).catch(() => console.log('Non mis en cache :', url))))
    )
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Page (index.html) : réseau d'abord, mais on n'attend pas plus de 3 s (wifi du lycée)
// Autres fichiers (libs, icônes, images) : cache d'abord
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  const isPage = req.mode === 'navigate' || req.url.endsWith('/') || req.url.endsWith('.html');

  if (isPage) {
    event.respondWith(
      new Promise((resolve) => {
        let done = false;
        const fallback = () => caches.match(req).then((r) => r || caches.match('./index.html'));
        const timer = setTimeout(() => { if (!done) { done = true; resolve(fallback()); } }, 3000);
        fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          if (!done) { done = true; clearTimeout(timer); resolve(res); }
        }).catch(() => {
          if (!done) { done = true; clearTimeout(timer); resolve(fallback()); }
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
