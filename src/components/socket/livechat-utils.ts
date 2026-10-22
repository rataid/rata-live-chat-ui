import { livechatSocket } from '@libs/socket-client'

import {
  ChatRoomReadMessagesPayload,
  LivechatSendPayload,
  MessageFetchPinnedPayload,
} from './types'

export function sendLivechatMessage(data: LivechatSendPayload) {
  livechatSocket.emit('message.send', data)
}

export function readLivechatMessages(data: ChatRoomReadMessagesPayload) {
  livechatSocket.emit('chatRoom.readMessages', data)
}

export function fetchPinnedLivechatMessages(data: MessageFetchPinnedPayload) {
  livechatSocket.emit('message.fetchPinned', data)
}
