const CACHE_NAME = 'branquelas-v7';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/script.js',
  '/index.html',
  '/sitemap.xml',
  '/robots.txt',
  '/assets/images/img1.jpeg',
  '/assets/images/img2.jpeg',
  '/assets/images/img3.jpeg',
  '/assets/images/img4.jpeg',
  '/assets/images/aniversario.jpg',
  '/assets/images/casamento.jpg',
  '/assets/images/confraternização.jpg',
  '/assets/images/Eventos-Corporativos.jpg',
  '/assets/videos/branquelas.mp4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll error:', err);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          return caches.match('/index.html');
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
