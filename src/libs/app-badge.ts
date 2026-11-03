type AppBadgeHost = {
  setAppBadge?: (contents?: number) => Promise<void>
  clearAppBadge?: () => Promise<void>
}

async function badgeHost(): Promise<AppBadgeHost | null> {
  if (typeof navigator === 'undefined') return null

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready
      if (registration && 'setAppBadge' in registration) {
        return registration as AppBadgeHost
      }
    } catch {
      // Fall through to navigator when the SW is unavailable.
    }
  }

  return navigator as AppBadgeHost
}

/** Home-screen icon badge (iOS 16.4+ PWA / supported Chromium). */
export async function setLiveChatAppBadge(count: number) {
  try {
    const host = await badgeHost()
    if (!host) return

    if (count > 0) {
      await host.setAppBadge?.(count)
      return
    }

    await host.clearAppBadge?.()
  } catch {
    // Unsupported browser, or the app is not installed to the home screen.
  }
}

export function clearLiveChatAppBadge() {
  return setLiveChatAppBadge(0)
}
