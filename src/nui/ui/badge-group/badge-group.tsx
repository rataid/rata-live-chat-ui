import { cloneElement } from 'react'

import { BadgeGroupWrapper, BoxLabel } from './badge-group.style'
import { BadgeGroupProps, LabelProps } from './types'

function LabelNoIcon({ color, trailing, theme, size, children }: LabelProps) {
  return (
    <BoxLabel color={color} trailing={trailing} theme={theme} size={size}>
      {children}
    </BoxLabel>
  )
}

function LabelWithIcon({ color, trailing, theme, size, children }: LabelProps) {
  return (
    <BoxLabel trailing={trailing} theme={theme} color={color} size={size}>
      {children}
    </BoxLabel>
  )
}

export function BadgeGroup({
  label,
  size = 'md',
  color = 'primary',
  theme = 'light',
  trailing = false,
  icon,
  children,
}: BadgeGroupProps) {
  const iconSize = size === 'lg' ? 'xs' : 'xs'

  const newIcon = icon
    ? cloneElement(icon as React.ReactElement, {
        size: iconSize,
      })
    : null

  return (
    <BadgeGroupWrapper
      size={size}
      color={color}
      theme={theme}
      trailing={trailing}
    >
      {!trailing && (
        <LabelNoIcon
          color={color}
          trailing={trailing}
          theme={theme}
          size={size}
        >
          {label}
        </LabelNoIcon>
      )}
      {children}
      {trailing ? (
        <LabelWithIcon
          color={color}
          trailing={trailing}
          theme={theme}
          size={size}
        >
          {label} {newIcon}
        </LabelWithIcon>
      ) : (
        newIcon
      )}
    </BadgeGroupWrapper>
  )
}
