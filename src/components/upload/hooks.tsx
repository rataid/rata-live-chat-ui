import { useContext } from 'react'
import { useStore } from 'zustand'

import { UploadContext } from './provider'
import { UploadAction, UploadState } from './types'

export function useUpload<T>(
  selector: (state: UploadState & UploadAction) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | never[] {
  const store = useContext(UploadContext)

  if (!store) throw new Error('Missing UploadContext.Provider in the tree')

  return useStore(store, selector, equalityFn)
}
