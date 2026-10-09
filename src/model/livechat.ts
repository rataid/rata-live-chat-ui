import {
  MessageDirection,
  MessageStatus,
  MessageType,
} from '@/constants/message'

export type LivechatServerMessage = {
  id: string
  body: string | null
  type: MessageType
  direction: MessageDirection
  status?: MessageStatus
  createdAt: string
  agentId: string | null
}

export type ChatMessageDirection = 'incoming' | 'outgoing'

export type ChatMessageStatus = 'pending' | 'sent' | 'delivered' | 'read'

export type ChatQuickReply = {
  label: string
  value: string
}

export type ChatMessage = {
  id: string
  direction: ChatMessageDirection
  senderName?: string
  body: string
  createdAt: string
  status?: ChatMessageStatus
  quickReplies?: ChatQuickReply[]
}

// GET /livechat/messages, cursor = id of the oldest message already loaded
export type GetLiveChatMessagesParams = {
  cursor?: string
  take?: number
}
