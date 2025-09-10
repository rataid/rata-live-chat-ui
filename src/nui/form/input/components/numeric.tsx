import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'

import { InputNumericProps } from '../types'

export const InputNumeric = forwardRef<HTMLInputElement, InputNumericProps>(
  function InputNumeric(
    {
      addOn,
      leadingIcon,
      trailingIcon,
      danger,
      thousandSeparator,
      decimalSeparator,
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef
  ) {
    return (
      <>
        <input
          ref={forwardedRef}
          value={value}
          onChange={onChange}
          hidden
          {...props}
        />
        {/* <NumericFormat
          addOn={addOn}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          danger={danger}
          getInputRef={forwardedRef as (el: HTMLInputElement) => void}
          value={value}
          onBlur={onBlur}
          onValueChange={({ floatValue }) => {
            if (onChange !== undefined) {
              if (floatValue !== undefined && onChange) {
                onChange({ target: { value: floatValue.toString() } } as any)
              } else {
                onChange({ target: { value: '' } } as any)
              }
            }
          }}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          customInput={Input}
        /> */}
        <NumericFormat
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
        />
      </>
    )
  }
)
