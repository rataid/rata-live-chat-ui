import { IconifyIcon } from '@iconify/react'

export type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export type IconStroke = 'xs' | 'sm' | 'md' | 'lg'

const sizes: Record<IconSize, number> = {
  '2xs': 12,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 60,
  '3xl': 80,
}

export type IconProps = {
  icon?: string | IconifyIcon
  size?: keyof typeof sizes
  stroke?: IconStroke
}
