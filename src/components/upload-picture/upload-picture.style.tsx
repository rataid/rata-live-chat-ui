import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const UploadPictureWrapper = styled.div.attrs({ className: tw`w-fit flex mt-1 flex-col gap-y-4 items-start` })``

export const UploadPictureImageStyle = styled.img.attrs({ className: tw`h-full w-full object-cover` })``

export const UploadPictureContent = styled.div.attrs({ className: tw`grid place-content-center gap-2` })``

export const UploadPictureInfo = styled.div.attrs({ className: tw`text-xs text-gray-500` })``

export const UploadPictureFormUpload = styled.label.attrs({ className: tw`cursor-pointer` })``
