import { createContext, useRef } from 'react'

import colorPickerStore, { ColorPickerStore } from './store'
import { ColorPickerProviderProps } from './types'

export const ColorPickerContext = createContext<ColorPickerStore | null>(null)

export function ColorPickerProvider({
  variant,
  children,
}: ColorPickerProviderProps) {
  const storeRef = useRef<ColorPickerStore>()

  if (!storeRef.current) {
    storeRef.current = colorPickerStore({ variant })
  }

  return (
    <ColorPickerContext.Provider value={storeRef.current}>
      {children}
    </ColorPickerContext.Provider>
  )
}
