self.addEventListener('install', event => {
  console.log('[SW] Installed');
  event.waitUntil(
    caches.open('static-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
