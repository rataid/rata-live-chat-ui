import { InputPropsWithoutRef } from '@nui/types'

export type ColorPickerVariant = 'default' | 'pickerOnly' | 'inputOnly'

export type ColorPickerState =
  | {
      // parsedValue: string
      color: string
      variant: ColorPickerVariant
      showPicker: boolean
    }
  | null
  | undefined

export type ColorPickerAction = {
  // syncParsedValue: () => void
  setColor: (color: string) => void
  toggleShowPicker: () => void
}

export type ColorPickerProviderProps = {
  color?: string
  variant?: ColorPickerVariant
} & React.PropsWithChildren

export type ColorPickerInputProps = InputPropsWithoutRef

export type ColorPickerProps = ColorPickerProviderProps & ColorPickerInputProps
