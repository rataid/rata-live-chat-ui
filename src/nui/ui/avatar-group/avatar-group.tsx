import { Children, useMemo } from 'react'

import { AvatarGroupProvider } from './context'
import { AvatarGroupProps, AvatarGroupProviderProps } from './types'

export function AvatarGroup({
  maxItem,
  size = 'sm',
  placeholder = 'lucide:image',
  background,
  children,
}: AvatarGroupProps) {
  const childArray = Children.toArray(children)

  const maxDisplayCount = maxItem ?? childArray.length

  const filteredChildren = childArray.filter(
    (e, index) => index < maxDisplayCount
  )

  const context = useMemo<AvatarGroupProviderProps>(
    () => ({
      size,
      placeholder,
      background,
    }),
    [size, placeholder, background]
  )

  return (
    <AvatarGroupProvider value={context}>
      <div className="flex items-center ml-3.5 h-fit">
        {filteredChildren.map((child) => child)}
      </div>
    </AvatarGroupProvider>
  )
}
