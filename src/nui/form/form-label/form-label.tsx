import { useFormControl } from '@nui/form'

import {
  FormLabelMain,
  FormLabelOptional,
  FormLabelRequired,
  FormLabelWrapper,
} from './form-label.style'
import { FormLabelProps } from './types'

export function FormLabel({ children }: FormLabelProps) {
  const [required, optional] = useFormControl((s) => [s.required, s.optional])

  return (
    <FormLabelWrapper>
      <FormLabelMain>
        {children || <div className="whitespace-pre"> </div>}
      </FormLabelMain>
      {optional && <FormLabelOptional>(optional)</FormLabelOptional>}
      {required && (
        <FormLabelRequired>*</FormLabelRequired>
      )}
    </FormLabelWrapper>
  )
}
