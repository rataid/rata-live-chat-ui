import { DivPropsWithoutRef } from '@nui/types'

export type BadgeColor =
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'
  | 'primary'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'rose'
  | 'blue'
  | 'blueGray'
  | 'blueLight'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BadgeRounded = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'full'

export type BadgeMainProps = {
  trailing?: boolean
  icon?: string | React.ReactNode
  noBackground?: boolean
  color?: BadgeColor
  rounded?: BadgeRounded
  size?: BadgeSize
  width?: string // If width is set, force badge width to be fixed
} & React.PropsWithChildren

export type BadgeProps = BadgeMainProps & DivPropsWithoutRef

export type BadgeWrapperProps = {
  hasChildren?: boolean
} & BadgeProps
