import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const PreviewImages = styled.div.attrs({ className: tw`flex gap-4 flex-wrap` })``

// export const PreviewImageItem = styled.div.attrs({ className: tw`relative flex h-[5.5rem] w-[5.5rem] md:w-[7.5rem] md:h-[7.5rem] items-end` })``
export const PreviewImageItem = styled.div.attrs({ className: tw`relative flex h-[48px] w-[48px] items-end` })``

export const PreviewImageFile = styled.div.attrs({ className: tw`flex items-center gap-x-2 whitespace-nowrap px-3 py-1 text-xs` })``

export const PreviewImageDelete = styled.div.attrs({ className: tw`absolute -top-4 -right-4 visible md:invisible` })``
