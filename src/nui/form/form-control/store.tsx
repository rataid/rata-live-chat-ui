import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { FormControlAction, FormControlProps, FormControlState } from './types'

export type FormControlStore = ReturnType<typeof formControlStore>

const formControlStore = () => {
  const DEFAULT_PROPS: FormControlProps = {
    error: null,
    required: false,
    optional: false,
  }

  return createStore<FormControlState & FormControlAction>()(
    immer<FormControlState & FormControlAction>((set) => ({
      error: DEFAULT_PROPS.error,
      required: DEFAULT_PROPS.required,
      optional: DEFAULT_PROPS.optional,
      setError: (error) =>
        set((s) => {
          s.error = error
        }),
      setRequired: (required) =>
        set((s) => {
          s.required = required
        }),
      setOptional: (optional) =>
        set((s) => {
          s.optional = optional
        }),
    }))
  )
}

export default formControlStore
