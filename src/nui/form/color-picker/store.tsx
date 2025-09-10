import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
  ColorPickerAction,
  ColorPickerProviderProps,
  ColorPickerState,
} from './types'

export type ColorPickerStore = ReturnType<typeof colorPickerStore>

const colorPickerStore = ({ color, variant }: ColorPickerProviderProps) => {
  const DEFAULT_PROPS: ColorPickerState = {
    color: color ?? '',
    variant: variant ?? 'default',
    showPicker: false,
  }

  return createStore<ColorPickerState & ColorPickerAction>()(
    immer<ColorPickerState & ColorPickerAction>((set, get) => ({
      color: DEFAULT_PROPS.color,
      variant: DEFAULT_PROPS.variant,
      showPicker: DEFAULT_PROPS.showPicker,
      setColor: (newColor) =>
        set((s) => {
          s.color = newColor
        }),
      toggleShowPicker: () =>
        set((s) => {
          s.showPicker = !s.showPicker
        }),
    }))
  )
}

export default colorPickerStore
