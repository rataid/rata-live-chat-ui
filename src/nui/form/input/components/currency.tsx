import { forwardRef } from 'react'

import { InputMainProps } from '../types'
import { InputNum } from './num'

type InputCurrencyProps = {
  thousandSeparator?: string
  decimalSeparator?: string
  allowNegative?: boolean
  value?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
} & InputMainProps

export const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(
  function CurrencyInput(
    {
      addOn = 'Rp',
      thousandSeparator = '.',
      decimalSeparator = ',',
      allowNegative,
      ...props
    },
    forwardedRef
  ) {
    return (
      <InputNum
        addOn={addOn}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        allowNegative={allowNegative}
        ref={forwardedRef}
        {...props}
      />
    )
  }
)
