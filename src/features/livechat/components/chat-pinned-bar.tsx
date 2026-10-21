import { ChatMessage } from '@/model/livechat'
import Icon from '@nui/ui/icon'

import { stripChatFormatting } from './chat-text'
import {
  ChatPinnedBar as ChatPinnedBarWrapper,
  ChatPinnedOpen,
  ChatPinnedText,
} from './chat.style'

type ChatPinnedBarProps = {
  message: ChatMessage
  onOpen: () => void
}

// Read-only: only the clinic can pin or unpin
export function ChatPinnedBar({ message, onOpen }: ChatPinnedBarProps) {
  const text =
    stripChatFormatting(message.body) || message.filename || 'Attachment'

  return (
    <ChatPinnedBarWrapper>
      <ChatPinnedOpen type="button" onClick={onOpen}>
        <Icon
          icon="lucide-pin"
          size="xs"
          className="shrink-0 text-primary-600"
        />
        <div className="min-w-0 flex-1">
          <ChatPinnedText>{text}</ChatPinnedText>
        </div>
      </ChatPinnedOpen>
    </ChatPinnedBarWrapper>
  )
}
