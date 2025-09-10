import { cloneElement, forwardRef } from 'react'

import Icon, { IconSize } from '../icon'
import { BadgeMain, BadgeWrapper } from './badge.style'
import { BadgeProps, BadgeSize } from './types'

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  {
    color = 'success',
    size = 'sm',
    width = 'auto',
    rounded = 'full',
    trailing = false,
    icon = false,
    noBackground = false,
    children,
    ...props
  },
  forwardedRef
) {
  const iconSizes: Record<BadgeSize, IconSize> = {
    xs: '2xs',
    sm: 'xs',
    md: 'sm',
    lg: 'md',
    xl: 'lg',
  }
  const iconStroke = ['xs'].includes(size) ? 'lg' : 'sm'

  const newIcon =
    typeof icon === 'string' ? <Icon stroke={iconStroke} icon={icon} /> : icon

  // Clone the icon element and override props with new size prop
  const resizedIcon = newIcon
    ? cloneElement(newIcon as React.ReactElement, {
        size: iconSizes[size],
      })
    : null

  return (
    <BadgeWrapper
      ref={forwardedRef}
      noBackground={noBackground}
      rounded={rounded}
      color={color}
      hasChildren={!!children}
      size={size}
      width={width}
      {...props}
    >
      {!trailing && <BadgeMain color={color}>{resizedIcon}</BadgeMain>}
      {children}
      {trailing && <BadgeMain color={color}>{resizedIcon}</BadgeMain>}
    </BadgeWrapper>
  )
})
