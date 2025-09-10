import { forwardRef, useEffect } from 'react'

import { usePermissionChecklist } from '../hooks'
import { PermissionChecklistValueProps } from '../types'

export const PermissionChecklistValue = forwardRef<
  HTMLInputElement,
  PermissionChecklistValueProps
>(function PermissionChecklistValueComp(
  { value, onChange, ...props },
  forwardedRef
) {
  const [parsedValue] = usePermissionChecklist((s) => [s.parsedValue])

  useEffect(() => {
    if (onChange) {
      onChange({ target: { value: parsedValue } } as any)
    }
  }, [parsedValue, onChange])

  return (
    <input
      ref={forwardedRef}
      value={parsedValue}
      onChange={() => {}}
      hidden
      {...props}
    />
  )
})
