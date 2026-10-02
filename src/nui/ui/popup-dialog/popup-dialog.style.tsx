import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { PopupDialogSize } from './types'

// `$` prefix keeps the prop from being forwarded to the DOM element
type PopupDialogContainerProps = { $size: PopupDialogSize }

const sizes: Record<PopupDialogSize, string> = {
  sm: tw`max-w-[25rem]`,
  md: tw`max-w-[31.25rem]`,
  lg: tw`max-w-[37.5rem]`,
}

export const PopupDialogOverlay = styled.div.attrs({
  className: tw`flex min-h-full w-full items-center justify-center bg-gray-900/40 p-4`,
})``

export const PopupDialogContainer = styled.div.attrs<PopupDialogContainerProps>(
  ({ $size }) => ({
    className: [
      tw`flex max-h-[min(1000px,calc(100vh-2rem))] w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] outline-none`,
      sizes[$size],
    ].join(' '),
  })
)<PopupDialogContainerProps>``

export const PopupDialogHeader = styled.h2.attrs({
  className: tw`border-b border-gray-200 p-5 text-base font-semibold text-gray-900 sm:text-lg`,
})``

export const PopupDialogBody = styled.div.attrs({
  className: tw`overflow-y-auto border-b border-gray-200 p-5 text-sm leading-6 text-gray-500`,
})``

export const PopupDialogFooter = styled.div.attrs({
  className: tw`flex gap-3 p-5 [&>*]:flex-1`,
})``
