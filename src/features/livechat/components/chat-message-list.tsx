import { isSameDay } from 'date-fns'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { MessageType } from '@/constants/message'
import { ChatMessage, ChatQuickReply } from '@/model/livechat'
import Icon from '@nui/ui/icon'

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
  ChatNewMessagesButton,
} from './chat.style'

type ChatMessageListProps = {
  messages: ChatMessage[]
  onQuickReply?: (reply: ChatQuickReply) => void
  // e.g. while the socket is disconnected
  quickRepliesDisabled?: boolean
  isLoading?: boolean
  error?: boolean
  onRetry?: () => void
  hasOlder?: boolean
  isLoadingOlder?: boolean
  onLoadOlder?: () => void
}

const LOAD_OLDER_THRESHOLD = 80

// Within this distance from the bottom, new messages scroll into view
const AT_BOTTOM_THRESHOLD = 80

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
  quickRepliesDisabled = false,
  isLoading = false,
  error = false,
  onRetry,
  hasOlder = false,
  isLoadingOlder = false,
  onLoadOlder,
}: ChatMessageListProps) {
  const listRef = useRef<HTMLElement>(null)

  const lastMessageId = messages.at(-1)?.id

  // Quick replies close once the patient answers with a button (a BUTTON
  // message from the patient). Typing a text reply keeps them open.
  const lastButtonReplyAt = messages.findLastIndex(
    (message) =>
      message.direction === 'outgoing' && message.type === MessageType.BUTTON
  )
  const messageIndex = new Map(messages.map(({ id }, index) => [id, index]))
  const isAnswered = (id: string) =>
    (messageIndex.get(id) ?? Infinity) < lastButtonReplyAt
  const firstMessageId = messages[0]?.id

  const hasScrolledRef = useRef(false)

  const heightBeforeLoadRef = useRef<number | null>(null)

  const isAtBottomRef = useRef(true)

  const [newCount, setNewCount] = useState(0)

  const knownIdsRef = useRef(new Set<string>())
  const animatedIdsRef = useRef(new Set<string>())

  const shouldAnimate = (message: ChatMessage) => {
    if (animatedIdsRef.current.has(message.id)) return true

    const isNew =
      hasScrolledRef.current &&
      heightBeforeLoadRef.current === null &&
      !knownIdsRef.current.has(message.id) &&
      message.direction === 'incoming'

    if (isNew) animatedIdsRef.current.add(message.id)
    return isNew
  }

  useEffect(() => {
    messages.forEach(({ id }) => knownIdsRef.current.add(id))
  }, [messages])

  const scrollToBottom = (behavior: ScrollBehavior) => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior })
  }

  useEffect(() => {
    const list = listRef.current
    const lastMessage = messages.at(-1)
    if (!list || !lastMessage) return

    // First load: jump to the latest message
    if (!hasScrolledRef.current) {
      scrollToBottom('auto')
      hasScrolledRef.current = true
    } else if (lastMessage.direction === 'outgoing' || isAtBottomRef.current) {
      // The patient's own message, or they're already following the chat
      scrollToBottom('smooth')
    } else {
      // Reading older messages: don't pull them down, show the pill instead
      setNewCount((count) => count + 1)
    }

    // Only reacts to a new last message, not to status updates
  }, [lastMessageId])

  useLayoutEffect(() => {
    const list = listRef.current
    const before = heightBeforeLoadRef.current
    if (!list || before === null) return

    list.scrollTop += list.scrollHeight - before
    heightBeforeLoadRef.current = null
  }, [firstMessageId])

  const handleScroll = () => {
    const list = listRef.current
    if (!list) return

    isAtBottomRef.current =
      list.scrollHeight - list.scrollTop - list.clientHeight <
      AT_BOTTOM_THRESHOLD

    if (isAtBottomRef.current && newCount > 0) setNewCount(0)

    if (!onLoadOlder || !hasOlder || isLoadingOlder) return

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
                <ChatBubbleWrapper
                  key={message.id}
                  $animate={shouldAnimate(message)}
                  // Target of "scroll to pinned message"
                  data-message-id={message.id}
                >
                  <ChatBubble
                    message={message}
                    quickRepliesDisabled={
                      quickRepliesDisabled || isAnswered(message.id)
                    }
                    onQuickReply={onQuickReply}
                  />
                </ChatBubbleWrapper>
              ))}
            </ChatMessageGroup>
          </ChatMessageSection>
        )
      })}
      {newCount > 0 && (
        <ChatNewMessagesButton
          type="button"
          onClick={() => {
            scrollToBottom('smooth')
            setNewCount(0)
          }}
        >
          {newCount === 1 ? '1 new message' : `${newCount} new messages`}
          <Icon icon="lucide-arrow-down" size="2xs" />
        </ChatNewMessagesButton>
      )}
    </ChatMessageListWrapper>
  )
}
