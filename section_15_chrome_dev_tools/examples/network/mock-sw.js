/**
 * Usage:
 *  1. Configure the RULES array below with your target endpoints.
 *  2. Register from DevTools console:
 *        navigator.serviceWorker.register('/examples/network/mock-sw.js');
 *  3. Reload the page so the service worker can intercept requests.
 *  4. When done, unregister:
 *        navigator.serviceWorker.getRegistration('/examples/network/mock-sw.js').then(r => r.unregister());
 *     or click "Unregister" in Application > Service Worker panel.
 *
 * The urlPattern is matched against the full request URL and can be a:
 *  - string -> plain substring match (e.g. 'some/endpoint')
 *  - RegExp -> regex match (e.g. /\/some\/endpoint(\?.*)?$/)
 */

const RULES = [
  {
    urlPattern: /\/(posts|comments)(\?.*)?$/,
    delayMs: 3000,
    status: 500,
    body: JSON.stringify({
      message: 'Simulated server error from the service worker',
      handledBy: 'mock-sw.js',
    }),
  },
];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) =>
  event.waitUntil(self.clients.claim()),
);

const matchesUrl = (pattern, url) =>
  pattern instanceof RegExp ? pattern.test(url) : url.includes(pattern);

self.addEventListener('fetch', (event) => {
  const rule = RULES.find((r) => matchesUrl(r.urlPattern, event.request.url));

  if (!rule) return;

  event.respondWith(
    new Promise((resolve) =>
      setTimeout(() =>
        resolve(
          new Response(rule.body ?? '', {
            status: rule.status,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'X-Mocked-By': 'mock-sw.js',
            },
          }),
        ),
        rule.delayMs,
      ),
    ),
  );
});
