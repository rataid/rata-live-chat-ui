import { MessageStatus, MessageType } from '@/constants/message'
import { LivechatServerMessage } from '@/model/livechat'
import { Paginated } from '@/model/shared/pagination'

type LivechatSendTextPayload = {
  type: MessageType.TEXT
  text: { body: string }
}

type LivechatSendMediaPayload = {
  type: MessageType
  mediaKey: string
  filename?: string
}

type LivechatSendButtonPayload = {
  type: MessageType.BUTTON
  button: { text: string }
}

export type LivechatSendPayload =
  | LivechatSendTextPayload
  | LivechatSendMediaPayload
  | LivechatSendButtonPayload

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

export type MessageFetchPinnedPayload = { chatRoomId: string }

export type MessageFetchPinnedDonePayload = Paginated<LivechatServerMessage>

export type MessagePinnedPayload = LivechatReceivedPayload

export type LivechatServerEvents = {
  'message.sent': (ack: LivechatSentAck) => void
  'message.received': (payload: LivechatReceivedPayload) => void
  'message.statusChange': (payload: LivechatStatusChangePayload) => void
  'message.fetchPinnedDone': (payload: MessageFetchPinnedDonePayload) => void
  'message.pinned': (payload: MessagePinnedPayload) => void
}

// Events the client emits (socket.emit)
export type LivechatClientEvents = {
  'message.send': (data: LivechatSendPayload) => void
  'chatRoom.readMessages': (data: ChatRoomReadMessagesPayload) => void
  'message.fetchPinned': (data: MessageFetchPinnedPayload) => void
}
