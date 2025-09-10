import React from 'react'

import {
  DualToneColumMain,
  DualToneColumSingle,
  DualToneColumWrapper,
} from './dual-tone-column.style'
import { DualToneColumProps } from './types'

export function DualToneColum({
  singleRow = false,
  fit = false,
  noBackground,
  children,
}: DualToneColumProps) {
  const arrChildren = React.Children.toArray(children)

  if (singleRow) return <DualToneColumSingle>{children}</DualToneColumSingle>

  if (arrChildren.length > 2) throw new Error('Max Children 2')

  return (
    <DualToneColumWrapper>
      {arrChildren[0]}
      <DualToneColumMain noBackground={noBackground} fit={fit}>
        {arrChildren[1]}
      </DualToneColumMain>
    </DualToneColumWrapper>
  )
}
