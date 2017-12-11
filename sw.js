/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

var cacheName = 'joker-1.0';

var filesToCache = [
    'css/userStyle.css',
    'javascript/jokerScript.js',
    'javascript/libraries/jquery.js',
    'javascript/libraries/zepto.js',
    'fonts/icons/fontAwesome.otf',
    'fonts/icons/icoMoon.ttf',
    'fonts/icons/playerIcon.ttf',
    'images/atomoLogoMedio.png',
    'images/atomoLogoPequeno.png',
    'images/favicon.png',
    'images/logo.png'
];

//Init Service Worker

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
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
            if (response) {
                return response;
            }
            return fetch(event.request);

            //This will add the files dynamically in the cache

            /*var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    
                    caches.open(cacheName).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                }
            );*/
        })
    );
});