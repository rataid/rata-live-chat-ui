// Do not cache authenticated pages, API responses, tokens, or chat attachments.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

const DB = 'smilehub-notifications'
function preferences(work) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1)
    request.onupgradeneeded = () => request.result.createObjectStore('preferences')
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction('preferences', 'readwrite')
      const result = work(transaction.objectStore('preferences'))
      transaction.oncomplete = () => { db.close(); resolve(result.result) }
      transaction.onerror = () => { db.close(); reject(transaction.error) }
    }
  })
}
self.addEventListener('message', (event) => {
  if (event.data?.type === 'PUSH_ENABLED') {
    event.waitUntil(preferences((store) => store.put(event.data.enabled, 'enabled')))
  }
})
self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    // Local disable/logout also protects against already queued notifications.
    const enabled = await preferences((store) => store.get('enabled')).catch(() => undefined)
    if (enabled === false) return

    const clients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    const ours = clients.filter(
      (client) => new URL(client.url).origin === self.location.origin
    )
    // Live chat is open and visible: never show a push (socket/UI handles it).
    const liveChatOpen = ours.some((client) => {
      const path = new URL(client.url).pathname
      return (
        path.startsWith('/livechat') &&
        (client.visibilityState === 'visible' || client.focused)
      )
    })
    if (liveChatOpen) return
    // Another Smile Hub tab/window is visible: socket-local path already alerts.
    // Skipping here avoids double notifications (esp. iOS PWA).
    const hasVisibleClient = ours.some(
      (client) => client.visibilityState === 'visible' || client.focused
    )
    if (hasVisibleClient) return

    let payload = {}
    try { payload = event.data?.json() || {} } catch {}
    await self.registration.showNotification(
      typeof payload.title === 'string' && payload.title.trim()
        ? payload.title.slice(0, 100) : 'Smile Hub', {
      body: typeof payload.body === 'string' && payload.body.trim()
        ? payload.body.slice(0, 240) : 'Anda menerima pesan baru.',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: typeof payload.tag === 'string' ? payload.tag : 'livechat-reply',
      data: { url: '/livechat' },
      renotify: true,
      // Stay in the Android/iOS shade until the user taps or dismisses.
      requireInteraction: true,
      silent: false,
    })
  })())
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil((async () => {
    const url = new URL('/livechat', self.location.origin).href
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    const client = clients.find((item) => new URL(item.url).origin === self.location.origin)
    if (client) {
      // Focus first: iOS can reject focus after awaiting navigation.
      await client.focus()
      if ('navigate' in client) await client.navigate(url)
      return
    }
    return self.clients.openWindow(url)
  })())
})

// Offline navigation gets a generic page rather than cached patient data.
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return
  event.respondWith(fetch(event.request).catch(() => new Response(
    '<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Smile Hub</title><body><h1>Anda sedang offline</h1><p>Hubungkan perangkat ke internet untuk membuka Smile Hub dan percakapan Anda.</p><a href="/home">Coba lagi</a></body></html>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  )))
})
