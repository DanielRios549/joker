var cacheName = 'joker-1.1';
var filesToCache = [
    'css/userStyle.css',
    'javascript/jokerScript.js',
    'javascript/libraries/jquery.js',
    'javascript/libraries/zepto.js',
    'fonts/icons/fontAwesome.otf',
    'fonts/icons/icoMoon.ttf',
    'fonts/icons/playerIcon.ttf'
];

//Init Service Worker

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
        .open(cacheName)
        .then(function(cache) {
           return cache.addAll(filesToCache);
        })
        .then(function() {
            return self.skipWaiting();
        })
    );
});

//Active Service Worker

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});

//Fetch the files

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});