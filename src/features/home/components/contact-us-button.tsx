import { useLiveChat } from '@/components/socket'
import { ButtonProps } from '@nui/ui/button/types'

import { ContactUsButtonWrapper, ContactUsUnreadBadge } from './home.style'

// Link and icon are fixed; size, rounded, className etc. pass through
type ContactUsButtonProps = Omit<ButtonProps, 'to' | 'icon'>

function unreadLabel(count: number) {
  return count > 99 ? '99+' : String(count)
}

// "Hubungi Kami" link to the live chat. Look only: where it sits (inline in
// the FAQ, floating in the portal) is up to the parent.
export function ContactUsButton(props: ContactUsButtonProps) {
  const { unreadCount } = useLiveChat()

  return (
    <ContactUsButtonWrapper
      to="/livechat"
      icon="lucide-messages-square"
      fontWeight="medium"
      {...props}
    >
      Hubungi Kami
      {unreadCount > 0 ? (
        <ContactUsUnreadBadge aria-label={`${unreadCount} pesan belum dibaca`}>
          {unreadLabel(unreadCount)}
        </ContactUsUnreadBadge>
      ) : null}
    </ContactUsButtonWrapper>
  )
}
