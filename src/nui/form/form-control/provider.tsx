import { createContext, useRef } from 'react'

import formControlStore, { FormControlStore } from './store'
import { FormControlProviderProps } from './types'

export const FormControlContext = createContext<FormControlStore | null>(null)

export function FormControlProvider({ children }: FormControlProviderProps) {
  const storeRef = useRef<FormControlStore>()

  if (!storeRef.current) {
    storeRef.current = formControlStore()
  }

  return (
    <FormControlContext.Provider value={storeRef.current}>
      {children}
    </FormControlContext.Provider>
  )
}
