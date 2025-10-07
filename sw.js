// This is a basic service worker that enables PWA installation.

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // The service worker is installed.
  // You could pre-cache assets here for offline functionality.
  // For now, we'll keep it simple to just enable installation.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  // Ensure the service worker takes control of the page immediately.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // This simple fetch handler is enough to make the app installable.
  // It follows a network-first approach.
  event.respondWith(fetch(event.request));
});

// Listen for push notifications from the server.
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  const data = event.data ? event.data.json() : { title: 'Expense Tracker', body: 'You have a new notification.' };
  
  const title = data.title || 'Expense Tracker';
  const options = {
    body: data.body || 'Check your latest updates.',
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png',
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle the user clicking on a notification.
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();

  // Focus an existing app window or open a new one.
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
