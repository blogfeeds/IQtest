const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
	'about.html',
	'contact.html',
	'privacy.html',
	'terms.html',
	'logo-72.png',
	'logo-96.png',
	'logo-128.png',
	'logo-152.png',
	'logo-167.png',
	'logo-180.png',
	'logo-192.png',
	'logo-512.png',
	'ogimage.jpg',
	'bootstrap.js',
    // Tambahkan URL aset lain yang ingin di-cache (CSS, JS, gambar, dll.)
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Kembalikan dari cache jika ada
                }

                return fetch(event.request).then(
                    function(response) {
                      // Periksa apakah responsnya valid
                      if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                      }
              
                      // IMPORTANT: clone the response. A response is a stream
                      // and because we want the response to be consumed by the cache
                      // *and* the app, we need to clone it so we have two streams.
                      var responseToCache = response.clone();
              
                      caches.open(CACHE_NAME)
                        .then(function(cache) {
                          cache.put(event.request, responseToCache);
                        });
              
                      return response;
                    }
                  );
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });