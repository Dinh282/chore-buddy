// Precache assets
self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Network-first strategy for GraphQL requests
self.workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/graphql'),
    new self.workbox.strategies.NetworkFirst({
        cacheName: 'api',
    })
);

// Cache-first strategy for other assets
self.workbox.routing.registerRoute(
    ({ request }) => request.destination !== 'document',
    new self.workbox.strategies.CacheFirst({
        cacheName: 'assets',
    })
);

// Cache pages (HTML)
self.workbox.routing.registerRoute(
  new RegExp('/(login|register|dashboard)?$'),
  new self.workbox.strategies.NetworkFirst({
    cacheName: 'html-cache',
  })
);

// Cache assets (CSS, JS, and images)
self.workbox.routing.registerRoute(
  /\.(css|js|png|jpg|jpeg|gif)$/,
  new self.workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new self.workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
