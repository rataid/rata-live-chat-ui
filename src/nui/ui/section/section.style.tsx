import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { SectionProps } from './types'

type SectionWrapperProps = Pick<SectionProps, 'margin'>

const marginMap: Record<NonNullable<SectionProps['margin']>, string> = {
  none: tw`mb-0`,
  xs: tw`mb-2`,
  sm: tw`mb-4`,
  md: tw`mb-6`,
  lg: tw`mb-6 xl:mb-8`,
  xl: tw`mb-10`,
  '2xl': tw`mb-16`,
}

export const SectionWrapper = styled.section.attrs<SectionWrapperProps>(
  ({ margin }) => ({
    className: [tw`relative`, margin && marginMap[margin]]
      .filter(Boolean)
      .join(' '),
  })
)<SectionWrapperProps>``

type SectionHeaderProps = Pick<SectionProps, 'spacing'>

const spacingMap: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: tw`pb-0`,
  xs: tw`pb-2`,
  sm: tw`pb-4`,
  md: tw`pb-6`,
  lg: tw`pb-8`,
  xl: tw`pb-10`,
}

export const SectionHeader = styled.header.attrs<SectionHeaderProps>(
  ({ spacing }) => ({
    className: [
      tw`flex items-center justify-between`,
      spacing && spacingMap[spacing],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<SectionHeaderProps>``

export const SectionCaption = styled.div.attrs({
  className: tw`leading-10 flex-1 text-left`,
})``

export const SectionCaptionText = styled.h2.attrs({
  className: tw`text-gray-900 font-bold tracking-tight`,
})``

export const SectionMore = styled.div.attrs({
  className: tw`shrink-0`,
})``

export const SectionMain = styled.main.attrs({ className: tw`` })``
