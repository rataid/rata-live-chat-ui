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
