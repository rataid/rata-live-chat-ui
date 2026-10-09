import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import {
  LIVECHAT_MESSAGES_PAGE_SIZE,
  getLiveChatMessages,
} from '@/api/livechat/messages'
import { getToken, isTokenValid, removeToken } from '@/components/auth'
import {
  MessageDirection,
  MessageStatus,
  MessageType,
} from '@/constants/message'
import {
  ChatMessage,
  ChatMessageStatus,
  LivechatServerMessage,
} from '@/types/livechat'
import { connectSocket, livechatSocket } from '@libs/socket-client'
import { showToast } from '@nui/ui/toast'
import { randomString } from '@utils'

import { sendLivechatMessage } from './livechat-utils'
import { LivechatReceivedPayload, LivechatSentAck } from './types'

export type LiveChatStatus = 'connecting' | 'connected' | 'reconnecting'

const CLINIC_NAME = 'Klinik TANAM Pakubuwono'

const statusMap: Partial<Record<MessageStatus, ChatMessageStatus>> = {
  [MessageStatus.PENDING]: 'pending',
  [MessageStatus.SENT]: 'sent',
  [MessageStatus.DELIVERED]: 'delivered',
  [MessageStatus.READ]: 'read',
}

const isLocalId = (id: string) => id.startsWith('local-')

function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]) {
  const ids = new Set(current.map((message) => message.id))
  const added = incoming.filter((message) => !ids.has(message.id))

  if (added.length === 0) return current

  return [...current, ...added].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
}

function toChatMessage(message: LivechatServerMessage): ChatMessage {
  const fromClinic = message.direction === MessageDirection.OUTGOING

  return {
    id: message.id,
    direction: fromClinic ? 'incoming' : 'outgoing',
    senderName: fromClinic ? CLINIC_NAME : undefined,
    body:
      message.type === MessageType.TEXT
        ? message.body ?? ''
        : message.body || 'This message type is not supported yet.',
    createdAt: message.createdAt,
    status: fromClinic
      ? undefined
      : (message.status && statusMap[message.status]) || 'sent',
  }
}

type LiveChatContextValue = {
  messages: ChatMessage[]
  status: LiveChatStatus
  sendMessage: (body: string) => void
  isLoadingHistory: boolean
  historyError: boolean
  retryHistory: () => void
  hasOlder: boolean
  isLoadingOlder: boolean
  loadOlder: () => void
}

const LiveChatContext = createContext<LiveChatContextValue | null>(null)

export function LiveChatProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const pendingIdsRef = useRef<string[]>([])

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<LiveChatStatus>('connecting')

  // History (GET /livechat/messages, newest first, cursor = oldest id)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [isLoadingOlder, setIsLoadingOlder] = useState(false)
  const [hasOlder, setHasOlder] = useState(false)
  const [historyError, setHistoryError] = useState(false)

  const addFromServer = useCallback((items: LivechatServerMessage[]) => {
    setMessages((prev) => mergeMessages(prev, items.map(toChatMessage)))
  }, [])

  const loadLatest = useCallback(async () => {
    setIsLoadingHistory(true)
    setHistoryError(false)

    try {
      const items = await getLiveChatMessages()
      addFromServer(items)
      setHasOlder(items.length === LIVECHAT_MESSAGES_PAGE_SIZE)
    } catch {
      setHistoryError(true)
    } finally {
      setIsLoadingHistory(false)
    }
  }, [addFromServer])

  const loadOlder = useCallback(async () => {
    const oldest = messages.find((message) => !isLocalId(message.id))
    if (!oldest || !hasOlder || isLoadingOlder) return

    setIsLoadingOlder(true)

    try {
      const items = await getLiveChatMessages({ cursor: oldest.id })
      addFromServer(items)
      setHasOlder(items.length === LIVECHAT_MESSAGES_PAGE_SIZE)
    } catch {
      showToast({
        type: 'error',
        title: 'Failed to Load Messages',
        message: 'Please try again in a moment.',
      })
    } finally {
      setIsLoadingOlder(false)
    }
  }, [addFromServer, hasOlder, isLoadingOlder, messages])

  useEffect(() => {
    const token = getToken()

    const signInAgain = () => {
      removeToken()
      showToast({
        type: 'error',
        title: 'Session Expired',
        message: 'Please log in again to continue.',
      })
      navigate(`/login?from=${encodeURIComponent(window.location.pathname)}`, {
        replace: true,
      })
    }

    if (!token || !isTokenValid(token)) {
      signInAgain()
      return undefined
    }

    loadLatest()

    const socket = livechatSocket

    const onConnect = () => setStatus('connected')

    const onDisconnect = (reason: string) => {
      if (reason === 'io server disconnect') {
        signInAgain()
        return
      }
      setStatus('reconnecting')
    }

    const onConnectError = () => {
      if (!isTokenValid(getToken())) {
        socket.disconnect()
        signInAgain()
        return
      }
      setStatus('reconnecting')
    }

    const onSent = (ack: LivechatSentAck) => {
      const tempId = pendingIdsRef.current.shift()
      if (!tempId) return

      setMessages((prev) =>
        prev.map((message) =>
          message.id === tempId
            ? { ...message, id: ack.id, status: 'sent' }
            : message
        )
      )
    }

    const onReceived = ({ message }: LivechatReceivedPayload) =>
      addFromServer([message])

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onConnectError)
    socket.on('message.sent', onSent)
    socket.on('message.received', onReceived)

    connectSocket(socket, token)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onConnectError)
      socket.off('message.sent', onSent)
      socket.off('message.received', onReceived)
      socket.disconnect()
      pendingIdsRef.current = []
    }
  }, [addFromServer, loadLatest, navigate])

  const sendMessage = useCallback((body: string) => {
    const socket = livechatSocket
    if (!socket.connected) return

    const tempId = `local-${randomString(12)}`
    pendingIdsRef.current.push(tempId)

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        direction: 'outgoing',
        body,
        createdAt: new Date().toISOString(),
        status: 'pending',
      },
    ])

    sendLivechatMessage({ body })
  }, [])

  const value = useMemo(
    () => ({
      messages,
      status,
      sendMessage,
      isLoadingHistory,
      historyError,
      retryHistory: loadLatest,
      hasOlder,
      isLoadingOlder,
      loadOlder,
    }),
    [
      messages,
      status,
      sendMessage,
      isLoadingHistory,
      historyError,
      loadLatest,
      hasOlder,
      isLoadingOlder,
      loadOlder,
    ]
  )

  return (
    <LiveChatContext.Provider value={value}>
      {children}
    </LiveChatContext.Provider>
  )
}

export function useLiveChat() {
  const context = useContext(LiveChatContext)
  if (!context) {
    throw new Error('useLiveChat must be used inside LiveChatProvider')
  }
  return context
}
