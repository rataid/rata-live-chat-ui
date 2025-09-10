import { useContext } from 'react'

import { TreeContext } from './provider'

export function useTree() {
  const state = useContext(TreeContext)

  if (!state) throw new Error('Missing TreeContext.Provider in the tree')

  return state
}
