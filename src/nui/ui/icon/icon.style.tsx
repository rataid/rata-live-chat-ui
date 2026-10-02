import { tw } from '@nui/utils/tw'

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
  [&_g]:stroke-[1px]
  [&_path]:stroke-[1px]
`,
  sm: tw`
  [&_g]:stroke-[1.5px]
  [&_path]:stroke-[1.5px]
`,
  md: tw`
  [&_g]:stroke-[2px]
  [&_path]:stroke-[2px]
`,
  lg: tw`
[&_g]:stroke-[2.5px]
[&_path]:stroke-[2.5px]
`,
}
