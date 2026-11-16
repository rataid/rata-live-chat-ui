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
  if (event.data?.type === 'SET_APP_BADGE') {
    event.waitUntil(syncAppBadge(event.data.count))
  }
})

// iOS home-screen PWAs need Badging API (WebKit exposes it on navigator).
// Android launchers often badge from notifications alone.
async function applyAppBadge(count) {
  try {
    const next = Math.max(0, Math.floor(Number(count) || 0))
    const hosts = []
    if (self.navigator && typeof self.navigator.setAppBadge === 'function') {
      hosts.push(self.navigator)
    }
    if (typeof self.registration.setAppBadge === 'function') {
      hosts.push(self.registration)
    }
    await Promise.all(
      hosts.map(async (host) => {
        if (next > 0) await host.setAppBadge(next)
        else if (typeof host.clearAppBadge === 'function') await host.clearAppBadge()
      }),
    )
  } catch {}
}

async function countLivechatNotifications() {
  try {
    const list = await self.registration.getNotifications()
    return list.filter((item) => String(item.tag || '').startsWith('livechat-')).length
  } catch {
    // iOS historically returns [] from getNotifications — treat as unknown.
    return null
  }
}

async function syncAppBadge(explicitCount) {
  if (typeof explicitCount === 'number' && Number.isFinite(explicitCount)) {
    await applyAppBadge(explicitCount)
    return
  }
  const fromShade = await countLivechatNotifications()
  if (fromShade != null) await applyAppBadge(fromShade)
}

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    // Local disable/logout also protects against already queued notifications.
    const enabled = await preferences((store) => store.get('enabled')).catch(() => undefined)
    if (enabled === false) return

    // If Smile Hub already has an open page, the livechat socket shows one
    // local notification. Showing push as well duplicates on iOS (same tag
    // + renotify does not collapse the way Chromium does).
    const openClients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    const appOpen = openClients.some((client) => {
      try {
        return new URL(client.url).origin === self.location.origin
      } catch {
        return false
      }
    })
    if (appOpen) return

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
      // Xiaomi/MIUI often suppresses quiet web notifications; force an alert.
      renotify: true,
      requireInteraction: true,
      silent: false,
      vibrate: [200, 100, 200],
    })

    // Prefer server count when present. Otherwise try shade notifications —
    // but on iOS getNotifications() is often empty, so fall back to at least 1
    // for this delivered push (otherwise the icon badge never appears).
    let count =
      typeof payload.count === 'number' && Number.isFinite(payload.count)
        ? payload.count
        : await countLivechatNotifications()
    if (count == null || count < 1) count = 1
    await applyAppBadge(count)
  })())
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil((async () => {
    // Leave badge alone here when iOS cannot list notifications; the open
    // client will sync from unread clinic replies via Badging API.
    const remaining = await countLivechatNotifications()
    if (remaining != null) await applyAppBadge(remaining)
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
