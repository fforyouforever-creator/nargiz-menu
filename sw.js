const CACHE_NAME = 'nargiz-menu-v1';
// Сюда пишем файлы, которые надо сохранить в память устройства
const assets = [
  'index.html',
  'manifest.json',
  'logo.png',
  'N1.jpg', 'N2.jpg', 'N3.jpg', 'N4.jpg', 'N5.jpg', 'N6.jpg', 'N7.jpg', 'N8.jpg', 'N9.jpg', '10.jpg', 'N11.jpg', 'N12.jpg', 'N13.jpg',
  'burger1.jpg', 'sous1.jpg', 'coffee1.jpg', 'cola1.jpg'
];

// Установка воркера и кэширование ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Активация и очистка старого кэша при обновлениях
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Перехват запросов (работа в офлайне)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
