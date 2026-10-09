import { format } from 'date-fns'

import Icon from '@nui/ui/icon'

import { ChatMessage, ChatMessageStatus, ChatQuickReply } from '@/types/livechat'
import {
  ChatBubbleContent,
  ChatBubbleMain,
  ChatBubbleMeta,
  ChatQuickReplyButton,
} from './chat.style'

const statusIcons: Record<ChatMessageStatus, string> = {
  pending: 'lucide-clock',
  sent: 'lucide-check',
  delivered: 'lucide-check-check',
  read: 'lucide-check-check',
}

type ChatBubbleProps = {
  message: ChatMessage
  quickRepliesDisabled?: boolean
  onQuickReply?: (reply: ChatQuickReply) => void
}

export function ChatBubble({
  message,
  quickRepliesDisabled = false,
  onQuickReply,
}: ChatBubbleProps) {
  const { direction, body, createdAt, status, quickReplies } = message

  return (
    <ChatBubbleMain $direction={direction}>
      <ChatBubbleContent>{body}</ChatBubbleContent>
      <ChatBubbleMeta $direction={direction}>
        {format(new Date(createdAt), 'HH:mm')}
        {direction === 'outgoing' && status && (
          <Icon
            icon={statusIcons[status]}
            size="2xs"
            className={status === 'read' ? 'text-white' : undefined}
          />
        )}
      </ChatBubbleMeta>
      {quickReplies?.map((reply) => (
        <ChatQuickReplyButton
          key={reply.value}
          type="button"
          disabled={quickRepliesDisabled}
          onClick={() => onQuickReply?.(reply)}
        >
          {reply.label}
        </ChatQuickReplyButton>
      ))}
    </ChatBubbleMain>
  )
}
