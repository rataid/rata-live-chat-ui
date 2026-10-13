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
  NotificationPromptTitle,
} from './chat.style'

type PromptMode = 'hidden' | 'enable' | 'ios-install'

function canAskForNotificationPermission() {
  return (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'default' &&
    !isNotificationPromptDismissed()
  )
}

function promptMode(): PromptMode {
  if (isIosDevice() && !isHomeScreenApp()) {
    return isIosInstallDismissed() ? 'hidden' : 'ios-install'
  }

  return canAskForNotificationPermission() ? 'enable' : 'hidden'
}

export function NotificationPrompt() {
  const [mode, setMode] = useState<PromptMode>('hidden')

  useEffect(() => {
    setMode(promptMode())
  }, [])

  if (mode === 'hidden') return null

  const enable = () => {
    const ask = () => {
      void Notification.requestPermission().finally(() => setMode('hidden'))
    }

    if (!('serviceWorker' in navigator)) {
      ask()
      return
    }

    void navigator.serviceWorker
      .register('/livechat-notification-sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then(ask)
      .catch(ask)
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
      <NotificationPromptBody $wrap={iosInstall}>
        {iosInstall
          ? 'iPhone shows notifications only when this portal is opened from the Home Screen icon.'
          : "We'll send notifications when there's a reply, even if you're on another tab"}
      </NotificationPromptBody>
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
      <NotificationPromptNote $wrap={iosInstall}>
        {iosInstall
          ? 'In Safari, tap Share, then Add to Home Screen. Open Tanam, log in, then tap Enable notifications.'
          : 'You can change this permission anytime through your browser settings.'}
      </NotificationPromptNote>
    </NotificationPromptCard>
  )
}
