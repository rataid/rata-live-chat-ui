import { useFocusWithin } from 'ahooks'
import { forwardRef, useRef } from 'react'

import { ColorPickerInput } from './components/input'
import { ColorPickerPreview } from './components/preview'
import { ColorPickerProvider } from './provider'
import { ColorPickerProps } from './types'

export * from './components/input'
export * from './components/preview'
export * from './types'

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  function ColorPicker(
    { color, variant, onFocus, onBlur, ...props },
    forwardedRef
  ) {
    const focusRef = useRef(null)

    useFocusWithin(focusRef, {
      onFocus: () => {
        onFocus?.({} as any)
      },
      onBlur: () => {
        onBlur?.({} as any)
      },
    })

    return (
      <ColorPickerProvider variant={variant}>
        <div role="button" tabIndex={0} ref={focusRef} className="flex gap-x-2">
          <ColorPickerInput ref={forwardedRef} {...props} />
          <ColorPickerPreview />
        </div>
      </ColorPickerProvider>
    )
  }
)
