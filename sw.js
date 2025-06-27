// Service Worker for Rhonda Patrick Wellness Tracker
// Provides offline functionality and caching

const CACHE_NAME = 'rhonda-tracker-v1.0.0';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/database.js',
  '/database-ui.js',
  '/analytics-charts.js',
  '/newsletter.js',
  '/dark-mode.js',
  '/manifest.json',
  // External resources
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://foundmyfitness.com/packs/media/redesign2019/assets/images/crowdcast_screenshot_with_iphone-6aeb75a0bfa303c22cf172a623d9d92a.jpeg'
];

// Network-first strategy for dynamic content
const NETWORK_FIRST_URLS = [
  '/api/',
  'https://www.googletagmanager.com/'
];

// Cache-first strategy for static assets
const CACHE_FIRST_URLS = [
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.woff',
  '.woff2'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] App shell cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache app shell:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Handle different request types
  if (shouldUseNetworkFirst(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (shouldUseCacheFirst(request.url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/');
    }
    
    throw error;
  }
}

// Cache-first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first failed:', request.url, error);
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch((error) => {
      console.log('[SW] Network request failed:', request.url);
      return null;
    });
  
  return cachedResponse || fetchPromise;
}

// Helper functions
function shouldUseNetworkFirst(url) {
  return NETWORK_FIRST_URLS.some(pattern => url.includes(pattern));
}

function shouldUseCacheFirst(url) {
  return CACHE_FIRST_URLS.some(extension => url.includes(extension));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  
  if (event.tag === 'wellness-data-sync') {
    event.waitUntil(syncWellnessData());
  }
  
  if (event.tag === 'newsletter-signup-sync') {
    event.waitUntil(syncNewsletterSignups());
  }
});

// Sync wellness data when back online
async function syncWellnessData() {
  try {
    // Get offline data from IndexedDB or localStorage
    const offlineData = await getOfflineWellnessData();
    
    if (offlineData.length > 0) {
      // Send to server when online
      for (const data of offlineData) {
        await fetch('/api/wellness-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      
      // Clear offline data after successful sync
      await clearOfflineWellnessData();
      console.log('[SW] Wellness data synced successfully');
    }
  } catch (error) {
    console.error('[SW] Failed to sync wellness data:', error);
  }
}

// Sync newsletter signups when back online
async function syncNewsletterSignups() {
  try {
    const offlineSignups = await getOfflineNewsletterSignups();
    
    if (offlineSignups.length > 0) {
      for (const signup of offlineSignups) {
        await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup)
        });
      }
      
      await clearOfflineNewsletterSignups();
      console.log('[SW] Newsletter signups synced successfully');
    }
  } catch (error) {
    console.error('[SW] Failed to sync newsletter signups:', error);
  }
}

// Helper functions for offline data management
async function getOfflineWellnessData() {
  // Implementation depends on your offline storage strategy
  // This is a placeholder - integrate with your existing database
  return [];
}

async function clearOfflineWellnessData() {
  // Clear offline wellness data after sync
}

async function getOfflineNewsletterSignups() {
  // Get newsletter signups stored offline
  return [];
}

async function clearOfflineNewsletterSignups() {
  // Clear offline newsletter signups after sync
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New wellness insights available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'wellness-notification',
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Rhonda Tracker', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if app not open
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('[SW] Service Worker loaded successfully');