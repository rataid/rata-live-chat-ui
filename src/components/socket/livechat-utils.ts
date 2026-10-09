import { LivechatSendPayload } from './types'
import { livechatSocket } from '@libs/socket-client'

export function sendLivechatMessage(data: LivechatSendPayload) {
  livechatSocket.emit('message.send', data)
}
