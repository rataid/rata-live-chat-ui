import tw, { styled } from 'twin.macro'

import { SectionProps } from './types'

type SectionWrapperProps = Pick<SectionProps, 'margin'>

export const SectionWrapper = styled.section<SectionWrapperProps>(
  ({ margin }) => {
    const marginMap = {
      none: tw`mb-0`,
      xs: tw`mb-2`,
      sm: tw`mb-4`,
      md: tw`mb-6`,
      lg: tw`mb-6 xl:mb-8`,
      xl: tw`mb-10`,
      '2xl': tw`mb-16`,
    }

    return [tw`relative`, margin && marginMap[margin]]
  }
)
type SectionHeaderProps = Pick<SectionProps, 'spacing'>

export const SectionHeader = styled.header<SectionHeaderProps>(
  ({ spacing }) => {
    const spacingMap = {
      none: tw`pb-0`,
      xs: tw`pb-2`,
      sm: tw`pb-4`,
      md: tw`pb-6`,
      lg: tw`pb-8`,
      xl: tw`pb-10`,
    }

    return [
      tw`flex items-center justify-between`,
      spacing && spacingMap[spacing],
    ]
  }
)

export const SectionCaption = tw.div`leading-10 flex-1 text-left`

export const SectionCaptionText = tw.h2`text-gray-900 font-bold tracking-tight`

export const SectionMore = tw.div`shrink-0`

export const SectionMain = tw.main``
