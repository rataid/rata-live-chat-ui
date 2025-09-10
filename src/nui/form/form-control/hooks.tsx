import { useContext } from 'react'
import { useStore } from 'zustand'

import { FormControlContext } from './provider'
import { FormControlStore } from './store'
import { FormControlAction, FormControlState } from './types'

export function useFormControl<T>(
  selector: (state: FormControlState & FormControlAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(FormControlContext) as FormControlStore

  // Allow the hook to be used outside of the provider
  if (!store) return []

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useStore(store, selector, equalityFn)
}
