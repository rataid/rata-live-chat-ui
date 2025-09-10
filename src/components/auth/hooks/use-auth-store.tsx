import { useContext } from 'react'
import { useStore } from 'zustand'

import { AuthContext } from '../provider'
import { AuthAction, AuthState } from '../types'

export function useAuthStore<T>(
  selector: (state: AuthState & AuthAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(AuthContext)

  if (!store) throw new Error('Missing AuthContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
