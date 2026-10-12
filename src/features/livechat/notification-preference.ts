import { useEffect, useState } from 'react'

const MUTE_KEY = 'livechat.notification.muted'
const DISMISS_KEY = 'livechat.notification.promptDismissed'
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
