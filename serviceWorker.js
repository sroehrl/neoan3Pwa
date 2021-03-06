let CACHE_NAME = '{{cacheName}}';
let assets = [
    '{{base}}neoan3-pwa/manifest/{{name}}',
    '{{base}}asset/neoan-favicon.png'
];

let urlString = assets.join(',') + ',{{routes}}';
let urlsToCache = urlString.split(',');
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(fetchResponse).catch(e => {
                    // retry once with credentials
                    return fetch(event.request,{credentials:'include'}).then(fetchResponse).catch(e => console.log('Failed to catch'))
                });
            })
    );
});
function fetchResponse(response) {
    // Check if we received a valid response
    if(!response || response.status !== 200 || response.type !== 'basic') {
        return response;
    }
    let responseToCache = response.clone();

    caches.open(CACHE_NAME)
        .then(function(cache) {
            cache.put(event.request, responseToCache);
        });

    return response;
}

self.addEventListener('message', (event) => {
    console.log('message-event', event);
    if (event.data.action === 'skipWaiting') {
        clearCaches().then(()=> self.skipWaiting()).catch(err => console.log(err))
    }
});
function clearCaches() {
    return caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(key) {
                return key.indexOf(CACHE_NAME) !== 0;
            }).map(function(key) {
                return caches.delete(key);
            })
        );
    })
}

