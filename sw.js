/* Collection JSV : fonctionnement hors réseau.
   Changer VERSION à chaque mise à jour du site pour que les téléphones récupèrent la nouvelle version. */
const VERSION = 'jsv-v7';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'vendor/jsQR.js',
  'cards/c01.jpg', 'cards/c05.jpg', 'cards/c06.jpg', 'cards/c07.jpg', 'cards/c08.jpg', 'cards/dos.jpg',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png',
  'fonts/bebas-neue-latin-400-normal.woff2', 'fonts/cinzel-latin-600-normal.woff2', 'fonts/cinzel-latin-800-normal.woff2',
  'fonts/inter-latin-400-normal.woff2', 'fonts/inter-latin-500-normal.woff2', 'fonts/inter-latin-600-normal.woff2',
  'fonts/inter-latin-700-normal.woff2',
  'dangers/angle.jpg', 'dangers/bac.jpg', 'dangers/batterie.jpg', 'dangers/coupe.jpg', 'dangers/epi.jpg', 'dangers/fatigue.jpg', 'dangers/gel.jpg', 'dangers/leve.jpg', 'dangers/marche.jpg', 'dangers/nuit.jpg', 'dangers/phone.jpg', 'dangers/pieton.jpg', 'dangers/precip.jpg', 'dangers/recul.jpg', 'dangers/routine.jpg', 'dangers/seringue.jpg', 'dangers/sol.jpg', 'dangers/soleil.jpg', 'dangers/tremie.jpg', 'dangers/tri.jpg', 'dangers/usager.jpg', 'dangers/velo.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (new URL(req.url).pathname.endsWith('version.json')) return; // toujours depuis le réseau
  // Page : réseau d'abord (pour avoir la dernière version), cache si pas de réseau
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req.url, { cache: 'no-cache' }).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return r; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  // Images, polices, scripts : cache d'abord
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return r;
    }))
  );
});
