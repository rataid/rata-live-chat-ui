import { useContext } from 'react'
import { useStore } from 'zustand'

import { TabsContext } from './provider'
import { TabsAction, TabsState } from './types'

export function useTabs<T>(
  selector: (state: TabsState & TabsAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(TabsContext)

  if (!store) throw new Error('Missing TabsContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
