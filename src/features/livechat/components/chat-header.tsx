import { useEffect, useRef, useState } from 'react'

import { LogoSmiledental } from '@/assets'
import Icon from '@nui/ui/icon'

import {
  isHomeScreenApp,
  isIosDevice,
  readNotificationPermission,
  setLivechatNotifications,
  useNotificationMuted,
} from '../notification-preference'
import {
  ChatHeaderBack,
  ChatHeaderBrand,
  ChatHeaderLogo,
  ChatHeaderMobile,
  ChatHeaderMute,
  ChatHeaderNotify,
  ChatHeaderSubtitle,
  ChatHeaderTitle,
  ChatHeaderWrapper,
  ChatNotifyMenu,
  ChatNotifyMenuAction,
  ChatNotifyMenuBody,
  ChatNotifyMenuTitle,
} from './chat.style'

type ChatHeaderProps = {
  title: string
  subtitle?: string
  mobileTitle: string
  mobileSubtitle?: string
}

type Permission = NotificationPermission | 'unavailable'

function menuCopy(permission: Permission, muted: boolean, iosInstall: boolean) {
  if (iosInstall) {
    return 'On iPhone, add this portal to your Home Screen before notifications can be turned on.'
  }

  if (permission === 'unavailable') {
    return "This browser can't show notifications."
  }

  if (permission === 'denied') {
    return 'Your browser is blocking notifications. Allow them in the site settings, then turn them on here.'
  }

  if (!muted && permission === 'granted') {
    return "You'll get a notification when the clinic replies, even if you're on another tab."
  }

  return 'Turn on notifications to hear about replies when this tab is in the background.'
}

export function ChatHeader({
  title,
  subtitle,
  mobileTitle,
  mobileSubtitle,
}: ChatHeaderProps) {
  const { muted } = useNotificationMuted()
  const [open, setOpen] = useState(false)
  const [permission, setPermission] = useState<Permission>(readNotificationPermission)
  const rootRef = useRef<HTMLDivElement>(null)
  const iosInstall = isIosDevice() && !isHomeScreenApp()
  const notificationsOn = !muted && permission === 'granted'
  const canToggle = !iosInstall && permission !== 'unavailable' && permission !== 'denied'

  useEffect(() => {
    if (!open) return

    setPermission(readNotificationPermission())

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () => {
    void setLivechatNotifications(!notificationsOn).then((result) => {
      setPermission(result)
    })
  }

  return (
    <ChatHeaderWrapper>
      <ChatHeaderBrand>
        <ChatHeaderLogo>
          <div className="w-1/2">
            <LogoSmiledental />
          </div>
        </ChatHeaderLogo>
        <div className="min-w-0">
          <ChatHeaderTitle>{title}</ChatHeaderTitle>
          {subtitle && <ChatHeaderSubtitle>{subtitle}</ChatHeaderSubtitle>}
        </div>
      </ChatHeaderBrand>
      <ChatHeaderMobile>
        <ChatHeaderBack to="/home" aria-label="Back to Home">
          <Icon icon="lucide-arrow-left" size="xs" />
        </ChatHeaderBack>
        <div className="min-w-0">
          <ChatHeaderTitle>{mobileTitle}</ChatHeaderTitle>
          {mobileSubtitle && (
            <ChatHeaderSubtitle>{mobileSubtitle}</ChatHeaderSubtitle>
          )}
        </div>
      </ChatHeaderMobile>
      <ChatHeaderNotify ref={rootRef}>
        <ChatHeaderMute
          type="button"
          aria-expanded={open}
          aria-pressed={notificationsOn}
          aria-label={notificationsOn ? 'Notifications on' : 'Notifications off'}
          onClick={() => setOpen((current) => !current)}
        >
          <Icon
            icon={notificationsOn ? 'lucide-bell' : 'lucide-bell-off'}
            size="xs"
          />
        </ChatHeaderMute>
        {open ? (
          <ChatNotifyMenu role="dialog" aria-label="Notifications">
            <ChatNotifyMenuTitle>Notifications</ChatNotifyMenuTitle>
            <ChatNotifyMenuBody>
              {menuCopy(permission, muted, iosInstall)}
            </ChatNotifyMenuBody>
            {canToggle ? (
              <ChatNotifyMenuAction type="button" onClick={toggle}>
                {notificationsOn ? 'Turn off' : 'Turn on'}
              </ChatNotifyMenuAction>
            ) : null}
          </ChatNotifyMenu>
        ) : null}
      </ChatHeaderNotify>
    </ChatHeaderWrapper>
  )
}
