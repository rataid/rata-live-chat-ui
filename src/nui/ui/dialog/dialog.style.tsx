import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { DialogSize } from './types'

// `$` prefix keeps the prop from being forwarded to the DOM element
type DialogContainerProps = { $size: DialogSize }

const sizes: Record<DialogSize, string> = {
  sm: tw`max-w-[25rem]`,
  md: tw`max-w-[31.25rem]`,
  lg: tw`max-w-[37.5rem]`,
}

export const DialogOverlay = styled.div.attrs({
  className: tw`flex min-h-full w-full items-center justify-center bg-gray-900/40 p-4`,
})``

export const DialogContainer = styled.div.attrs<DialogContainerProps>(
  ({ $size }) => ({
    className: [
      tw`relative flex max-h-[min(1000px,calc(100vh-2rem))] w-full flex-col rounded-[10px] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] outline-none`,
      sizes[$size],
    ].join(' '),
  })
)<DialogContainerProps>``

export const DialogHeader = styled.h2.attrs({
  className: tw`flex items-center justify-between gap-3 border-b border-gray-200 p-5 text-base font-semibold text-gray-900 sm:text-lg`,
})``

export const DialogCloseButton = styled.button.attrs({
  className: tw`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700`,
})``

export const DialogBody = styled.div.attrs({
  className: tw`overflow-y-auto border-b border-gray-200 p-5 text-sm leading-6 text-gray-500`,
})``

export const DialogFooter = styled.div.attrs({
  className: tw`flex gap-3 p-5 [&>*]:flex-1`,
})``
