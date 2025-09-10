import { ReactNode } from 'react'

import { InputPropsWithoutRef } from '@nui/types'

export type Asset = {
  id: string
  size: number
  name: string
  title?: string
  url?: string
}

// Store
export type CurrentTab = 'dropzone' | 'queue'

export type FileType = 'image' | 'file' | 'stl' | 'icd'

export type UploadItem = Partial<Asset> | null | undefined

export enum UploadQueueStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export type UploadQueueItem = {
  id: string
  assetId?: string
  filename: string
  progress: number
  progressPercent: number
  status: UploadQueueStatus
  errorMessage?: string
  file: File
}

export type UploadStatus = {
  isDone: boolean
}

export type UploadState =
  | {
      parsedValue: string
      onUploadDone?: (items: UploadItem[], queue: UploadQueueItem[]) => void
      isFocused: boolean
      resourceKey: string
      items: UploadItem[]
      currentTab: CurrentTab
      queue: UploadQueueItem[]
      pendingQueueCount: number
      status: UploadStatus
      done: boolean
      fileType: FileType
      maxFiles?: number
      maxSize?: number
      fileNamingRules?: ReactNode
      autoCloseTab?: boolean
      deletedItemCount: number
      hidePreview?: boolean
      clearItemOnUploadDone?: boolean
    }
  | null
  | undefined

export type UploadAction = {
  syncParsedValue: () => void
  setIsFocused: (isFocused: boolean) => void
  setCurrentTab: (tab: CurrentTab) => void
  setResourceKey: (resourceKey: string) => void
  loadItems: (items?: UploadItem[]) => void
  addItem(asset: UploadItem): void
  addQueueItems: (files: File[]) => void
  setQueueItemProgress: (id: string, progress: number) => void
  updateQueue: (id: string, assetId: string) => void
  setMessageError: (assetId: string, message: string) => void
  setDone: () => void
  removeItem: (id: string) => void
  clearItems: () => void
}

export type UploadStoreProps = {
  defaultItems?: UploadItem[] | null
  currentTab?: CurrentTab
  fileType?: FileType
  fileNamingRules?: ReactNode
  autoCloseTab?: boolean
  hidePreview?: boolean
  clearItemOnUploadDone?: boolean
  onUploadDone?: (items: UploadItem[], queue: UploadQueueItem[]) => void
  maxFiles?: number
  maxSize?: number
}

// Provider
export type UploadProviderProps = {
  hidePreview?: boolean
  defaultItems?: UploadItem[] | null
  currentTab?: CurrentTab
  fileType?: FileType
  maxFiles?: number
  maxSize?: number
  fileNamingRules?: ReactNode
  autoCloseTab?: boolean
  clearItemOnUploadDone?: boolean
  onUploadDone?: (items: UploadItem[], queue: UploadQueueItem[]) => void
} & React.PropsWithChildren

// Components
export type UploadProps = {
  resourceKey: string
} & InputPropsWithoutRef

export type UploadWithProviderProps = UploadProviderProps & UploadProps

export type UploadDropzoneProps = {
  fileType?: FileType
}
