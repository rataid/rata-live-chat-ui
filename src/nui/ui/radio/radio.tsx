import { forwardRef } from 'react'

import { randomString } from '@utils'

import {
  RadioCheck,
  RadioControl,
  RadioInput,
  RadioLabel,
  RadioMain,
  RadioWrapper,
} from './radio.style'
import { RadioProps } from './types'

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    id,
    scale,
    checked,
    variant,
    disabled,
    hidden,
    children,
    ...props
  }: RadioProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const newId = id ?? randomString(5)

  return (
    <RadioWrapper>
      <RadioLabel disabled={disabled} htmlFor={newId} />
      <RadioControl>
        <RadioInput
          ref={ref}
          id={newId}
          type="radio"
          className="peer"
          checked={checked}
          scale={scale}
          hidden={hidden}
          variant={variant}
          disabled={disabled}
          {...props}
        />
        {!hidden && <RadioCheck scale={scale} variant={variant} />}
      </RadioControl>
      {children && <RadioMain disabled={disabled}>{children}</RadioMain>}
    </RadioWrapper>
  )
})
