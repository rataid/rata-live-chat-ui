import { useEffect, useState } from 'react'

const MUTE_KEY = 'livechat.notification.muted'
const DISMISS_KEY = 'livechat.notification.promptDismissed'
const IOS_INSTALL_DISMISS_KEY = 'livechat.notification.iosInstallDismissed'
const MUTE_EVENT = 'livechat-notification-mute'

export function isNotificationMuted() {
  return localStorage.getItem(MUTE_KEY) === '1'
}

export function setNotificationMuted(muted: boolean) {
  localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
  window.dispatchEvent(new Event(MUTE_EVENT))
}

export function isNotificationPromptDismissed() {
  return localStorage.getItem(DISMISS_KEY) === '1'
}

export function dismissNotificationPrompt() {
  localStorage.setItem(DISMISS_KEY, '1')
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

export function readNotificationPermission(): NotificationPermission | 'unavailable' {
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
    return Promise.resolve(readNotificationPermission())
  }

  const current = readNotificationPermission()
  if (current !== 'default') {
    setNotificationMuted(current !== 'granted')
    return Promise.resolve(current)
  }

  const request = Notification.requestPermission()

  if ('serviceWorker' in navigator) {
    void navigator.serviceWorker
      .register('/livechat-notification-sw.js')
      .catch(() => undefined)
  }

  return request.then((result) => {
    setNotificationMuted(result !== 'granted')
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
