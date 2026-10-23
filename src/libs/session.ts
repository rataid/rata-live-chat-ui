import axios from 'axios'
import { decodeToken } from 'react-jwt'

import {
  getToken,
  isTokenValid,
  removeToken,
  setToken,
} from '@/components/auth/helpers'

type SessionToken = { sub: string; jti: string; exp: number }
const sessionClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}/api/livechat/session`,
  withCredentials: true,
  timeout: 10000,
})
let refreshing: Promise<string> | undefined

export function saveSessionToken(accessToken: string) {
  const current = getToken()
  if (!current || !isTokenValid(accessToken)) return
  const previous = decodeToken<SessionToken>(current)
  const next = decodeToken<SessionToken>(accessToken)
  if (
    !previous?.jti ||
    !next?.jti ||
    previous.jti !== next.jti ||
    previous.sub !== next.sub ||
    next.exp < previous.exp
  )
    return
  setToken(accessToken)
}

export async function withSessionLock<T>(work: () => Promise<T>): Promise<T> {
  if (typeof navigator !== 'undefined' && navigator.locks?.request)
    return await navigator.locks.request('livechat-refresh', work)
  return work()
}
export function isSessionExpired(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 401
}

export function refreshAccessToken(force = false): Promise<string> {
  if (refreshing) return refreshing
  const before = getToken()
  if (!before) return Promise.reject(new Error('No patient session'))
  if (!force && isTokenValid(before)) return Promise.resolve(before)
  const identity = decodeToken<SessionToken>(before)
  refreshing = withSessionLock(async () => {
    const current = getToken()
    // Another tab may already have rotated the shared refresh cookie.
    if (current && current !== before && isTokenValid(current)) return current
    if (!current) throw new Error('Patient logged out')
    const { data } = await sessionClient.post('/refresh')
    const active = decodeToken<SessionToken>(getToken() || '')
    const renewed = decodeToken<SessionToken>(data.accessToken)
    if (
      !active?.jti ||
      active.jti !== identity?.jti ||
      active.sub !== identity?.sub ||
      renewed?.jti !== active.jti ||
      renewed.sub !== active.sub ||
      !isTokenValid(data.accessToken)
    )
      throw new Error('Patient session changed')
    saveSessionToken(data.accessToken)
    return data.accessToken
  })
    .catch((error) => {
      const current = decodeToken<SessionToken>(getToken() || '')
      if (
        isSessionExpired(error) &&
        current?.jti === identity?.jti &&
        current?.sub === identity?.sub
      ) {
        removeToken()
        window.dispatchEvent(new Event('livechat-session-expired'))
      }
      throw error
    })
    .finally(() => {
      refreshing = undefined
    })
  return refreshing
}

export async function endSession() {
  removeToken()
  // Let an in-flight rotation finish before clearing its newly issued cookie.
  await refreshing?.catch(() => undefined)
  await withSessionLock(async () => {
    await sessionClient.post('/logout')
  })
}
