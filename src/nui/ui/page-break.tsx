import tw, { css, styled } from 'twin.macro'

const PageBreak = styled.div(() => [
  tw`block [&:not(:last-child)]:break-after-page`,
  css`
    @media print {
      @page {
        margin: 15mm 0 0 0;
        size: Portrait;
      }
      @page :first {
        margin: 0;
      }
    }
  `,
])

export default PageBreak
