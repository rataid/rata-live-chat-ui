import { ButtonPropsWithoutRef } from '@nui/types'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryGray'
  | 'tertiary'
  | 'tertiaryGray'
  | 'link'
  | 'linkGray'

export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type ButtonWider = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type ButtonFontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export type ButtonProps = {
  to?: string
  icon?: React.ReactNode | string
  trailing?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
  rounded?: ButtonRounded
  wider?: ButtonWider
  danger?: boolean
  warning?: boolean
  noPadding?: boolean
  href?: string
  fontWeight?: ButtonFontWeight
} & ButtonPropsWithoutRef
