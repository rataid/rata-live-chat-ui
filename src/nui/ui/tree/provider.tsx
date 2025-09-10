import { createContext, useContext } from 'react'

import { DEFAULT_GAP, DEFAULT_HEIGHT } from './config'
import { TreeContextState } from './types'

export const TreeNodeHeightContext = createContext(0)

export function useTreeNodeHeight() {
  return useContext(TreeNodeHeightContext)
}

export const TreeContext = createContext<TreeContextState>({
  nodeHeight: DEFAULT_HEIGHT,
  gap: DEFAULT_GAP,
})
