import { LogoSmiledental } from '@/assets'
import Icon from '@nui/ui/icon'

import {
  ChatHeaderBack,
  ChatHeaderBrand,
  ChatHeaderLogo,
  ChatHeaderMobile,
  ChatHeaderSubtitle,
  ChatHeaderTitle,
  ChatHeaderWrapper,
} from './chat.style'

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
    </ChatHeaderWrapper>
  )
}
