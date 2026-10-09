import { Socket, io } from 'socket.io-client'

export const SOCKET_URL = import.meta.env.VITE_API_ENDPOINT

const createSocket = (namespace: string): Socket =>
  io(`${SOCKET_URL}${namespace}`, {
    transports: ['websocket'],
    autoConnect: false,
  })

export const livechatSocket = createSocket('/livechat')

const sockets = [livechatSocket]

export function connectSocket(socket: Socket, token: string) {
  socket.auth = { token }
  if (!socket.connected) socket.connect()
}

// On logout, so the next account doesn't reuse the old connection
export function disconnectSockets() {
  sockets.forEach((socket) => socket.disconnect())
}
