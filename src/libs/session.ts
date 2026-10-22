import { decodeToken } from 'react-jwt'

import { getToken, isTokenValid, setToken } from '@/components/auth/helpers'

type SessionToken = { sub: string; jti: string; exp: number }

// Ignore delayed responses from another session, or responses older than the
// latest token. They must not restore a logged-out account or shorten its expiry.
export function saveSessionToken(accessToken: string) {
  const current = getToken()
  if (!current || !isTokenValid(accessToken)) return
  const previous = decodeToken<SessionToken>(current)
  const next = decodeToken<SessionToken>(accessToken)
  if (
    !previous?.jti ||
    !next?.jti ||
    previous.jti !== next.jti ||
    previous.sub !== next.sub
  )
    return
  if (next.exp < previous.exp) return
  setToken(accessToken)
}
