import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { randomString } from '@utils'

import {
  UploadAction,
  UploadItem,
  UploadQueueStatus,
  UploadState,
  UploadStoreProps,
} from './types'
import { countOnProgress } from './utils'

const parseItems = (items?: UploadItem[]) => {
  return JSON.stringify(items?.map((i) => i?.id)) ?? ''
}

export type UploadStore = ReturnType<typeof uploadStore>

const uploadStore = ({
  defaultItems,
  currentTab,
  fileType = 'image',
  maxFiles,
  maxSize,
  fileNamingRules,
  hidePreview = false,
  clearItemOnUploadDone = false,
  autoCloseTab = true,
  onUploadDone,
}: UploadStoreProps) => {
  const DEFAULT_PROPS: UploadState = {
    parsedValue: parseItems(defaultItems ?? []),
    onUploadDone,
    isFocused: false,
    items: defaultItems ?? [],
    resourceKey: 'default',
    queue: [],
    currentTab: currentTab ?? 'dropzone',
    pendingQueueCount: 0,
    status: {
      isDone: true,
    },
    done: true,
    fileType,
    maxFiles,
    maxSize,
    fileNamingRules,
    deletedItemCount: 0,
    clearItemOnUploadDone,
    autoCloseTab,
    hidePreview,
  }

  return createStore<UploadState & UploadAction>()(
    immer<UploadState & UploadAction>((set, get) => ({
      ...DEFAULT_PROPS,
      syncParsedValue: () =>
        set((s) => {
          s.parsedValue = parseItems(s.items)
        }),
      setIsFocused: (isFocused) =>
        set((s) => {
          s.isFocused = isFocused
        }),
      setCurrentTab: (tab) =>
        set((s) => {
          s.currentTab = tab
        }),
      setResourceKey: (resourceKey) =>
        set((s) => {
          s.resourceKey = resourceKey
        }),
      loadItems: (items) => {
        set((s) => {
          s.items = items ?? []
        })
        get().syncParsedValue()
      },
      addItem: (item) => {
        set((s) => {
          s.items.push(item)
        })
        get().syncParsedValue()
        if (
          get()?.onUploadDone &&
          get().deletedItemCount + get().items.length === get().queue.length
        ) {
          get()?.onUploadDone?.(get().items, get().queue)
          if (get().clearItemOnUploadDone) {
            get().clearItems()
          }
        }
      },
      addQueueItems: (files: File[]) =>
        set((s) => {
          files.forEach((file) => {
            const newQueueItem = {
              id: randomString(24),
              filename: file.name,
              progress: 0,
              progressPercent: 0,
              status: UploadQueueStatus.PENDING,
              file,
            }
            s.queue.push(newQueueItem)
          })
          s.currentTab = 'queue'
          s.status.isDone = false
          s.done = false
        }),
      setQueueItemProgress: (id, progress) => {
        set((s) => {
          const currentItem = s.queue.findIndex((item) => item.id === id)
          if (currentItem > -1) {
            if (progress === -1) {
              s.queue[currentItem].status = UploadQueueStatus.ERROR
            } else if (progress === 0) {
              s.queue[currentItem].status = UploadQueueStatus.PENDING
            } else if (progress === 100) {
              s.queue[currentItem].progress = progress
              s.queue[currentItem].progressPercent = progress / 100
              s.queue[currentItem].status = UploadQueueStatus.COMPLETED
            } else {
              s.queue[currentItem].progress = progress
              s.queue[currentItem].progressPercent = progress / 100
              s.queue[currentItem].status = UploadQueueStatus.UPLOADING
            }
            s.pendingQueueCount = countOnProgress(s.queue)
          }
        })

        if (get().pendingQueueCount === 0 && get().autoCloseTab) {
          get().setDone()
        }
      },
      updateQueue: (id, assetId) => {
        set((s) => {
          const updatedQueue = s.queue.map((item) =>
            item.id === id ? { ...item, assetId } : item
          )
          return { queue: updatedQueue }
        })
      },
      setMessageError: (assetId, errorMessage) => {
        set((s) => {
          const updatedQueue = s.queue.map((item) =>
            item.assetId === assetId ? { ...item, errorMessage } : item
          )
          return { queue: updatedQueue }
        })
      },
      setDone: () => {
        set((s) => {
          s.status.isDone = true
          s.done = true
          s.currentTab = 'dropzone'
        })
        get().syncParsedValue()
      },
      removeItem: (id) => {
        set((s) => {
          const currentItem = s.items.findIndex((item) => item?.id === id)
          if (currentItem > -1) {
            s.items.splice(currentItem, 1)
            s.deletedItemCount += 1
          }
        })
        get().syncParsedValue()
      },
      clearItems: () => {
        set((s) => {
          s.deletedItemCount += s.items.length
          s.items = []
        })
        get().syncParsedValue()
      },
    }))
  )
}

export default uploadStore
