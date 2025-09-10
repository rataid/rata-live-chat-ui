import { forwardRef, useState } from 'react'
import { NumericFormat, OnValueChange } from 'react-number-format'

import Icon from '@nui/ui/icon'

import { InputNumericProps } from '../types'
import { InputAddOn, InputIcon, InputMain, InputWrapper } from './input.style'

export const InputNum = forwardRef<HTMLInputElement, InputNumericProps>(
  function InputNum(
    {
      addOn,
      leadingIcon,
      trailingIcon,
      danger = false,
      sizeInput,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      thousandSeparator,
      decimalSeparator,
      allowNegative = false,
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
          name={name}
          value={value ?? ''}
          onChange={onChange}
          hidden
          {...props}
        />
        <InputWrapper sizeInput={sizeInput} isFocused={isFocused}>
          {!!addOn && <InputAddOn sizeInput={sizeInput}>{addOn}</InputAddOn>}
          <InputMain leadingIcon={leadingIcon}>
            {!!leadingIcon && (
              <InputIcon isFocused={isFocused} danger={danger}>
                <Icon icon={leadingIcon} size="xs" />
              </InputIcon>
            )}
            <NumericFormat
              getInputRef={forwardedRef}
              name={`formatted-${name}`}
              allowNegative={allowNegative}
              value={value}
              onValueChange={onValueChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              thousandSeparator={thousandSeparator}
              decimalSeparator={decimalSeparator}
              {...props}
            />
            {!!trailingIcon && (
              <InputIcon
                sizeInput={sizeInput}
                isFocused={isFocused}
                danger={danger}
              >
                <Icon icon={trailingIcon} size="xs" />
              </InputIcon>
            )}
          </InputMain>
        </InputWrapper>
      </>
    )
  }
)
