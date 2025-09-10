import { InputPropsWithoutRef } from '@nui/types'

export type ToggleProps = {
  disable?: boolean
  scale?: 'sm' | 'md'
  variant?: 'light' | 'dark'
} & InputPropsWithoutRef &
  React.PropsWithChildren

export type ToggleStyleProps = {
  pressed?: boolean
  scale?: 'sm' | 'md'
  variant?: 'light' | 'dark'
}
