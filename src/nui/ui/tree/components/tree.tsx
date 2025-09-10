import { useMemo } from 'react'

import { DEFAULT_GAP, DEFAULT_HEIGHT } from '../config'
import { TreeContext } from '../provider'
import { TreeProps } from '../types'
import { TreeChildren } from './children'
import { TreeAltWrapper } from './tree.style'

export function Tree({
  nodeHeight = DEFAULT_HEIGHT,
  gap = DEFAULT_GAP,
  children,
}: TreeProps) {
  const value = useMemo(
    () => ({
      nodeHeight,
      gap,
    }),
    [nodeHeight, gap]
  )

  return (
    <TreeContext.Provider value={value}>
      <TreeAltWrapper>
        <TreeChildren>{children}</TreeChildren>
      </TreeAltWrapper>
    </TreeContext.Provider>
  )
}
