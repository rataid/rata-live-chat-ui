import { Children, useMemo, useState } from 'react'

import { DisclosureProvider } from './context'
import { DisclosureGroupMain } from './disclosure-group.style'
import { DisclosureGroupProps, DisclosureProviderProps } from './types'

export function DisclosureGroup({
  defaultOpenId,
  children,
}: DisclosureGroupProps) {
  const childArray = Children.toArray(children)

  const childProps = childArray as any

  const [isOpen, setIsOpen] = useState(defaultOpenId ?? childProps[0].props.id)

  const context = useMemo<DisclosureProviderProps>(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen]
  )

  return (
    <DisclosureProvider value={context}>
      <DisclosureGroupMain>{children}</DisclosureGroupMain>
    </DisclosureProvider>
  )
}
