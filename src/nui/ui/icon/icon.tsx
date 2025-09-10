import { Icon as Iconify } from '@iconify/react'

import { sizeStrokes, sizes } from './icon.style'
import { IconProps } from './types'

export function Icon({
  icon = 'lucide:circle',
  size = 'md',
  stroke = 'sm',
}: IconProps) {
  return (
    <div tw="inline-block">
      <Iconify
        icon={icon}
        width={sizes[size]}
        height={sizes[size]}
        css={sizeStrokes[stroke]}
      />
    </div>
  )
}
