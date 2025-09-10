import { useContext } from 'react'
import { useStore } from 'zustand'

import { ColorPickerContext } from './provider'
import { ColorPickerAction, ColorPickerState } from './types'

export function useColorPicker<T>(
  selector: (state: ColorPickerState & ColorPickerAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(ColorPickerContext)

  if (!store) throw new Error('Missing ColorPickerContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
