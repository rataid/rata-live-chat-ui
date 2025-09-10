import { useContext } from 'react'
import { useStore } from 'zustand'

import { RoleItemSelectContext } from './provider'
import { RoleItemSelectAction, RoleItemSelectState } from './types'

export function useRoleItemSelect<T>(
  selector: (state: RoleItemSelectState & RoleItemSelectAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(RoleItemSelectContext)

  if (!store)
    throw new Error('Missing RoleItemSelectContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
