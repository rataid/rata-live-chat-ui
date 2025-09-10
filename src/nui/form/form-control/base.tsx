import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { FormControlBaseError } from './base.style'
import {
  FormControlBaseSpacer,
  FormControlBaseWrapper,
} from './form-control.style'
import { useFormControl } from './hooks'
import { FormControlProps } from './types'

export function FormControlBase({
  error = null,
  required = false,
  optional = false,
  children,
}: FormControlProps) {
  const [errorState, setErrors, setRequired, setOptional] = useFormControl(
    (s) => [s.error, s.setError, s.setRequired, s.setOptional],
    shallow
  )

  useEffect(() => {
    setErrors(error)
    setRequired(required)
    setOptional(optional)
  }, [setErrors, error, setRequired, required, setOptional, optional])

  return (
    <FormControlBaseWrapper>
      {children}
      {(error?.message || errorState?.message) && (
        <FormControlBaseError>
          {(errorState?.message || error?.message) as React.ReactNode}
        </FormControlBaseError>
      )}
      <FormControlBaseSpacer />
    </FormControlBaseWrapper>
  )
}
