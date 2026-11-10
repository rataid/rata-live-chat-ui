import { format } from 'date-fns'
import { useState } from 'react'

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
  read: 'text-white',
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
  onImageClick?: () => void
}

export function ChatBubble({
  message,
  quickRepliesDisabled = false,
  onQuickReply,
  onImageClick,
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
  } = message
  const isImage = type === MessageType.IMAGE && !!mediaUrl
  const [portrait, setPortrait] = useState(false)

  return (
    <ChatBubbleMain $direction={direction}>
      {isImage && (
        <button type="button" className="block w-full" onClick={onImageClick}>
          <img
            src={mediaUrl}
            alt={filename || 'Image'}
            onLoad={({ currentTarget }) =>
              setPortrait(
                currentTarget.naturalHeight > currentTarget.naturalWidth
              )
            }
            className={
              portrait
                ? 'mx-auto block h-60 w-auto min-w-[12rem] max-w-full object-cover'
                : 'block max-h-60 w-full min-w-[15rem] object-cover'
            }
          />
        </button>
      )}
      {mediaUrl && !isImage && (
        <a
          href={mediaUrl}
          target="_blank"
          rel="noreferrer"
          className="block px-3.5 pt-2.5 text-sm underline"
        >
          {filename || body || 'Lampiran'}
        </a>
      )}
      {body && body !== filename && (
        <ChatBubbleContent>
          <ChatText text={body} />
        </ChatBubbleContent>
      )}
      <ChatBubbleMeta $direction={direction}>
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
