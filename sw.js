;
//asignar un nombre y version al cache
const CACHE_NAME = 'v1_cache_virtual_on',
    urlsToCache = [
        './',
        './src/public/css/style.css'
    ]

// Durante la fase de instalación, se almacenará en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})


//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            cachesNames.map(cacheName => {
                //Elimina lo que ya no se necesita en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
        })
        //Le indica al ServiceWorker activar el cache actual
        .then(() => self.clients.claim())
    )
})

//Cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder con el objeto en cache o continuar buscando la url real actualizada
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperando del cache
                return res
            }
            //recuperar la peticion a la url
            return fetch(e.request)
        })
    )
})