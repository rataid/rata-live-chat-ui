import tw, { css, styled } from 'twin.macro'

import { FieldsProps } from './types'

const gapMap = {
  none: tw``,
  '2xs': tw`gap-1`,
  xs: tw`gap-2`,
  sm: tw`gap-4`,
  md: tw`gap-6`,
  lg: tw`gap-8`,
  xl: tw`gap-10`,
}

const sizeMap = {
  '2xs': tw`!text-2xs`,
  xs: tw`!text-xs`,
  sm: tw`!text-sm`,
  md: tw`!text-base`,
  lg: tw`!text-lg`,
  xl: tw`!text-xl`,
}

export const Fields = styled.div<FieldsProps>(
  ({ inline = false, gap = 'md', size = 'sm', fit = false }) => [
    fit ? tw`w-fit` : tw`w-full`,
    inline ? tw`flex` : tw`flex flex-col`,
    gapMap[gap],
    css`
      > .nui-field {
        ${sizeMap[size]}
      }
    `,
  ]
)
