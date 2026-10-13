import { useEffect, useState } from 'react'

import {
  dismissIosInstallPrompt,
  dismissNotificationPrompt,
  isHomeScreenApp,
  isIosDevice,
  isIosInstallDismissed,
  isNotificationPromptDismissed,
} from '../notification-preference'
import {
  NotificationPromptActions,
  NotificationPromptBody,
  NotificationPromptCard,
  NotificationPromptEnable,
  NotificationPromptLater,
  NotificationPromptNote,
  NotificationPromptSteps,
  NotificationPromptTitle,
} from './chat.style'

type PromptMode = 'hidden' | 'enable' | 'ios-install'

function notificationPermission(): NotificationPermission | 'unavailable' {
  try {
    if (typeof Notification === 'undefined') return 'unavailable'
    return Notification.permission
  } catch {
    return 'unavailable'
  }
}

function canAskForNotificationPermission() {
  return (
    notificationPermission() === 'default' && !isNotificationPromptDismissed()
  )
}

function promptMode(): PromptMode {
  const installed = isHomeScreenApp()

  if (isIosDevice() && !installed) {
    return isIosInstallDismissed() ? 'hidden' : 'ios-install'
  }

  // iOS only exposes Notification inside a Home Screen app whose manifest
  // it accepted. Keep the Enable card up until permission is granted.
  if (isIosDevice() && installed) {
    return notificationPermission() === 'granted' ? 'hidden' : 'enable'
  }

  return canAskForNotificationPermission() ? 'enable' : 'hidden'
}

export function NotificationPrompt() {
  const [mode, setMode] = useState<PromptMode>('hidden')

  useEffect(() => {
    const sync = () => setMode(promptMode())
    sync()
    window.addEventListener('pageshow', sync)
    const timers = [300, 1000].map((delay) => window.setTimeout(sync, delay))

    return () => {
      window.removeEventListener('pageshow', sync)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  if (mode === 'hidden') return null

  const enable = () => {
    if (typeof Notification === 'undefined') return

    // Chrome only keeps the click as a user gesture for the synchronous
    // part of this handler. Awaiting service worker registration first
    // drops that gesture, and Chrome then shows a quiet permission
    // bubble whose Allow button does not accept clicks.
    let permission: Promise<NotificationPermission>
    try {
      permission = Notification.requestPermission()
    } catch {
      return
    }

    const ready =
      'serviceWorker' in navigator
        ? navigator.serviceWorker
            .register('/livechat-notification-sw.js')
            .then(() => navigator.serviceWorker.ready)
            .catch(() => undefined)
        : Promise.resolve()

    void Promise.all([permission, ready]).finally(() => setMode('hidden'))
  }

  const later = () => {
    if (mode === 'ios-install') dismissIosInstallPrompt()
    else dismissNotificationPrompt()
    setMode('hidden')
  }

  const iosInstall = mode === 'ios-install'

  return (
    <NotificationPromptCard
      role="dialog"
      aria-labelledby="livechat-notification-prompt-title"
    >
      <NotificationPromptTitle id="livechat-notification-prompt-title">
        {iosInstall ? 'Add to Home Screen' : "Don't miss any updates!"}
      </NotificationPromptTitle>
      <NotificationPromptBody>
        {iosInstall
          ? 'iPhone shows notifications only when this portal is opened from the Home Screen icon.'
          : "We'll send notifications when there's a reply, even if you're on another tab"}
      </NotificationPromptBody>
      {iosInstall ? (
        <NotificationPromptSteps>
          <li>Tap the Share button at the bottom of Safari.</li>
          <li>Tap Add to Home Screen, then Add.</li>
          <li>Open the Tanam icon, log in, then tap Enable notifications.</li>
        </NotificationPromptSteps>
      ) : null}
      <NotificationPromptActions>
        {iosInstall ? null : (
          <NotificationPromptEnable type="button" onClick={enable}>
            Enable notifications
          </NotificationPromptEnable>
        )}
        <NotificationPromptLater type="button" onClick={later}>
          Maybe later
        </NotificationPromptLater>
      </NotificationPromptActions>
      {iosInstall ? null : (
        <NotificationPromptNote>
          You can change this permission anytime through your browser settings.
        </NotificationPromptNote>
      )}
    </NotificationPromptCard>
  )
}
