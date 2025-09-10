import { InputPropsWithoutRef } from '@nui/types'

export type CheckboxSize = 'sm' | 'md'

export type CheckboxRounded = 'none' | 'sm' | 'md' | 'full'

export type CheckboxMainProps = {
  scale?: CheckboxSize
  rounded?: CheckboxRounded
}

export type CheckboxIconProps = {
  rounded?: CheckboxRounded
  disabled?: boolean
}

export type CheckboxProps = {
  icon?: React.ReactNode
  scale?: CheckboxSize
  rounded?: CheckboxRounded
  disabled?: boolean
} & CheckboxMainProps &
  CheckboxIconProps &
  InputPropsWithoutRef &
  React.PropsWithChildren
