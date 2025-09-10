import { useContext } from 'react'
import { useStore } from 'zustand'

import { PermissionChecklistContext } from './provider'
import { PermissionChecklistAction, PermissionChecklistState } from './types'

export function usePermissionChecklist<T>(
  selector: (state: PermissionChecklistState & PermissionChecklistAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(PermissionChecklistContext)

  if (!store)
    throw new Error('Missing PermissionChecklistContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
