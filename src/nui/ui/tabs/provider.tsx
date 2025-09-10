import { createContext, useRef } from 'react'

import tabsStore, { TabsStore } from './store'
import { TabsProviderProps } from './types'

export const TabsContext = createContext<TabsStore | null>(null)

export function TabsProvider({ defaultTab, children }: TabsProviderProps) {
  const storeRef = useRef<TabsStore>()

  if (!storeRef.current) {
    storeRef.current = tabsStore({ defaultTab })
  }

  return (
    <TabsContext.Provider value={storeRef.current}>
      {children}
    </TabsContext.Provider>
  )
}
