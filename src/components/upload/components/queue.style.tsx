import tw from 'twin.macro'

export const UploadQueueWrapper = tw.div`p-5 w-full flex flex-col gap-y-6 mb-3`

export const UploadQueueItem = tw.div`w-full flex justify-between gap-x-4`

export const UploadQueueThumbnail = tw.div`w-10 h-10 shrink-0 bg-gray-100 rounded-md overflow-hidden`

export const UploadQueueMain = tw.div`flex-1 flex flex-col text-xs text-gray-500`

export const UploadQueueProgressContainer = tw.div`flex-1 flex items-center justify-between gap-x-4`

export const UploadQueueProgress = tw.div`flex-1 flex flex-col gap-y-2`

export const UploadQueueMessage = tw.div`text-danger-500`

export const UploadQueueClose = tw.div`absolute -top-2 -right-2`
