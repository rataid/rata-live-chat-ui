import { useLocation } from 'react-router-dom'

import { ContactUsButton } from '@/features/home/components/contact-us-button'

import { ChatFabPosition } from './portal-layout.style'

// Hidden on the live chat page itself
export function ChatFab() {
  const { pathname } = useLocation()

  if (pathname.startsWith('/livechat')) return null

  return (
    <ChatFabPosition>
      <ContactUsButton
        size="lg"
        rounded="full"
        className="shadow-lg"
        data-tour="chat-with-us"
      />
    </ChatFabPosition>
  )
}
