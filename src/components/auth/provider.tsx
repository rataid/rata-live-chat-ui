import { createContext, useRef } from 'react'

import authStore, { AuthStore } from './store'
import { AuthProviderProps } from './types'

export const AuthContext = createContext<AuthStore | null>(null)

export function AuthProvider({ children, userData }: AuthProviderProps) {
  const storeRef = useRef<AuthStore>()

  if (!storeRef.current) {
    storeRef.current = authStore(userData)
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}
