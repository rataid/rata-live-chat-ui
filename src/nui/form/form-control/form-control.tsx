import { FormControlBase } from './base'
import { FormControlProvider } from './provider'
import { FormControlProps } from './types'

export function FormControl({
  error = null,
  required = false,
  optional = false,
  children,
}: FormControlProps) {
  return (
    <FormControlProvider>
      <FormControlBase error={error} required={required} optional={optional}>
        {children}
      </FormControlBase>
    </FormControlProvider>
  )
}
