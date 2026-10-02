import styled, { css } from 'styled-components'
import { tw, TwStyle } from '@nui/utils/tw'

import { FieldsGap, FieldsProps, FieldsSize } from './types'

const gapMap: Record<FieldsGap, TwStyle> = {
  none: '',
  '2xs': tw`gap-1`,
  xs: tw`gap-2`,
  sm: tw`gap-4`,
  md: tw`gap-6`,
  lg: tw`gap-8`,
  xl: tw`gap-10`,
}

const fontSizeMap: Record<FieldsSize, string> = {
  '2xs': '0.68rem',
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
}

const lineHeightMap: Record<FieldsSize, string> = {
  '2xs': 'normal',
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '1.75rem',
  xl: '1.75rem',
}

export const Fields = styled.div.attrs<FieldsProps>(
  ({ inline = false, gap = 'md', fit = false }) => ({
    className: [
      fit ? tw`w-fit` : tw`w-full`,
      inline ? tw`flex` : tw`flex flex-col`,
      gapMap[gap],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<FieldsProps>`
  ${({ size = 'sm' }) => css`
    > .nui-field {
      font-size: ${fontSizeMap[size]} !important;
      ${size !== '2xs' && `line-height: ${lineHeightMap[size]} !important;`}
    }
  `}
`
