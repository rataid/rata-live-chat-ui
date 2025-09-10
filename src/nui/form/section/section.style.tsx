import tw, { css, styled } from 'twin.macro'

import { FormSectionHeaderProps, FormSectionMainProps } from './types'

const gapMap = {
  none: tw`gap-0`,
  xs: tw`gap-1`,
  sm: tw`gap-2`,
  md: tw`gap-4`,
  lg: tw`gap-6`,
  xl: tw`gap-8`,
}

export const FormSectionWrapper = tw.div`w-full`

export const FormSectionHeader = styled.header<FormSectionHeaderProps>(
  ({ spacingHead = '24px' }) => [
    css`
      padding-bottom: ${spacingHead};
    `,
    tw`flex items-center justify-between`,
  ]
)
export const FormSectionCaption = tw.div`h-6 leading-6 flex-1 text-sm text-gray-700`

export const FormSectionCaptionText = tw.h2`text-gray-900 font-bold`

export const FormSectionMore = tw.div`shrink-0`

export const FormSectionMain = styled.main<FormSectionMainProps>(
  ({ gap = 'md' }) => [tw`flex flex-col`, gapMap[gap]]
)
