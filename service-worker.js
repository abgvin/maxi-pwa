const CACHE_NAME = "maxi-id-pwa-v2";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/pages/aerox.html",
  "/pages/nmax.html",
  "/pages/lexi.html",
  "/pages/xmax.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/jquery.js",
  "/js/register-sw.js",
  "/images/icon.png",
  "/images/icon-for-ios.png",
  "/images/aerox/aerox.png",
  "/images/aerox/aerox-hero.jpg",
  "/images/aerox/aerox-slogan.png",
  "/images/aerox/item1.jpg",
  "/images/aerox/item2.jpg",
  "/images/aerox/item3.jpg",
  "/images/aerox/item4.jpg",
  "/images/aerox/item5.jpg",
  "/images/lexi/item1.jpg",
  "/images/lexi/item2.jpg",
  "/images/lexi/item3.jpg",
  "/images/lexi/item4.jpg",
  "/images/lexi/item5.jpg",
  "/images/lexi/lexi.png",
  "/images/lexi/lexi-slogan.png",
  "/images/nmax/item1.jpg",
  "/images/nmax/item2.jpg",
  "/images/nmax/item3.jpg",
  "/images/nmax/item4.jpg",
  "/images/nmax/item5.jpg",
  "/images/nmax/nmax.png",
  "/images/nmax/nmax-hero.jpg",
  "/images/nmax/nmax-slogan.png",
  "/images/xmax/item1.jpg",
  "/images/xmax/item2.jpg",
  "/images/xmax/item3.jpg",
  "/images/xmax/item4.jpg",
  "/images/xmax/item5.jpg",
  "/images/xmax/xmax.png",
  "/images/xmax/xmax-slogan.png",
  "/images/main-bg.png",
  "/images/Maxi-id.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "https://fonts.googleapis.com/css2?family=Francois+One&family=Roboto:wght@300;400&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});