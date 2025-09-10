import { createContext, useRef } from 'react'

import permissionItemSelectStore, { PermissionChecklistStore } from './store'
import { PermissionChecklistProviderProps } from './types'

export const PermissionChecklistContext =
  createContext<PermissionChecklistStore | null>(null)

export function PermissionChecklistProvider({
  defaultItems,
  children,
}: PermissionChecklistProviderProps) {
  const storeRef = useRef<PermissionChecklistStore>()

  if (!storeRef.current) {
    storeRef.current = permissionItemSelectStore(defaultItems)
  }

  return (
    <PermissionChecklistContext.Provider value={storeRef.current}>
      {children}
    </PermissionChecklistContext.Provider>
  )
}
