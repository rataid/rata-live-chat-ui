import { useFormControl } from '@nui/form'

import { FormHelperWrapper } from './form-helper.style'

export function FormHelper({ children }: React.PropsWithChildren) {
  const [errors] = useFormControl((s) => [s.error])

  return !errors ? <FormHelperWrapper>{children}</FormHelperWrapper> : null
}
