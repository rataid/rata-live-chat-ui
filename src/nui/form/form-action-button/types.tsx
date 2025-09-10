import { ButtonStackJustify } from '@nui/ui/button-stack'
import { IconProps } from '@nui/ui/icon'

export type FormActionButtonProps = {
  // Submit
  type?: 'button' | 'submit' | 'reset'
  icon?: IconProps['icon']
  label?: string
  disabled?: boolean
  danger?: boolean
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

  // Cancel
  cancelType?: 'button' | 'submit' | 'reset'
  cancelLabel?: string
  cancelDisabled?: boolean
  hideCancel?: boolean
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

  justify?: ButtonStackJustify
  buttonFullWidth?: boolean
} & React.PropsWithChildren
