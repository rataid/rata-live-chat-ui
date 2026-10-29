import { useEffect, useState } from 'react'

const MUTE_KEY = 'livechat.notification.muted'
const DISMISS_KEY = 'livechat.notification.promptDismissed'
const IOS_INSTALL_DISMISS_KEY = 'livechat.notification.iosInstallDismissed'
const CHOICE_KEY = 'livechat.notification.choice'
const MUTE_EVENT = 'livechat-notification-mute'

export function isNotificationMuted() {
  return localStorage.getItem(MUTE_KEY) === '1'
}

export function setNotificationMuted(muted: boolean) {
  localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
  window.dispatchEvent(new Event(MUTE_EVENT))
}

// "Mungkin nanti" postpones this page's prompt for the current tab session.
// Do not reuse the old permanent localStorage flag: dismissing on login must
// not suppress the prompt on livechat or on future browsing sessions.
function notificationPromptDismissKey() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return `${DISMISS_KEY}:${path}`
}

export function isNotificationPromptDismissed(pageOnly = false) {
  try {
    return (
      (!pageOnly && sessionStorage.getItem(CHOICE_KEY) === '1') ||
      sessionStorage.getItem(notificationPromptDismissKey()) === '1'
    )
  } catch {
    return false
  }
}

export function dismissNotificationPrompt() {
  try {
    sessionStorage.setItem(notificationPromptDismissKey(), '1')
  } catch {}
}

export function isIosDevice() {
  const ua = navigator.userAgent
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export function isHomeScreenApp() {
  const standalone = (navigator as Navigator & { standalone?: boolean })
    .standalone
  return (
    standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches
  )
}

export function isIosInstallDismissed() {
  return localStorage.getItem(IOS_INSTALL_DISMISS_KEY) === '1'
}

export function dismissIosInstallPrompt() {
  localStorage.setItem(IOS_INSTALL_DISMISS_KEY, '1')
}

export function readNotificationPermission():
  | NotificationPermission
  | 'unavailable' {
  try {
    if (typeof Notification === 'undefined') return 'unavailable'
    return Notification.permission
  } catch {
    return 'unavailable'
  }
}

// The bell only stores a local mute. Browser permission still has to be
// granted, and requestPermission must run in the click turn.
export function setLivechatNotifications(enabled: boolean) {
  if (!enabled) {
    setNotificationMuted(true)
    return import('./push/push-client').then(async ({ disableWebPush }) => {
      await disableWebPush()
      return readNotificationPermission()
    })
  }
  // Keep this permission call synchronous with the user's click (iOS requirement).
  const current = readNotificationPermission()
  const permission =
    current === 'default'
      ? Notification.requestPermission()
      : Promise.resolve(current)
  return permission.then(async (result) => {
    setNotificationMuted(result !== 'granted')
    if (result === 'granted') {
      const { syncWebPush } = await import('./push/push-client')
      try {
        await syncWebPush()
      } catch (error) {
        setNotificationMuted(true)
        throw error
      }
    }
    return result
  })
}

export function useNotificationMuted() {
  const [muted, setMuted] = useState(isNotificationMuted)

  useEffect(() => {
    const sync = () => setMuted(isNotificationMuted())
    window.addEventListener(MUTE_EVENT, sync)
    window.addEventListener('storage', sync)

    return () => {
      window.removeEventListener(MUTE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return {
    muted,
    toggle: () => setNotificationMuted(!muted),
  }
}

export function recordNotificationChoice() {
  try {
    sessionStorage.setItem(CHOICE_KEY, '1')
  } catch {}
}
