const CACHE_NAME = 'tk-siti-hajar-cache-v1';

// Daftar file statis yang ingin dicache (ubah sesuai struktur folder kamu)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.svg',
  '/global.css',
  '/src/Beranda/main.js',
  '/src/Beranda/style.css',
  '/src/ProgramSekolah/main.js',
  '/src/ProgramSekolah/style.css',
  '/src/FasilitasPrestasi/main.js',
  '/src/FasilitasPrestasi/style.css',
  '/src/Jadwal/main.js',
  '/src/Jadwal/style.css',
  '/src/Contact/main.js',
  '/src/Contact/style.css',
  '/src/Guru/main.js',
  '/src/Guru/style.css',
  '/src/Component/Navbar/navbar.js',
  '/src/Component/Footer/footer.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
];

// Saat install, cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Saat aktifasi, bersihkan cache lama kalau ada
self.addEventListener('activate', event => {
  const whitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(name => {
          if (!whitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Intercept fetch request
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Caching strategy: Cache First untuk static assets
  if (STATIC_ASSETS.includes(url.pathname) || STATIC_ASSETS.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then(cachedResp => {
        return cachedResp || fetch(event.request).then(fetchResp => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResp.clone());
            return fetchResp;
          });
        });
      })
    );
    return;
  }

  // Untuk API request (contoh endpoint), gunakan Network First strategy
  if (url.pathname.startsWith('/src/ProgramSekolah/') || url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResp => {
          // Update cache
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResp.clone());
            return networkResp;
          });
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Default fallback: coba cache dulu, kalau tidak ada fetch network
  event.respondWith(
    caches.match(event.request).then(cachedResp => cachedResp || fetch(event.request))
  );
});
