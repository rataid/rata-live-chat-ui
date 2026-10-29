import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

import {
  FormControlBaseError,
  FormControlBaseErrorCollapse,
  FormControlBaseErrorInner,
} from './base.style'
import { FormControlBaseWrapper } from './form-control.style'
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

  const message = errorState?.message || error?.message

  // Keeps the last message while the error closes, so the text doesn't
  // disappear before the height animation ends
  const [shownMessage, setShownMessage] = useState(message)

  useEffect(() => {
    if (message) setShownMessage(message)
  }, [message])

  return (
    <FormControlBaseWrapper>
      {children}
      {/* No space is kept without an error: the fields below move down
          smoothly when one appears */}
      <FormControlBaseErrorCollapse $open={!!message} aria-hidden={!message}>
        <FormControlBaseErrorInner>
          <FormControlBaseError>
            {shownMessage as React.ReactNode}
          </FormControlBaseError>
        </FormControlBaseErrorInner>
      </FormControlBaseErrorCollapse>
    </FormControlBaseWrapper>
  )
}
