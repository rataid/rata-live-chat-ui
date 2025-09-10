import { useEffect } from 'react'

import { getToken, parseToken } from '../helpers'
import { useAuth } from '../hooks/use-auth'

export type AuthGuardProps = React.PropsWithChildren

export function AuthGuard({ children }: AuthGuardProps) {
  const { userData, assignData } = useAuth()

  const token = getToken()

  useEffect(() => {
    if (userData?.sub) {
      const decodedToken = parseToken(token)

      if (decodedToken) {
        assignData(decodedToken)
      }
    }
  }, [assignData, token, userData?.sub])

  return children as React.ReactElement
}
