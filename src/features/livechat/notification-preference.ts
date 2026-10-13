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
