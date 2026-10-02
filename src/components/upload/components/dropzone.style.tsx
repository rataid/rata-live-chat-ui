import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const UploadDropzoneWrapper = styled.div.attrs({ className: tw`relative pb-5 flex flex-col items-center cursor-pointer` })``

export const UploadDropzoneIcon = styled.div.attrs({ className: tw`mb-3` })``

export const UploadDropzoneInfo = styled.div.attrs({ className: tw`text-center` })``

export const UploadDropzoneInfoAccent = styled.span.attrs({ className: tw`text-primary-700 font-semibold` })``

export const UploadDropzoneToggle = styled.div.attrs({ className: tw`px-2 w-full h-8 text-right text-xs z-50` })``

export const UploadDropzoneOverlay = styled.label.attrs({ className: tw`absolute inset-0` })``
