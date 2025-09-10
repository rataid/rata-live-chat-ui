import { InputPropsWithoutRef } from '@nui/types'

// @onksid: Add more scale variants

export type ScaleVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Variant = 'primary' | 'danger' | 'success' | 'gray' | 'warning'

export type RadioProps = {
  variant?: Variant
  scale?: ScaleVariant
  checked?: boolean
} & InputPropsWithoutRef &
  React.PropsWithChildren
