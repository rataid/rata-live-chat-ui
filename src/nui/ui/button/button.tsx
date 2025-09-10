import { cloneElement, forwardRef } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'

import Icon, { IconSize } from '@nui/ui/icon'

import { ButtonLabel, ButtonWrapper } from './button.style'
import { ButtonProps, ButtonSize } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      to,
      type = 'button',
      icon = '',
      trailing = false,
      size = 'md',
      variant = 'primary',
      rounded = 'lg',
      wider = 'none',
      danger = false,
      warning = false,
      noPadding = false,
      fontWeight = 'semibold',
      children,
      onClick,
      disabled,
      ...props
    },
    forwardedRef
  ) {
    const status = useNavigation().state
    const navigate = useNavigate()

    const iconSizes: Record<ButtonSize, IconSize> = {
      xs: 'sm',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'lg',
      '2xl': 'xl',
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

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // If the button has a `to` prop, navigate to that route

      if (to) {
        e.preventDefault()
        e.stopPropagation()
        navigate(to)
      } else if (onClick) {
        onClick(e)
      }
    }

    const isNoPadding = !children ? true : noPadding

    return (
      <ButtonWrapper
        ref={forwardedRef}
        type={status === 'idle' ? type : 'button'}
        size={size}
        variant={variant}
        rounded={rounded}
        danger={danger}
        warning={warning}
        disabled={disabled}
        noPadding={isNoPadding}
        wider={wider}
        onClick={status === 'idle' ? handleClick : undefined}
        {...props}
      >
        {children ? (
          <ButtonLabel wider={wider} fontWeight={fontWeight}>
            {resizedIcon && !trailing && resizedIcon}
            {children}
            {resizedIcon && trailing && resizedIcon}
          </ButtonLabel>
        ) : (
          resizedIcon
        )}
      </ButtonWrapper>
    )
  }
)
