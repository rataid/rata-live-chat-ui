import { useFocusWithin } from 'ahooks'
import { forwardRef, useContext, useRef } from 'react'

import { RoleItemSelectItems } from './components/items'
import { RoleItemSelectSelect } from './components/select'
import { RoleItemSelectValue } from './components/value'
import { RoleItemSelectContext, RoleItemSelectProvider } from './provider'
import { RoleItemSelectProps } from './types'

export * from './components/items'
export * from './components/select'
export * from './components/value'
export * from './hooks'
export * from './provider'
export * from './store'

const RoleItemSelect = forwardRef<HTMLInputElement, RoleItemSelectProps>(
  function RoleItemSelect(
    { onFocus, onBlur, portalId, ...props },
    forwardedRef
  ) {
    const focusRef = useRef(null)

    useFocusWithin(focusRef, {
      onFocus: () => {
        onFocus?.({} as any)
      },
      onBlur: () => {
        onBlur?.({} as any)
      },
    })

    const store = useContext(RoleItemSelectContext)

    if (!store) {
      return (
        <div ref={focusRef}>
          <RoleItemSelectProvider>
            <RoleItemSelectValue ref={forwardedRef} {...props} />
            <RoleItemSelectSelect portalId={portalId} />
            <RoleItemSelectItems />
          </RoleItemSelectProvider>
        </div>
      )
    }

    return (
      <div ref={focusRef}>
        <RoleItemSelectValue ref={forwardedRef} {...props} />
        <RoleItemSelectSelect portalId={portalId} />
        <RoleItemSelectItems />
      </div>
    )
  }
)

export default RoleItemSelect
