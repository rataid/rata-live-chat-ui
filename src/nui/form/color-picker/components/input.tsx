import { forwardRef, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { Input } from '@nui/form/input'

import { useColorPicker } from '../hooks'
import { ColorPickerInputProps } from '../types'

export const ColorPickerInput = forwardRef<
  HTMLInputElement,
  ColorPickerInputProps
>(function ColorPickerInput({ value, onChange, ...props }, forwardedRef) {
  const [color, variant, setColor] = useColorPicker(
    (s) => [s.color, s.variant, s.setColor],
    shallow
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  useEffect(() => {
    if (color && color !== value) {
      onChange?.({ target: { value: color } } as any)
    }
  }, [color, onChange, value])

  useEffect(() => {
    setColor(value as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (variant !== 'pickerOnly')
    return (
      <Input
        ref={forwardedRef}
        value={value}
        onChange={handleChange}
        {...props}
      />
    )

  return (
    <input
      ref={forwardedRef}
      value={value}
      onChange={handleChange}
      hidden
      {...props}
    />
  )
})
