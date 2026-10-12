import { livechatSocket } from '@libs/socket-client'

import { ChatRoomReadMessagesPayload, LivechatSendPayload } from './types'

export function sendLivechatMessage(data: LivechatSendPayload) {
  livechatSocket.emit('message.send', data)
}

export function readLivechatMessages(data: ChatRoomReadMessagesPayload) {
  livechatSocket.emit('chatRoom.readMessages', data)
}
