import { isSameDay } from 'date-fns'
import { useEffect, useRef } from 'react'

import { ChatMessage, ChatQuickReply } from '../types'
import { ChatBubble } from './chat-bubble'
import { ChatDateSeparator } from './chat-date-separator'
import {
  ChatBubbleWrapper,
  ChatMessageGroup,
  ChatMessageList as ChatMessageListWrapper,
  ChatMessageSection,
  ChatMessageSender,
} from './chat.style'

type ChatMessageListProps = {
  messages: ChatMessage[]
  onQuickReply?: (reply: ChatQuickReply) => void
}

type MessageGroup = {
  key: string
  showDate: boolean
  messages: ChatMessage[]
}

// Consecutive messages from the same sender on the same day share one label
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
}: ChatMessageListProps) {
  const listRef = useRef<HTMLElement>(null)

  const lastMessageId = messages.at(-1)?.id

  // Keep the latest message in view
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [lastMessageId])

  return (
    <ChatMessageListWrapper ref={listRef}>
      {groupMessages(messages).map((group) => {
        const { direction, senderName, createdAt } = group.messages[0]

        return (
          <ChatMessageSection key={group.key}>
            {group.showDate && <ChatDateSeparator date={createdAt} />}
            <ChatMessageGroup direction={direction}>
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
