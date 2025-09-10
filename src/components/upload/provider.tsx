import { createContext, useRef } from 'react'

import uploadStore, { UploadStore } from './store'
import { UploadProviderProps } from './types'

export const UploadContext = createContext<UploadStore | null>(null)

export function UploadProvider({
  defaultItems,
  currentTab,
  fileType,
  fileNamingRules,
  hidePreview,
  clearItemOnUploadDone,
  autoCloseTab,
  onUploadDone,
  maxFiles,
  maxSize,
  children,
}: UploadProviderProps) {
  const storeRef = useRef<UploadStore>()

  if (!storeRef.current) {
    storeRef.current = uploadStore({
      defaultItems,
      currentTab,
      fileType,
      maxFiles,
      maxSize,
      fileNamingRules,
      hidePreview,
      autoCloseTab,
      clearItemOnUploadDone,
      onUploadDone,
    })
  }

  return (
    <UploadContext.Provider value={storeRef.current}>
      {children}
    </UploadContext.Provider>
  )
}
