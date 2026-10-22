import { useEffect } from 'react'

import { useLiveChat } from '@/components/socket'
import { LIVECHAT_CLINIC_NAME } from '@/constants/livechat'

import { ChatEditor } from '../components/chat-editor'
import { ChatHeader } from '../components/chat-header'
import { ChatMessageList } from '../components/chat-message-list'
import { ChatPinnedBar } from '../components/chat-pinned-bar'
import {
  ChatPageContainer,
  ChatPageWrapper,
  ChatStatusBar,
} from '../components/chat.style'

const statusText = {
  connecting: 'Connecting to the clinic...',
  reconnecting: 'Connection lost. Reconnecting...',
}

export function LiveChatPage() {
  const {
    messages,
    status,
    sendMessageText,
    sendFile,
    sendMessageButton,
    isLoadingHistory,
    historyError,
    retryHistory,
    hasOlder,
    isLoadingOlder,
    loadOlder,
    readMessages,
    pinnedMessage,
  } = useLiveChat()

  const lastIncomingId = messages.findLast(
    (message) => message.direction === 'incoming'
  )?.id

  useEffect(() => {
    if (status === 'connected' && lastIncomingId) readMessages()
  }, [status, lastIncomingId, readMessages])

  return (
    <ChatPageWrapper>
      <ChatPageContainer>
        <ChatHeader
          title="Tanam Live Chat"
          subtitle="Klinik Tanam"
          mobileTitle={LIVECHAT_CLINIC_NAME}
          mobileSubtitle="Live Chat Platform"
        />
        {status !== 'connected' && (
          <ChatStatusBar role="status">{statusText[status]}</ChatStatusBar>
        )}
        {pinnedMessage && (
          <ChatPinnedBar
            message={pinnedMessage}
            // Only works when the message is in the loaded history
            onOpen={() =>
              document
                .querySelector(`[data-message-id="${pinnedMessage.id}"]`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          />
        )}
        <ChatMessageList
          messages={messages}
          isLoading={isLoadingHistory}
          error={historyError}
          onRetry={retryHistory}
          hasOlder={hasOlder}
          isLoadingOlder={isLoadingOlder}
          onLoadOlder={loadOlder}
          onQuickReply={(reply) => sendMessageButton(reply.label)}
          quickRepliesDisabled={status !== 'connected'}
        />
        <ChatEditor
          onSend={sendMessageText}
          onSendFile={sendFile}
          disabled={status !== 'connected'}
        />
      </ChatPageContainer>
    </ChatPageWrapper>
  )
}
