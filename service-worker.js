"use strict";var precacheConfig=[["/todos/HelveticaNeue.5e6e8901.ttf","5754a536be2476d2c8eaddb27fa300d2"],["/todos/android-icon-144x144.83c60416.png","e6663935dd473ea5619b976faffacca9"],["/todos/android-icon-192x192.c00875cc.png","9d84b25550abde2dd45c54cbf310408f"],["/todos/android-icon-36x36.c87bca64.png","778fea330bf8dc8978d31301c8e902e8"],["/todos/android-icon-48x48.5d706c38.png","26b1ffeccd5369d7c8ff9bc990681c94"],["/todos/android-icon-72x72.23cd7961.png","3c54f4458c66206140d64f069d017794"],["/todos/android-icon-96x96.6242ddbd.png","5b829c1b6b5d7a533e97f1bb4b354e3b"],["/todos/apple-icon-114x114.e0357f78.png","d798c416c5e77c275a2b86a61ba653db"],["/todos/apple-icon-120x120.f42b2413.png","103080a48dac55db707e427c53da983f"],["/todos/apple-icon-144x144.905862a8.png","e6663935dd473ea5619b976faffacca9"],["/todos/apple-icon-152x152.f4e5e563.png","3e386a7934cfcc8fb61884c06cab5306"],["/todos/apple-icon-180x180.cfea758c.png","75ff79391c3f1e371450d92ff8fc7b47"],["/todos/apple-icon-57x57.6787db84.png","31f2eb5902bc60b059484b481a75738d"],["/todos/apple-icon-60x60.c929bbf8.png","0a544b791b4b77b24b2a585217f9cc81"],["/todos/apple-icon-72x72.44259502.png","3c54f4458c66206140d64f069d017794"],["/todos/apple-icon-76x76.d7610ea7.png","0aa13fe47c1ec52f22e85f8cb2ff12e2"],["/todos/favicon-16x16.f274d402.png","aa5b9cddfa754f397b8e31d051de59d0"],["/todos/favicon-32x32.40a89925.png","e8aa3ff1ea485a2c6254adbf1a5a930e"],["/todos/favicon-96x96.9860901f.png","5b829c1b6b5d7a533e97f1bb4b354e3b"],["/todos/index.html","6fabc56324a2852e74a38fe146c2c7a9"],["/todos/ms-icon-144x144.16dd9849.png","e6663935dd473ea5619b976faffacca9"],["/todos/src.1f24ebb1.js","0f27b71d8cd1d408b06fe4aa27288969"],["/todos/styles.92f621ae.css","af95b6054a855dbf7af79a9ff3acd517"]],cacheName="sw-precache-v3-todos-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),c=createCacheKey(a,hashParamName,t,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));!n&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/todos/index.html",self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});