import { createContext, useRef } from 'react'

import paginationStore, { PaginationStore } from './store'
import { PaginationProviderProps } from './types'

export const PaginationContext = createContext<PaginationStore | null>(null)

export function PaginationProvider({
  children,
  ...props
}: PaginationProviderProps) {
  const storeRef = useRef<PaginationStore>()

  if (!storeRef.current) {
    storeRef.current = paginationStore(props)
  }

  return (
    <PaginationContext.Provider value={storeRef.current}>
      {children}
    </PaginationContext.Provider>
  )
}
