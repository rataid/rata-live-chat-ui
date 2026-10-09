import { LivechatServerMessage } from '@/model/livechat'

export type LivechatSendPayload = { body: string }

export type LivechatSentAck = { id: string; chatRoomId: string }

export type LivechatReceivedPayload = {
  message: LivechatServerMessage
  chatRoom: { id: string }
}

export type LivechatServerEvents = {
  'message.sent': (ack: LivechatSentAck) => void
  'message.received': (payload: LivechatReceivedPayload) => void
}

// Events the client emits (socket.emit)
export type LivechatClientEvents = {
  'message.send': (data: LivechatSendPayload) => void
}
