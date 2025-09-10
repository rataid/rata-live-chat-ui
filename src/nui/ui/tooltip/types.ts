import { TipOptions } from '../tip/type'

export type TooltipSize = 'none' | 'xs' | 'sm' | 'md' | 'lg'

export type TooltipRounded = 'none' | 'rounded' | 'md' | 'lg' | 'xl'

export type TooltipPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg'

export type Variant = 'light' | 'dark'

export type TooltipProps = {
  portalId?: string
  title?: string | React.ReactNode
  content: string | React.ReactNode
  variant?: Variant
  size?: TooltipSize
  rounded?: TooltipRounded
  padding?: TooltipPadding
} & TipOptions &
  React.PropsWithChildren
