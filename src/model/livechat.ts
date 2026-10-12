import {
  MessageDirection,
  MessageStatus,
  MessageType,
} from '@/constants/message'

export type LivechatMessageReaction = {
  id: string
  from: string
  emoji: string
}

export type LivechatMessageMetadata = {
  type?: string
  text?: {
    body: string
    preview_url?: boolean
  }
  // Event messages (type EVENT): who did what, e.g. agent assigned
  event?: number
  actor?: {
    id: string
    type: number
    name?: string | null
  }
  data?: {
    new?: unknown
    old?: unknown
  }
}

export type LivechatServerMessage = {
  id: string
  ref: string
  createdAt: string
  deletedAt: string | null
  deletionType: number | null
  type: MessageType
  body: string | null
  caption: string | null
  isVoice: boolean
  metadata: LivechatMessageMetadata | null
  reactions: LivechatMessageReaction[]
  direction: MessageDirection
  responseTime: number
  status: MessageStatus
  failedReason: string | null
  deliveredAt: string | null
  readAt: string | null
  isPinned: boolean
  pinnedAt: string | null
  mediaAssetId: string | null
  templateId: string | null
  externalId: string | null
  externalTimestamp: number | null
  context: unknown | null
  agentId: string | null
  chatRoomId: string
  conversationId: string
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
