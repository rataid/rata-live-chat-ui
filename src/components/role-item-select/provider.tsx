import { createContext, useRef } from 'react'

import roleItemSelectStore, { RoleItemSelectStore } from './store'
import { RoleItemSelectProviderProps } from './types'

export const RoleItemSelectContext = createContext<RoleItemSelectStore | null>(
  null
)

export function RoleItemSelectProvider({
  children,
}: RoleItemSelectProviderProps) {
  const storeRef = useRef<RoleItemSelectStore>()

  if (!storeRef.current) {
    storeRef.current = roleItemSelectStore()
  }

  return (
    <RoleItemSelectContext.Provider value={storeRef.current}>
      {children}
    </RoleItemSelectContext.Provider>
  )
}
