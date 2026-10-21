import { format } from 'date-fns'

import { MessageType } from '@/constants/message'
import {
  ChatMessage,
  ChatMessageStatus,
  ChatQuickReply,
} from '@/model/livechat'
import Icon from '@nui/ui/icon'

import { ChatText } from './chat-text'
import {
  ChatBubbleContent,
  ChatBubbleMain,
  ChatBubbleMeta,
  ChatQuickReplyButton,
} from './chat.style'

const statusColors: Record<ChatMessageStatus, string> = {
  pending: 'text-white',
  sent: 'text-white',
  delivered: 'text-white',
  read: 'text-[#51A2FF]',
}

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
  const {
    direction,
    body,
    createdAt,
    status,
    quickReplies,
    type,
    mediaUrl,
    filename,
    isPinned,
  } = message
  const isImage = type === MessageType.IMAGE && !!mediaUrl

  return (
    <ChatBubbleMain $direction={direction}>
      {isImage && (
        <a href={mediaUrl} target="_blank" rel="noreferrer">
          <img
            src={mediaUrl}
            alt={filename || 'Image'}
            className="max-h-60 w-full object-cover"
          />
        </a>
      )}
      {mediaUrl && !isImage && (
        <a
          href={mediaUrl}
          target="_blank"
          rel="noreferrer"
          className="block px-3.5 pt-2.5 text-sm underline"
        >
          {filename || body || 'Attachment'}
        </a>
      )}
      {body && body !== filename && (
        <ChatBubbleContent>
          <ChatText text={body} />
        </ChatBubbleContent>
      )}
      <ChatBubbleMeta $direction={direction}>
        {isPinned && (
          <>
            <Icon icon="lucide-pin" size="2xs" />
            <span className="sr-only">Pinned</span>
          </>
        )}
        {format(new Date(createdAt), 'HH:mm')}
        {direction === 'outgoing' && status && (
          <Icon
            icon={statusIcons[status]}
            size="2xs"
            className={statusColors[status]}
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
