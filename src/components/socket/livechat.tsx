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
import { uploadLivechatFile } from '@/api/livechat/upload'
import { getToken, isTokenValid, removeToken } from '@/components/auth'
import { LIVECHAT_CLINIC_NAME } from '@/constants/livechat'
import {
  MessageDirection,
  MessageStatus,
  MessageType,
} from '@/constants/message'
import { isNotificationMuted } from '@/features/livechat/notification-preference'
import { isSessionExpired, refreshAccessToken } from '@/libs/session'
import {
  ChatMessage,
  ChatMessageStatus,
  LivechatServerMessage,
} from '@/model/livechat'
import { connectSocket, livechatSocket } from '@libs/socket-client'
import { showToast } from '@nui/ui/toast'
import { randomString } from '@utils'

import { readLivechatMessages, sendLivechatMessage } from './livechat-utils'
import {
  LivechatReceivedPayload,
  LivechatSendPayload,
  LivechatSentAck,
  LivechatStatusChangePayload,
} from './types'

export type LiveChatStatus = 'connecting' | 'connected' | 'reconnecting'

const statusMap: Partial<Record<MessageStatus, ChatMessageStatus>> = {
  [MessageStatus.PENDING]: 'pending',
  [MessageStatus.SENT]: 'sent',
  [MessageStatus.DELIVERED]: 'delivered',
  [MessageStatus.READ]: 'read',
}

const isLocalId = (id: string) => id.startsWith('local-')

function isReadingLiveChat() {
  return window.location.pathname.startsWith('/livechat') && !document.hidden
}

// Chrome keeps requireInteraction notifications open. Firefox and Safari
// close that popup on their own, so those browsers also get an in-page notice.
function systemNotificationStaysOpen() {
  const ua = navigator.userAgent
  return (
    /Chrome|Chromium|Edg|OPR|SamsungBrowser/.test(ua) &&
    !/Firefox|FxiOS/.test(ua)
  )
}

// In-page toast only (not the OS notification shade).
const IN_APP_TOAST_MS = 5000

function notifyClinicMessage(message: LivechatServerMessage) {
  if (message.direction !== MessageDirection.OUTGOING) return
  if (isNotificationMuted()) return
  if (isReadingLiveChat()) return
  // Backgrounded / closed tab: Web Push handles delivery. Showing a local
  // notification here doubles with the push on iOS PWA.
  if (document.hidden) return

  const body = message.body || 'You have a new message.'

  // Visible non-livechat page: local system notification while socket is alive.
  if (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'granted'
  ) {
    void showSystemNotification(body, message.id)
  }

  if (systemNotificationStaysOpen()) return

  showToast(
    { type: 'info', title: LIVECHAT_CLINIC_NAME, message: body },
    { autoClose: IN_APP_TOAST_MS, closeButton: true }
  )
}

async function showSystemNotification(body: string, messageId: string) {
  const tag = `livechat-${messageId}`
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready
      // Keep OS shade notifications until the user dismisses/clicks them.
      // `renotify` exists in browsers but is missing from our TS DOM lib.
      await registration.showNotification('Smile Hub', {
        body,
        tag,
        icon: '/icons/icon-192.png',
        requireInteraction: true,
        silent: false,
        renotify: true,
      } as NotificationOptions)
      return true
    }
  } catch {
    // Chrome Android rejects `new Notification()`. Fall through to that.
  }

  try {
    const notification = new Notification('Smile Hub', {
      body,
      tag,
      requireInteraction: true,
    })
    notification.onclick = () => {
      window.focus()
      notification.close()
    }
    return true
  } catch {
    return false
  }
}

function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]) {
  const ids = new Set(current.map((message) => message.id))
  const added = incoming.filter((message) => !ids.has(message.id))

  if (added.length === 0) return current

  return [...current, ...added].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
}

function messageTypeFromFile(file: File) {
  if (file.type.startsWith('image/')) return MessageType.IMAGE
  if (file.type.startsWith('video/')) return MessageType.VIDEO
  if (file.type.startsWith('audio/')) return MessageType.AUDIO
  return MessageType.DOCUMENT
}

