import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

const PageBreak = styled.div.attrs(() => ({ className: [tw`block [&:not(:last-child)]:break-after-page`].filter(Boolean).join(' ') }))`
  ${() => css`
    @media print {
      @page {
        margin: 15mm 0 0 0;
        size: Portrait;
      }
      @page :first {
        margin: 0;
      }
    }
  `}
`

export default PageBreak
