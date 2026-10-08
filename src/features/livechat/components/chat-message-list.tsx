import { isSameDay } from 'date-fns'
import { useEffect, useLayoutEffect, useRef } from 'react'

import { ChatMessage, ChatQuickReply } from '../types'
import { ChatBubble } from './chat-bubble'
import { ChatDateSeparator } from './chat-date-separator'
import {
  ChatBubbleWrapper,
  ChatEmpty,
  ChatListNote,
  ChatMessageGroup,
  ChatMessageList as ChatMessageListWrapper,
  ChatMessageSection,
  ChatMessageSender,
} from './chat.style'

type ChatMessageListProps = {
  messages: ChatMessage[]
  onQuickReply?: (reply: ChatQuickReply) => void
  isLoading?: boolean
  error?: boolean
  onRetry?: () => void
  hasOlder?: boolean
  isLoadingOlder?: boolean
  onLoadOlder?: () => void
}

const LOAD_OLDER_THRESHOLD = 80

type MessageGroup = {
  key: string
  showDate: boolean
  messages: ChatMessage[]
}

function groupMessages(messages: ChatMessage[]) {
  return messages.reduce<MessageGroup[]>((groups, message) => {
    const lastGroup = groups.at(-1)
    const lastMessage = lastGroup?.messages.at(-1)

    const isNewDay =
      !lastMessage ||
      !isSameDay(new Date(lastMessage.createdAt), new Date(message.createdAt))

    const isSameSender =
      !!lastMessage &&
      lastMessage.direction === message.direction &&
      lastMessage.senderName === message.senderName

    if (lastGroup && isSameSender && !isNewDay) {
      lastGroup.messages.push(message)
    } else {
      groups.push({ key: message.id, showDate: isNewDay, messages: [message] })
    }

    return groups
  }, [])
}

export function ChatMessageList({
  messages,
  onQuickReply,
  isLoading = false,
  error = false,
  onRetry,
  hasOlder = false,
  isLoadingOlder = false,
  onLoadOlder,
}: ChatMessageListProps) {
  const listRef = useRef<HTMLElement>(null)

  const lastMessageId = messages.at(-1)?.id
  const firstMessageId = messages[0]?.id

  const hasScrolledRef = useRef(false)

  useEffect(() => {
    const list = listRef.current
    if (!list || !lastMessageId) return

    list.scrollTo({
      top: list.scrollHeight,
      behavior: hasScrolledRef.current ? 'smooth' : 'auto',
    })
    hasScrolledRef.current = true
  }, [lastMessageId])

  const heightBeforeLoadRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    const before = heightBeforeLoadRef.current
    if (!list || before === null) return

    list.scrollTop += list.scrollHeight - before
    heightBeforeLoadRef.current = null
  }, [firstMessageId])

  const handleScroll = () => {
    const list = listRef.current
    if (!list || !onLoadOlder || !hasOlder || isLoadingOlder) return

    if (list.scrollTop < LOAD_OLDER_THRESHOLD) {
      heightBeforeLoadRef.current = list.scrollHeight
      onLoadOlder()
    }
  }

  return (
    <ChatMessageListWrapper ref={listRef} onScroll={handleScroll}>
      {isLoadingOlder && (
        <ChatListNote>Loading earlier messages...</ChatListNote>
      )}
      {messages.length === 0 && isLoading && (
        <ChatEmpty>Loading messages...</ChatEmpty>
      )}
      {messages.length === 0 && !isLoading && error && (
        <ChatEmpty>
          Couldn&apos;t load your messages.{' '}
          <button
            type="button"
            className="font-medium text-primary-600 hover:underline"
            onClick={onRetry}
          >
            Try again
          </button>
        </ChatEmpty>
      )}
      {messages.length === 0 && !isLoading && !error && (
        <ChatEmpty>
          Send a message to start chatting with the clinic. Our team will reply
          here.
        </ChatEmpty>
      )}
      {groupMessages(messages).map((group) => {
        const { direction, senderName, createdAt } = group.messages[0]

        return (
          <ChatMessageSection key={group.key}>
            {group.showDate && <ChatDateSeparator date={createdAt} />}
            <ChatMessageGroup $direction={direction}>
              <ChatMessageSender>
                {direction === 'outgoing' ? 'You' : senderName}
              </ChatMessageSender>
              {group.messages.map((message) => (
                <ChatBubbleWrapper key={message.id}>
                  <ChatBubble
                    message={message}
                    quickRepliesDisabled={message.id !== lastMessageId}
                    onQuickReply={onQuickReply}
                  />
                </ChatBubbleWrapper>
              ))}
            </ChatMessageGroup>
          </ChatMessageSection>
        )
      })}
    </ChatMessageListWrapper>
  )
}