function toChatMessage(message: LivechatServerMessage): ChatMessage {
  const fromClinic = message.direction === MessageDirection.OUTGOING
  const mediaUrl = message.metadata?.mediaUrl
  const filename = message.metadata?.document?.filename

  // BUTTON: the question is the bubble text, the buttons become quick replies
  // A patient's own BUTTON reply has no buttons and shows as plain text
  const button = message.metadata?.button
  if (message.type === MessageType.BUTTON && button?.buttons?.length) {
    return {
      id: message.id,
      direction: fromClinic ? 'incoming' : 'outgoing',
      senderName: fromClinic ? LIVECHAT_CLINIC_NAME : undefined,
      body: button.body ?? message.body ?? '',
      createdAt: message.createdAt,
      quickReplies: button.buttons.map(({ id, text }) => ({
        label: text,
        value: id,
      })),
    }
  }

  return {
    id: message.id,
    direction: fromClinic ? 'incoming' : 'outgoing',
    senderName: fromClinic ? LIVECHAT_CLINIC_NAME : undefined,
    type: message.type,
    mediaUrl,
    filename,
    body:
      message.type === MessageType.TEXT
        ? message.body ?? ''
        : message.body ||
          (mediaUrl ? '' : 'This message type is not supported yet.'),
    createdAt: message.createdAt,
    status: fromClinic
      ? undefined
      : (message.status && statusMap[message.status]) || 'sent',
  }
}

type LiveChatContextValue = {
  messages: ChatMessage[]
  status: LiveChatStatus
  sendMessageText: (body: string) => void
  sendFile: (file: File) => Promise<void>
  // Reply by tapping a button of the clinic's BUTTON message
  sendMessageButton: (text: string) => void
  isLoadingHistory: boolean
  historyError: boolean
  retryHistory: () => void
  hasOlder: boolean
  isLoadingOlder: boolean
  loadOlder: () => void
  // Marks the clinic's messages as read (chatRoom.readMessages)
  readMessages: () => void
}

const LiveChatContext = createContext<LiveChatContextValue | null>(null)

