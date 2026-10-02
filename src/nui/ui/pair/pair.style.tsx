import styled, { css } from 'styled-components'

import { PairProps } from './types'

const gapXMap = {
  none: 'padding-right: 0;',
  xs: 'padding-right: 0.25rem;',
  sm: 'padding-right: 0.5rem;',
  md: 'padding-right: 1rem;',
  lg: 'padding-right: 1.5rem;',
  xl: 'padding-right: 2rem;',
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
  none: 'padding-top: 0; padding-bottom: 0;',
  xs: 'padding-top: 0; padding-bottom: 0;',
  sm: 'padding-top: 0.25rem; padding-bottom: 0.25rem;',
  md: 'padding-top: 0.5rem; padding-bottom: 0.5rem;',
  lg: 'padding-top: 1rem; padding-bottom: 1rem;',
  xl: 'padding-top: 1.5rem; padding-bottom: 1.5rem;',
}

const fontSizeMap = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
}

type PairWrapperProps = PairProps

export const PairWrapper = styled.div<PairWrapperProps>`
  display: inline-table;
  width: 100%;
  border-collapse: collapse;

  ${({ fontSize = 'md' }) => css`
    font-size: ${fontSizeMap[fontSize]};
  `}

  ${({ gapX = 'sm', gapY = 'sm', separator: symbol = ':' }) => css`
    .entry-name {
      vertical-align: middle;
      ${gapXMap[gapX]}
      ${gapYMap[gapY]}
    }

    .entry-value {
      display: flex;
      vertical-align: middle;
      ${gapYMap[gapY]}
    }

    ${symbol
      ? css`
          &::before {
            content: '${symbol}';
            padding: ${separatorPaddingMap[gapX]};
          }
        `
      : ''}
  `}
`

export const PairMain = styled.div<PairWrapperProps>`
  display: table-row-group;

  ${({ divide = false }) =>
    divide
      ? css`
          & > * + * {
            border-top: 1px dashed var(--nui-color-gray-200);
          }
        `
      : ''}
`
