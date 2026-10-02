import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const UploadQueueWrapper = styled.div.attrs({ className: tw`p-5 w-full flex flex-col gap-y-6 mb-3` })``

export const UploadQueueItem = styled.div.attrs({ className: tw`w-full flex justify-between gap-x-4` })``

export const UploadQueueThumbnail = styled.div.attrs({ className: tw`w-10 h-10 shrink-0 bg-gray-100 rounded-md overflow-hidden` })``

export const UploadQueueMain = styled.div.attrs({ className: tw`flex-1 flex flex-col text-xs text-gray-500` })``

export const UploadQueueProgressContainer = styled.div.attrs({ className: tw`flex-1 flex items-center justify-between gap-x-4` })``

export const UploadQueueProgress = styled.div.attrs({ className: tw`flex-1 flex flex-col gap-y-2` })``

export const UploadQueueMessage = styled.div.attrs({ className: tw`text-danger-500` })``

export const UploadQueueClose = styled.div.attrs({ className: tw`absolute -top-2 -right-2` })``
