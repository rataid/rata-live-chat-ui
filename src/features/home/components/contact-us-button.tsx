import { ButtonProps } from '@nui/ui/button/types'

import { ContactUsButtonWrapper } from './home.style'

// Link and icon are fixed; size, rounded, className etc. pass through
type ContactUsButtonProps = Omit<ButtonProps, 'to' | 'icon'>

// "Hubungi Kami" link to the live chat. Look only: where it sits (inline in
// the FAQ, floating in the portal) is up to the parent.
export function ContactUsButton(props: ContactUsButtonProps) {
  return (
    <ContactUsButtonWrapper
      to="/livechat"
      icon="lucide-messages-square"
      fontWeight="medium"
      {...props}
    >
      Hubungi Kami
    </ContactUsButtonWrapper>
  )
}
