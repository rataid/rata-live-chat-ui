import { useState } from 'react'

import { LogoSmiledental } from '@/assets'
import Icon from '@nui/ui/icon'

import {
  readNotificationPermission,
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
} from './chat.style'
import { NotificationPrompt } from './notification-prompt'

type ChatHeaderProps = {
  title: string
  subtitle?: string
  mobileTitle: string
  mobileSubtitle?: string
}

export function ChatHeader({
  title,
  subtitle,
  mobileTitle,
  mobileSubtitle,
}: ChatHeaderProps) {
  const { muted } = useNotificationMuted()
  const [open, setOpen] = useState<boolean | undefined>(undefined)
  const notificationsOn = !muted && readNotificationPermission() === 'granted'

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
      <ChatHeaderNotify>
        <ChatHeaderMute
          type="button"
          aria-expanded={open === true}
          aria-haspopup="dialog"
          aria-pressed={notificationsOn}
          aria-label="Pengaturan notifikasi"
          onClick={() =>
            setOpen((current) => (current === true ? false : true))
          }
        >
          <Icon
            icon={notificationsOn ? 'lucide-bell' : 'lucide-bell-off'}
            size="xs"
          />
        </ChatHeaderMute>
        <NotificationPrompt open={open} onClose={() => setOpen(false)} />
      </ChatHeaderNotify>
    </ChatHeaderWrapper>
  )
}
