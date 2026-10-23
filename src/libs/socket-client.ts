import { Socket, io } from 'socket.io-client'

import { getToken } from '@/components/auth/helpers'
import {
  LivechatClientEvents,
  LivechatServerEvents,
} from '@/components/socket/types'

export const SOCKET_URL = import.meta.env.VITE_API_ENDPOINT

const createSocket = (namespace: string) =>
  io(`${SOCKET_URL}${namespace}`, {
    transports: ['websocket'],
    autoConnect: false,
  })

export const livechatSocket: Socket<
  LivechatServerEvents,
  LivechatClientEvents
> = createSocket('/livechat')

const sockets = [livechatSocket]

export function connectSocket(socket: Socket, token: string) {
  if (!token) return
  socket.auth = (callback) => callback({ token: getToken() })
  if (!socket.connected) socket.connect()
}

// On logout, so the next account doesn't reuse the old connection
export function disconnectSockets() {
  sockets.forEach((socket) => socket.disconnect())
}
