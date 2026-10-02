import { Icon as Iconify } from '@iconify/react'

import { sizeStrokes, sizes } from './icon.style'
import { IconProps } from './types'

export function Icon({
  icon = 'lucide:circle',
  size = 'md',
  stroke = 'sm',
  color,
  className,
}: IconProps) {
  return (
    <div className={['inline-block', className].filter(Boolean).join(' ')}>
      <Iconify
        icon={icon}
        width={sizes[size]}
        height={sizes[size]}
        className={sizeStrokes[stroke]}
        color={color}
      />
    </div>
  )
}
