import { useFocusWithin } from 'ahooks'
import { forwardRef, useRef } from 'react'

import { PermissionChecklistItems } from './components/items'
import { PermissionChecklistValue } from './components/value'
import { PermissionChecklistProps } from './types'

export * from './components/items'
export * from './components/value'
export * from './hooks'
export * from './provider'
export * from './store'

const PermissionChecklist = forwardRef<
  HTMLInputElement,
  PermissionChecklistProps
>(function PermissionChecklist({ onFocus, onBlur, ...props }, forwardedRef) {
  const focusRef = useRef(null)

  useFocusWithin(focusRef, {
    onFocus: () => {
      onFocus?.({} as any)
    },
    onBlur: () => {
      onBlur?.({} as any)
    },
  })

  return (
    <div ref={focusRef}>
      <PermissionChecklistValue ref={forwardedRef} {...props} />
      <PermissionChecklistItems />
    </div>
  )
})

export default PermissionChecklist
