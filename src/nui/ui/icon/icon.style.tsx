import tw from 'twin.macro'

import { IconSize } from './types'

export const sizes: Record<IconSize, number> = {
  '2xs': 12,
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
}

export const sizeStrokes = {
  xs: tw`
  [g]:(stroke-[1px])
  [path]:(stroke-[1px])
`,
  sm: tw`
  [g]:(stroke-[1.5px])
  [path]:(stroke-[1.5px])
`,
  md: tw`
  [g]:(stroke-[2px])
  [path]:(stroke-[2px])
`,
  lg: tw`
[g]:(stroke-[2.5px])
[path]:(stroke-[2.5px])
`,
}