export function LiveChatProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const pendingIdsRef = useRef<string[]>([])

  // The patient has one chat room; its id comes with every message/ack
  const chatRoomIdRef = useRef<string>()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<LiveChatStatus>('connecting')

  // History (GET /livechat/messages, newest first, cursor = oldest id)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [isLoadingOlder, setIsLoadingOlder] = useState(false)
  const [hasOlder, setHasOlder] = useState(false)
  const [historyError, setHistoryError] = useState(false)

  const addFromServer = useCallback((items: LivechatServerMessage[]) => {
    if (items[0]?.chatRoomId) chatRoomIdRef.current = items[0].chatRoomId
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
    if (!('serviceWorker' in navigator)) return
    void navigator.serviceWorker
      .register('/livechat-notification-sw.js')
      .catch(() => undefined)
  }, [])

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

    let active = true
    let recovering = false
    let retryTimer: ReturnType<typeof setTimeout> | undefined
    const recover = () => {
      if (!active || recovering) return
      recovering = true
      setStatus('reconnecting')
      void refreshAccessToken(true)
        .then((accessToken) => {
          if (active) connectSocket(socket, accessToken)
        })
        .catch((error) => {
          if (!active) return
          if (isSessionExpired(error) || !getToken()) signInAgain()
          else retryTimer = setTimeout(recover, 5000)
        })
        .finally(() => {
          recovering = false
        })
    }
    const onConnect = () => setStatus('connected')
    const onDisconnect = (reason: string) => {
      setStatus('reconnecting')
      if (reason === 'io server disconnect') recover()
    }
    const onConnectError = () => {
      setStatus('reconnecting')
      if (!isTokenValid(getToken())) recover()
    }

    const onSent = (ack: LivechatSentAck) => {
      chatRoomIdRef.current = ack.chatRoomId

      const tempId = pendingIdsRef.current.shift()
      if (!tempId) return

      setMessages((prev) =>
        prev.map((message) =>
          message.id === tempId
            ? {
                ...message,
                id: ack.id,
                status: statusMap[ack.status] ?? 'sent',
              }
            : message
        )
      )
    }

    const onReceived = ({ message, chatRoom }: LivechatReceivedPayload) => {
      chatRoomIdRef.current = chatRoom.id
      addFromServer([message])
      notifyClinicMessage(message)
    }

    // Status of the patient's own messages (sent → delivered → read)
    const onStatusChange = ({
      message,
      chatRoom,
    }: LivechatStatusChangePayload) => {
      chatRoomIdRef.current = chatRoom.id
      const next = toChatMessage(message)

      setMessages((prev) =>
        prev.map((item) =>
          item.id === next.id ? { ...item, status: next.status } : item
        )
      )
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onConnectError)
    socket.on('message.sent', onSent)
    socket.on('message.received', onReceived)
    socket.on('message.statusChange', onStatusChange)

    connectSocket(socket, token)

    return () => {
      active = false
      clearTimeout(retryTimer)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onConnectError)
      socket.off('message.sent', onSent)
      socket.off('message.received', onReceived)
      socket.off('message.statusChange', onStatusChange)
      socket.disconnect()
      pendingIdsRef.current = []
    }
  }, [addFromServer, loadLatest, navigate])

  // Shows the message right away; message.sent only confirms it
  const sendOptimistic = useCallback(
    (body: string, payload: LivechatSendPayload) => {
      if (!livechatSocket.connected) return

      const tempId = `local-${randomString(12)}`
      pendingIdsRef.current.push(tempId)

      setMessages((prev) => [
        ...prev,
        {
          id: tempId,
          direction: 'outgoing',
          // BUTTON for a tapped quick reply; it closes the buttons above it
          type: payload.type,
          body,
          createdAt: new Date().toISOString(),
          // Until message.sent arrives with the status the backend stored
          status: 'sent',
        },
      ])

      sendLivechatMessage(payload)
    },
    []
  )

  const sendMessageText = useCallback(
    (body: string) =>
      sendOptimistic(body, { type: MessageType.TEXT, text: { body } }),
    [sendOptimistic]
  )

  const sendMessageButton = useCallback(
    (text: string) =>
      sendOptimistic(text, { type: MessageType.BUTTON, button: { text } }),
    [sendOptimistic]
  )

  const readMessages = useCallback(() => {
    const id = chatRoomIdRef.current
    if (!id || !livechatSocket.connected) return

    readLivechatMessages({ id })
  }, [])

  const sendFile = useCallback(async (file: File) => {
    const socket = livechatSocket
    if (!socket.connected) return

    const tempId = `local-${randomString(12)}`
    const type = messageTypeFromFile(file)
    const localUrl = URL.createObjectURL(file)

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        direction: 'outgoing',
        type,
        mediaUrl: localUrl,
        filename: file.name,
        body: '',
        createdAt: new Date().toISOString(),
        status: 'pending',
      },
    ])

    try {
      const asset = await uploadLivechatFile(file)
      pendingIdsRef.current.push(tempId)
      sendLivechatMessage({
        type,
        mediaKey: asset.id,
        filename: asset.name || file.name,
      })
    } catch {
      setMessages((prev) => prev.filter((message) => message.id !== tempId))
      URL.revokeObjectURL(localUrl)
      showToast({
        type: 'error',
        title: 'Upload Failed',
        message: 'The file could not be sent. Please try again.',
      })
    }
  }, [])

  const value = useMemo(
    () => ({
      messages,
      status,
      sendMessageText,
      sendFile,
      sendMessageButton,
      isLoadingHistory,
      historyError,
      retryHistory: loadLatest,
      hasOlder,
      isLoadingOlder,
      loadOlder,
      readMessages,
    }),
    [
      messages,
      status,
      sendMessageText,
      sendFile,
      sendMessageButton,
      isLoadingHistory,
      historyError,
      loadLatest,
      hasOlder,
      isLoadingOlder,
      loadOlder,
      readMessages,
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
