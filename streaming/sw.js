// ============================================================
// CHARLY STREAM v2.1 — Service Worker
// ============================================================
const CACHE_NAME = 'charly-stream-v2.2';
const STATIC_ASSETS = [
  '/streaming/',
  '/streaming/index.html',
  '/streaming/app.js',
  '/streaming/datos.js',
  '/streaming/styles.css',
  '/streaming/manifest.json',
  '/streaming/icons/icon-192.png',
  '/streaming/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js',
];

// Instalar y cachear assets estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

// Limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: Network-first para APIs, Cache-first para assets
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // APIs externas: siempre network, sin caché
  if (url.hostname.includes('jikan.moe') ||
      url.hostname.includes('themoviedb.org') ||
      url.hostname.includes('consumet') ||
      url.hostname.includes('countapi')) {
    e.respondWith(fetch(e.request).catch(() => new Response('{}', {headers: {'Content-Type': 'application/json'}})));
    return;
  }

  // Assets estáticos: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response && response.status === 200 && e.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match('/streaming/index.html'));
    })
  );
});

// Notificaciones push (para futuro)
self.addEventListener('push', e => {
  if (!e.data) return;
  const data = e.data.json();
  self.registration.showNotification(data.title || 'Charly Stream', {
    body: data.body || 'Nuevo contenido disponible',
    icon: '/streaming/icons/icon-192.png',
    badge: '/streaming/icons/icon-72.png',
  });
});
