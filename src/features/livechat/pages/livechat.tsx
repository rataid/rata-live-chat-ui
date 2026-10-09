import { useLiveChat } from '@/components/socket'

import { ChatEditor } from '../components/chat-editor'
import { ChatHeader } from '../components/chat-header'
import { ChatMessageList } from '../components/chat-message-list'
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
    sendMessage,
    isLoadingHistory,
    historyError,
    retryHistory,
    hasOlder,
    isLoadingOlder,
    loadOlder,
  } = useLiveChat()

  return (
    <ChatPageWrapper>
      <ChatPageContainer>
        <ChatHeader
          title="Tanam Live Chat"
          subtitle="Klinik Tanam"
          mobileTitle="Klinik TANAM Pakubuwono"
          mobileSubtitle="Live Chat Platform"
        />
        {status !== 'connected' && (
          <ChatStatusBar role="status">{statusText[status]}</ChatStatusBar>
        )}
        <ChatMessageList
          messages={messages}
          isLoading={isLoadingHistory}
          error={historyError}
          onRetry={retryHistory}
          hasOlder={hasOlder}
          isLoadingOlder={isLoadingOlder}
          onLoadOlder={loadOlder}
        />
        <ChatEditor onSend={sendMessage} disabled={status !== 'connected'} />
      </ChatPageContainer>
    </ChatPageWrapper>
  )
}
