import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const UploadPreviewWrapper = styled.div.attrs({ className: tw`flex gap-6 flex-wrap` })``

type UploadPreviewItemProps = {
  isFile?: boolean
}
export const UploadPreviewItem = styled.div.attrs<UploadPreviewItemProps>(({ isFile }) => ({ className: [isFile ? tw`w-fit h-fit` : tw`w-[7.5rem] h-[7.5rem]`, tw`relative flex items-end`].filter(Boolean).join(' ') }))<UploadPreviewItemProps>``

// Item with random background color
export const UploadPreviewThumbnail = styled.div.attrs({ className: tw`w-[6.375rem] h-[6.375rem] rounded-md overflow-hidden` })``

export const UploadPreviewFile = styled.div.attrs({ className: tw`flex items-center gap-x-2 whitespace-nowrap px-3 py-1 text-xs` })``

export const UploadPreviewDelete = styled.div.attrs({ className: tw`absolute top-0 right-0 invisible` })``
