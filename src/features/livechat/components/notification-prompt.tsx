import { useEffect, useState } from 'react'

import {
  dismissNotificationPrompt,
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

function canAskForNotificationPermission() {
  return (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'default' &&
    !isNotificationPromptDismissed()
  )
}

export function NotificationPrompt() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(canAskForNotificationPermission())
  }, [])

  if (!open) return null

  const enable = () => {
    void Notification.requestPermission().finally(() => setOpen(false))
  }

  const later = () => {
    dismissNotificationPrompt()
    setOpen(false)
  }

  return (
    <NotificationPromptCard
      role="dialog"
      aria-labelledby="livechat-notification-prompt-title"
    >
      <NotificationPromptTitle id="livechat-notification-prompt-title">
        Don&apos;t miss any updates!
      </NotificationPromptTitle>
      <NotificationPromptBody>
        We&apos;ll send notifications when there&apos;s a reply, even if
        you&apos;re on another tab
      </NotificationPromptBody>
      <NotificationPromptActions>
        <NotificationPromptEnable type="button" onClick={enable}>
          Enable notifications
        </NotificationPromptEnable>
        <NotificationPromptLater type="button" onClick={later}>
          Maybe later
        </NotificationPromptLater>
      </NotificationPromptActions>
      <NotificationPromptNote>
        You can change this permission anytime through your browser settings.
      </NotificationPromptNote>
    </NotificationPromptCard>
  )
}
