import { Dispatch, SetStateAction } from 'react'
import { NumericFormatProps, PatternFormatProps } from 'react-number-format'

import { InputPropsWithoutRef } from '@nui/types'
import { IconProps } from '@nui/ui/icon'

export type InputMainProps = {
  addOn?: React.ReactNode | string
  trailOn?: React.ReactNode | string
  leadingIcon?: IconProps['icon'] // @todo: should allow react node as well
  trailingIcon?: IconProps['icon']
  danger?: boolean
  sizeInput?: 'md' | 'lg'
  isUppercase?: boolean
}

export type InputInternalProps = {
  isFocused?: boolean
  disable?: boolean
} & InputMainProps

export type InputProps = InputMainProps & InputPropsWithoutRef

export type InputStepperProps = {
  setInputValue: Dispatch<SetStateAction<number>>
}

export type InputNumericProps = {
  allowNegative?: boolean
} & NumericFormatProps &
  InputProps

export type InputIcaseProps = {
  displayCase?: 'upper' | 'lower'
  allowSpace?: boolean
} & InputProps

export type InputSlugProps = {
  valueSlug?: string
  isError?: boolean
} & InputProps

export type InputPatternProps = PatternFormatProps & InputProps

// ommit type from PatternFormatProps
export type InputPhoneProps = Omit<PatternFormatProps, 'format'> & InputProps

export type InputOtpProps = {
  length?: number
  name?: string
  value?: string
  danger?: boolean
  disabled?: boolean
  autoFocus?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
}
