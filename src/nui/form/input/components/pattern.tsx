import { forwardRef, useState } from 'react'
import { OnValueChange, PatternFormat } from 'react-number-format'

import Icon from '@nui/ui/icon'

import { InputPatternProps } from '../types'
import { InputAddOn, InputIcon, InputMain, InputWrapper } from './input.style'

export const InputPattern = forwardRef<HTMLInputElement, InputPatternProps>(
  function PatternInput(
    {
      addOn,
      leadingIcon,
      trailingIcon,
      danger = false,
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef
  ) {
    const [isFocused, setIsFocused] = useState(false)

    const onValueChange: OnValueChange = ({ floatValue }) => {
      if (onChange !== undefined) {
        if (floatValue !== undefined && onChange) {
          onChange({
            target: { value: floatValue.toString() },
          } as any)
        } else {
          onChange({ target: { value: '' } } as any)
        }
      }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (onFocus !== undefined) {
        onFocus(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onBlur !== undefined) {
        onBlur(e)
      }
    }

    return (
      <>
        <input
          ref={forwardedRef}
          value={value}
          onChange={onChange}
          hidden
          {...props}
        />
        <InputWrapper isFocused={isFocused}>
          {!!addOn && <InputAddOn>{addOn}</InputAddOn>}
          <InputMain leadingIcon={leadingIcon}>
            {!!leadingIcon && (
              <InputIcon isFocused={isFocused} danger={danger}>
                <Icon icon={leadingIcon} size="xs" />
              </InputIcon>
            )}
            <PatternFormat
              getInputRef={forwardedRef}
              value={value}
              onValueChange={onValueChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
            {!!trailingIcon && (
              <InputIcon isFocused={isFocused} danger={danger}>
                <Icon icon={trailingIcon} size="xs" />
              </InputIcon>
            )}
          </InputMain>
        </InputWrapper>
      </>
    )
  }
)
