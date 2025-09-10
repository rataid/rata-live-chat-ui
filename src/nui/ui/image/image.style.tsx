import tw, { css, styled } from 'twin.macro'

import { ImageProps } from './types'

export const ImageWrapper = styled.div<
  Pick<ImageProps, 'width' | 'height' | 'cursorPointer'>
>(({ width = '24px', height = '24px', cursorPointer }) => [
  cursorPointer &&
    tw`cursor-pointer hover:(scale-105 ease-in-out duration-300)`,
  tw`shrink-0 overflow-hidden rounded-md`,
  width &&
    css`
      width: ${width};
    `,
  height &&
    css`
      height: ${height};
    `,
])

export const ImageIconWrapper = styled.div<
  Pick<ImageProps, 'width' | 'height'>
>(({ width = '24px', height = '24px' }) => [
  tw`flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary-25 text-primary-400`,
  width &&
    css`
      width: ${width};
    `,
  height &&
    css`
      height: ${height};
    `,
])

const objectMap = {
  cover: tw`object-cover`,
  'scale-down': tw`object-scale-down`,
}

export const ImageMain = styled.img<Pick<ImageProps, 'object'>>(
  ({ object }) => [tw`w-full h-full `, object && objectMap[object]]
)
