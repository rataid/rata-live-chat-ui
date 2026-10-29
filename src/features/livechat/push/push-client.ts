import axiosInstance from '@/api/axiosInstance'
import { getToken } from '@/components/auth/helpers'

const WORKER = '/livechat-notification-sw.js'
let managedSession: string | null = null
let pending: Promise<void> | null = null

export function supportsWebPush() {
  return (
    window.isSecureContext &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    typeof Notification !== 'undefined'
  )
}

export async function prepareWebPush() {
  if (!supportsWebPush()) return
  await navigator.serviceWorker.register(WORKER, { scope: '/' })
}

export function isWebPushSubscribed() {
  // Access-token refresh must not change the subscription's session identity.
  return managedSession !== null && managedSession === sessionIdentity()
}
function sessionIdentity() {
  const token = getToken()
  if (!token) return null
  try {
    const body = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    )
    return `${body.sub}:${body.jti}`
  } catch {
    return null
  }
}
function publicKeyBytes(value: string): Uint8Array<ArrayBuffer> {
  const decoded = atob(value.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(decoded, (char) => char.charCodeAt(0))
}

export function syncWebPush() {
  if (pending) return pending
  pending = (async () => {
    managedSession = null
    const identity = sessionIdentity()
    if (
      !identity ||
      !supportsWebPush() ||
      Notification.permission !== 'granted' ||
      localStorage.getItem('livechat.notification.muted') === '1'
    )
      return
    const { data } = await axiosInstance.get<{
      enabled: boolean
      publicKey: string | null
    }>('/livechat/push/config')
    if (!data.enabled || !data.publicKey)
      throw new Error('Web Push belum dikonfigurasi di server.')
    await prepareWebPush()
    const registration = await navigator.serviceWorker.ready
    let subscription = await registration.pushManager.getSubscription()
    if (subscription?.options.applicationServerKey) {
      const existingKey = new Uint8Array(
        subscription.options.applicationServerKey
      )
      const expectedKey = publicKeyBytes(data.publicKey)
      if (
        existingKey.length !== expectedKey.length ||
        existingKey.some((value, index) => value !== expectedKey[index])
      ) {
        await subscription.unsubscribe()
        subscription = null
      }
    }
    if (!subscription)
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyBytes(data.publicKey),
      })
    const json = subscription.toJSON()
    if (sessionIdentity() !== identity) return
    await axiosInstance.post('/livechat/push/subscribe', {
      endpoint: subscription.endpoint,
      keys: json.keys,
    })
    if (sessionIdentity() === identity) {
      managedSession = identity
      registration.active?.postMessage({ type: 'PUSH_ENABLED', enabled: true })
    }
  })().finally(() => {
    pending = null
  })
  return pending
}

export async function disableWebPush() {
  managedSession = null
  if (!('serviceWorker' in navigator)) return
  // Wait for a concurrent registration before revoking its subscription.
  await pending?.catch(() => undefined)
  managedSession = null
  const registration = await navigator.serviceWorker.getRegistration('/')
  if (!registration) return
  registration.active?.postMessage({ type: 'PUSH_ENABLED', enabled: false })
  const subscription = await registration.pushManager.getSubscription()
  if (!subscription) return
  try {
    if (getToken())
      await axiosInstance.post('/livechat/push/unsubscribe', {
        endpoint: subscription.endpoint,
      })
  } finally {
    await subscription.unsubscribe()
    managedSession = null
  }
}
