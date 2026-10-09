import { livechatSocket } from '@libs/socket-client'

import { LivechatSendPayload } from './types'

export function sendLivechatMessage(data: LivechatSendPayload) {
  livechatSocket.emit('message.send', data)
}
