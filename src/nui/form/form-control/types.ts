import { FieldError, FieldErrorsImpl, Merge, FieldErrors } from 'react-hook-form'

export type FormControlProviderProps = React.PropsWithChildren

// Helper type to extract field array errors
type FieldArrayError = {
  message?: string
  type?: string
} | FieldErrors<any> | undefined

export type FormControlProps = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | FieldArrayError | null
  required?: boolean
  optional?: boolean
} & React.PropsWithChildren

export type FormControlState = FormControlProps

export type FormControlAction = {
  setError: (err: any) => void
  setRequired: (required: boolean) => void
  setOptional: (optional: boolean) => void
}
