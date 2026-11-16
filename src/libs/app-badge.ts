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
