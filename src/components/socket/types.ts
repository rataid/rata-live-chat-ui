import { MessageStatus, MessageType } from '@/constants/message'
import { LivechatServerMessage } from '@/model/livechat'

type LivechatSendTextPayload = {
  type: MessageType.TEXT
  text: { body: string }
}

export type LivechatSendPayload = LivechatSendTextPayload

export type LivechatSentAck = {
  id: string
  chatRoomId: string
  status: MessageStatus
}

export type LivechatReceivedPayload = {
  message: LivechatServerMessage
  chatRoom: { id: string }
}

export type LivechatStatusChangePayload = LivechatReceivedPayload

export type ChatRoomReadMessagesPayload = { id: string }

export type LivechatServerEvents = {
  'message.sent': (ack: LivechatSentAck) => void
  'message.received': (payload: LivechatReceivedPayload) => void
  'message.statusChange': (payload: LivechatStatusChangePayload) => void
}

// Events the client emits (socket.emit)
export type LivechatClientEvents = {
  'message.send': (data: LivechatSendPayload) => void
  'chatRoom.readMessages': (data: ChatRoomReadMessagesPayload) => void
}
