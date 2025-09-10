import { forwardRef, useEffect } from 'react'

import { useRoleItemSelect } from '../hooks'
import { RoleItemSelectValueProps } from '../types'

export const RoleItemSelectValue = forwardRef<
  HTMLInputElement,
  RoleItemSelectValueProps
>(function RoleItemSelectValueComp(
  { value, onChange, defaultItems, ...props },
  forwardedRef
) {
  const [parsedValue, setItems] = useRoleItemSelect((s) => [
    s.parsedValue,
    s.setItems,
  ])

  useEffect(() => {
    if (onChange) {
      onChange({ target: { value: parsedValue } } as any)
    }
  }, [onChange, parsedValue])

  useEffect(() => {
    if (defaultItems && (defaultItems?.length ?? 0) > 0) {
      setItems(defaultItems)
    }
  }, [defaultItems, setItems])

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
