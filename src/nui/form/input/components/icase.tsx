import { replace, toLower, toUpper } from 'lodash'
import { forwardRef, useState } from 'react'

import Icon from '@nui/ui/icon'

import { InputIcaseProps } from '../types'
import { InputAddOn, InputIcon, InputMain, InputWrapper } from './input.style'

export const InputIcase = forwardRef<HTMLInputElement, InputIcaseProps>(
  function InputIcase(
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
      displayCase = 'upper',
      allowSpace = true,
      ...props
    },
    forwardedRef
  ) {
    const [isFocused, setIsFocused] = useState(false)

    const inputValue = toLower(
      allowSpace ? (value as string) : replace(value as string, /\s/, '')
    )

    const displayValue =
      displayCase === 'upper' ? toUpper(inputValue) : toLower(inputValue)

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
          value={inputValue}
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
            <input
              ref={forwardedRef}
              name={`icase-${name}`}
              value={displayValue}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
