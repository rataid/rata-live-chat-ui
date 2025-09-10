import { forwardRef, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { InputPropsWithoutRef } from '@nui/types'

import { useUpload } from '../hooks'

type UploadValueProps = InputPropsWithoutRef

export const UploadValue = forwardRef<HTMLInputElement, UploadValueProps>(
  function UploadValue({ name, value, onChange, ...props }, forwardedRef) {
    const [parsedValue] = useUpload((s) => [s.parsedValue], shallow)

    useEffect(() => {
      onChange?.({
        target: { value: parsedValue },
      } as any)
    }, [parsedValue, onChange])

    return (
      <input
        ref={forwardedRef}
        name={name}
        value={parsedValue}
        onChange={() => {}}
        type="hidden"
        {...props}
      />
    )
  }
)
