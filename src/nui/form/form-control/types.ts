import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export type FormControlProviderProps = React.PropsWithChildren

export type FormControlProps = {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null
  required?: boolean
  optional?: boolean
} & React.PropsWithChildren

export type FormControlState = FormControlProps

export type FormControlAction = {
  setError: (err: any) => void
  setRequired: (required: boolean) => void
  setOptional: (optional: boolean) => void
}
