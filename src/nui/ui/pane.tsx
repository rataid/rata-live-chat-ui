import React, { PropsWithChildren } from 'react'

import { PaneMain, PaneSecondary, PaneWrapper } from './pane.style'

export default function Pane({ children }: PropsWithChildren) {
  const arrChildren = React.Children.toArray(children)

  if (!arrChildren.length) {
    throw new Error('Pane component must accept 2 children')
  }

  if (arrChildren.length > 2) {
    throw new Error('Pane component can only accept maximum 2 children')
  }

  return (
    <PaneWrapper>
      <PaneMain>{arrChildren[0]}</PaneMain>
      <PaneSecondary>{arrChildren[1]}</PaneSecondary>
    </PaneWrapper>
  )
}
