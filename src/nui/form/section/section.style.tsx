import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { FormSectionHeaderProps, FormSectionMainProps } from './types'

const gapMap: Record<NonNullable<FormSectionMainProps['gap']>, string> = {
  none: tw`gap-0`,
  xs: tw`gap-1`,
  sm: tw`gap-2`,
  md: tw`gap-4`,
  lg: tw`gap-6`,
  xl: tw`gap-8`,
}

export const FormSectionWrapper = styled.div.attrs({
  className: tw`w-full`,
})``

export const FormSectionHeader = styled.header.attrs<FormSectionHeaderProps>(
  ({ spacingHead = '24px' }) => ({
    style: { paddingBottom: spacingHead },
    className: tw`flex items-center justify-between`,
  })
)<FormSectionHeaderProps>``

export const FormSectionCaption = styled.div.attrs({
  className: tw`h-6 leading-6 flex-1 text-sm text-gray-700`,
})``

export const FormSectionCaptionText = styled.h2.attrs({
  className: tw`text-gray-900 font-bold`,
})``

export const FormSectionMore = styled.div.attrs({
  className: tw`shrink-0`,
})``

export const FormSectionMain = styled.main.attrs<FormSectionMainProps>(
  ({ gap = 'md' }) => ({
    className: [tw`flex flex-col`, gapMap[gap]].filter(Boolean).join(' '),
  })
)<FormSectionMainProps>``
