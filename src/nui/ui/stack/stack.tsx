import { forwardRef } from 'react'

import { StackWrapper } from './stack.style'
import { StackProps } from './types'

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    spacing = '1.5rem',
    flow = 'row',
    width,
    fit = false,
    align = 'start',
    justify = 'between',
    children,
    ...props
  },
  forwardedRef
) {
  return (
    <StackWrapper
      width={width}
      flow={flow}
      spacing={spacing}
      fit={fit}
      align={align}
      justify={justify}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </StackWrapper>
  )
})
