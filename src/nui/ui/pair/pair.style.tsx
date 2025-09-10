import tw, { css, styled } from 'twin.macro'

import { PairProps } from './types'

const gapXMap = {
  none: tw`pr-0`,
  xs: tw`pr-1`,
  sm: tw`pr-2`,
  md: tw`pr-4`,
  lg: tw`pr-6`,
  xl: tw`pr-8`,
}

const separatorPaddingMap = {
  none: '0 0.1rem',
  xs: '0 0.3rem',
  sm: '0 0.6rem',
  md: '0 0.8rem',
  lg: '0 1rem',
  xl: '0 1.2rem',
}

const gapYMap = {
  none: tw`py-0`,
  xs: tw`py-0`,
  sm: tw`py-1`,
  md: tw`py-2`,
  lg: tw`py-4`,
  xl: tw`py-6`,
}

const fontSizeMap = {
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
  xl: tw`text-xl`,
}

type PairWrapperProps = PairProps

export const PairWrapper = styled.div<PairWrapperProps>(
  ({ gapX = 'sm', gapY = 'sm', separator: symbol = ':', fontSize = 'md' }) => [
    tw`inline-table border-collapse w-full`,
    fontSizeMap[fontSize],

    css`
      .entry-name {
        vertical-align: middle;
        ${gapXMap[gapX]}
        ${gapYMap[gapY]}
      }
      .entry-value {
        display: flex;
        vertical-align: middle;
        ${gapYMap[gapY]}
      ${
        symbol &&
        `
        &::before {
          content: "${symbol}";
          padding: ${separatorPaddingMap[gapX]};
        }
        `
      }
    `,
  ]
)

export const PairMain = styled.div<PairWrapperProps>(({ divide = false }) => [
  divide && tw`divide-y divide-dashed divide-gray-200`,
  tw`table-row-group`,
])
