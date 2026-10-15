import { useLocation } from 'react-router-dom'

import Icon from '@nui/ui/icon'

import { ChatFab as ChatFabLink } from './portal-layout.style'

// Hidden on the live chat page itself
export function ChatFab() {
  const { pathname } = useLocation()

  if (pathname.startsWith('/livechat')) return null

  return (
    <ChatFabLink
      to="/livechat"
      aria-label="Chat with Us"
      data-tour="chat-with-us"
    >
      <Icon icon="lucide-messages-square" size="sm" />
      <span className="hidden sm:inline">Chat with Us</span>
    </ChatFabLink>
  )
}
