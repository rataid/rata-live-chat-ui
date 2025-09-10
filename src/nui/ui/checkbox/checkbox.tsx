import { cloneElement, forwardRef } from 'react'

import { randomString } from '@utils'

import Icon from '../icon'
import {
  CheckboxContainer,
  CheckboxIcon,
  CheckboxLabel,
  CheckboxMain,
  CheckboxWrapper,
} from './checkbox.style'
import { CheckboxProps } from './types'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      id,
      value,
      icon = <Icon icon="lucide-check" />,
      rounded,
      disabled,
      scale,
      onChange,
      children,
      checked,
      ...props
    },
    ref
  ) {
    const iconSize = scale === 'sm' ? '2xs' : 'xs'

    const newIcon = icon
      ? cloneElement(icon as React.ReactElement, {
          size: iconSize,
        })
      : null

    const newId = id ?? randomString(5)

    return (
      <CheckboxWrapper>
        <CheckboxContainer>
          <CheckboxMain
            ref={ref}
            id={newId}
            value={value}
            checked={checked}
            onChange={(e) => {
              onChange?.(e)
            }}
            scale={scale}
            rounded={rounded}
            disabled={disabled}
            type="checkbox"
            className="peer"
            {...props}
          />
          <CheckboxIcon rounded={rounded}>{newIcon}</CheckboxIcon>
        </CheckboxContainer>
        {children && <CheckboxLabel htmlFor={newId}>{children}</CheckboxLabel>}
      </CheckboxWrapper>
    )
  }
)
