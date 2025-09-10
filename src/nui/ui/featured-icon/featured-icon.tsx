import { cloneElement, forwardRef } from 'react'

import Icon, { IconSize } from '@nui/ui/icon'

import { FeaturedIconMain } from './featured-icon.style'
import { FeaturedIconProps, FeaturedIconSize } from './types'

export const FeaturedIcon = forwardRef<HTMLDivElement, FeaturedIconProps>(
  function FeaturedIcon(
    {
      size = 'md',
      variant = 'primary',
      rounded = 'none',
      outline = false,
      icon,
      ...props
    },
    forwarded
  ) {
    const iconSizes: Record<FeaturedIconSize, IconSize> = {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'lg',
    }

    const iconStroke = ['xs', 'sm'].includes(size) ? 'md' : 'sm'

    const newIcon =
      icon && typeof icon === 'string' ? (
        <Icon stroke={iconStroke} icon={icon} />
      ) : (
        icon
      )

    // Clone the icon element and override props with new size prop
    const resizedIcon = newIcon
      ? cloneElement(newIcon as React.ReactElement, {
          size: iconSizes[size],
        })
      : null

    return (
      <FeaturedIconMain
        ref={forwarded}
        outline={outline}
        rounded={rounded}
        size={size}
        variant={variant}
        {...props}
      >
        {resizedIcon}
      </FeaturedIconMain>
    )
  }
)
