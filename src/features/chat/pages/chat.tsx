import { useState } from 'react'

import { randomString } from '@utils'

import { ChatEditor } from '../components/chat-editor'
import { ChatHeader } from '../components/chat-header'
import { ChatMessageList } from '../components/chat-message-list'
import { ChatPageContainer, ChatPageWrapper } from '../components/chat.style'
import { DUMMY_CHAT_MESSAGES } from '../dummy'
import { ChatMessage } from '../types'

export function ChatPage() {
  // @todo: load and send messages through the backend / socket
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_CHAT_MESSAGES)

  const sendMessage = (body: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: randomString(12),
        direction: 'outgoing',
        body,
        createdAt: new Date().toISOString(),
        status: 'sent',
      },
    ])
  }

  return (
    <ChatPageWrapper>
      <ChatPageContainer>
        <ChatHeader title="Tanam Live Chat" subtitle="Klinik Tanam" />
        <ChatMessageList
          messages={messages}
          onQuickReply={(reply) => sendMessage(reply.label)}
        />
        <ChatEditor onSend={sendMessage} />
      </ChatPageContainer>
    </ChatPageWrapper>
  )
}
