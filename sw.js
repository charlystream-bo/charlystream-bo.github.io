// CHARLY STREAM — Service Worker v1.0
const CACHE_NAME = 'charly-stream-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './datos.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap'
];

// Instalar: guardar assets en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar: borrar cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: primero caché, luego red
self.addEventListener('fetch', e => {
  // No cachear iframes de video (YouTube/Drive)
  if (e.request.url.includes('youtube.com') ||
      e.request.url.includes('drive.google.com') ||
      e.request.url.includes('mega.nz')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (!res || res.status !== 200 || res.type === 'opaque') return res;
      const clone = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
