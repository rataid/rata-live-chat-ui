import { useContext } from 'react'
import { useStore } from 'zustand'

import { PaginationContext } from './provider'
import { PaginationAction, PaginationState } from './types'

export function usePagination<T>(
  selector: (state: PaginationState & PaginationAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(PaginationContext)

  if (!store) throw new Error('Missing PaginationContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
