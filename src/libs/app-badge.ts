type AppBadgeHost = {
  setAppBadge?: (contents?: number) => Promise<void>
  clearAppBadge?: () => Promise<void>
}

function asBadgeHost(value: unknown): AppBadgeHost | null {
  if (!value || typeof value !== 'object') return null
  const host = value as AppBadgeHost
  if (typeof host.setAppBadge !== 'function') return null
  return host
}

/**
 * iOS home-screen PWAs expose Badging on `navigator` (WebKit). Chromium may
 * also expose it on the service worker registration — try both.
 */
async function badgeHosts(): Promise<AppBadgeHost[]> {
  if (typeof navigator === 'undefined') return []

  const hosts: AppBadgeHost[] = []
  const fromNavigator = asBadgeHost(navigator)
  if (fromNavigator) hosts.push(fromNavigator)

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready
      const fromRegistration = asBadgeHost(registration)
      if (fromRegistration && fromRegistration !== fromNavigator) {
        hosts.push(fromRegistration)
      }
    } catch {
      // SW unavailable — navigator alone is enough on iOS.
    }
  }

  return hosts
}

/** Home-screen icon badge (iOS 16.4+ PWA / supported Chromium). */
export async function setLiveChatAppBadge(count: number) {
  try {
    const hosts = await badgeHosts()
    if (!hosts.length) return

    const next = Math.max(0, Math.floor(count))
    await Promise.all(
      hosts.map(async (host) => {
        if (next > 0) await host.setAppBadge?.(next)
        else await host.clearAppBadge?.()
      }),
    )
  } catch {
    // Unsupported browser, or the app is not installed to the home screen.
  }
}

export function clearLiveChatAppBadge() {
  return setLiveChatAppBadge(0)
}

/**
 * Notifications only close on tap (notificationclick). Opening the app from
 * its icon leaves them in the shade, and the SW counts the shade for the
 * badge, so close them whenever the app is shown.
 */
export async function closeLiveChatNotifications() {
  try {
    if (!('serviceWorker' in navigator)) return
    const registration = await navigator.serviceWorker.ready
    const list = await registration.getNotifications()
    list
      .filter((item) => item.tag.startsWith('livechat-'))
      .forEach((item) => item.close())
  } catch {
    // Unsupported browser — nothing to close.
  }
}
