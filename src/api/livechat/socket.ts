import { Socket, io } from 'socket.io-client'

import {
  MessageDirection,
  MessageStatus,
  MessageType,
} from '@/constants/message'

export const LIVECHAT_SOCKET_URL = `${
  import.meta.env.VITE_API_ENDPOINT
}/livechat`

export const LIVECHAT_EVENTS = {
  send: 'message.send',
  sent: 'message.sent',
  received: 'message.received',
} as const

export type LivechatServerMessage = {
  id: string
  body: string | null
  type: MessageType
  direction: MessageDirection
  status?: MessageStatus
  createdAt: string
  agentId: string | null
}

export type LivechatSendPayload = { body: string }

export type LivechatSentAck = { id: string; chatRoomId: string }

export type LivechatReceivedPayload = {
  message: LivechatServerMessage
  chatRoom: { id: string }
}

export type LivechatSocket = Socket

export function createLivechatSocket(token: string): LivechatSocket {
  return io(LIVECHAT_SOCKET_URL, {
    transports: ['websocket'],
    auth: { token },
  })
}
