import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ImageProps } from './types'

export const ImageWrapper = styled.div.attrs<
  Pick<ImageProps, 'width' | 'height' | 'cursorPointer'>
>(({ width = '24px', height = '24px', cursorPointer }) => ({ className: [cursorPointer &&
    tw`cursor-pointer hover:scale-105 hover:ease-in-out hover:duration-300`, tw`shrink-0 overflow-hidden rounded-md`].filter(Boolean).join(' ') }))<
  Pick<ImageProps, 'width' | 'height' | 'cursorPointer'>
>`
  ${({ width = '24px', height = '24px', cursorPointer }) => width &&
    css`
      width: ${width};
    `}
  ${({ width = '24px', height = '24px', cursorPointer }) => height &&
    css`
      height: ${height};
    `}
`

export const ImageIconWrapper = styled.div.attrs<
  Pick<ImageProps, 'width' | 'height'>
>(({ width = '24px', height = '24px' }) => ({ className: [tw`flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary-25 text-primary-400`].filter(Boolean).join(' ') }))<
  Pick<ImageProps, 'width' | 'height'>
>`
  ${({ width = '24px', height = '24px' }) => width &&
    css`
      width: ${width};
    `}
  ${({ width = '24px', height = '24px' }) => height &&
    css`
      height: ${height};
    `}
`

const objectMap = {
  cover: tw`object-cover`,
  'scale-down': tw`object-scale-down`,
}

export const ImageMain = styled.img.attrs<Pick<ImageProps, 'object'>>(({ object }) => ({ className: [tw`w-full h-full `, object && objectMap[object]].filter(Boolean).join(' ') }))<Pick<ImageProps, 'object'>>``
