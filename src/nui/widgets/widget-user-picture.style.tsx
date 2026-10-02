import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const WidgetUserPictureWrapper = styled.div.attrs({ className: tw`` })``

export const WidgetUserPictureImage = styled.div.attrs({ className: tw`m-auto mb-6 w-fit` })``

export const WidgetUserPictureImageStyle = styled.img.attrs({ className: tw`h-full w-full object-cover` })``

export const WidgetUserPictureContent = styled.div.attrs({ className: tw`flex flex-col items-center justify-center gap-2 px-8` })``

export const WidgetUserPictureInfo = styled.div.attrs({ className: tw`text-center text-xs text-gray-700` })``

export const WidgetUserPictureFormUpload = styled.label.attrs({ className: tw`cursor-pointer` })``
