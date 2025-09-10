import tw, { css, styled } from 'twin.macro'

type TableCellWrapperProps = {
  isMobile?: boolean
  width?: number
}

export const TableCellWrapper = styled.td<TableCellWrapperProps>(
  ({ width, isMobile }) => [
    tw`relative h-full`,
    !isMobile && tw`block border-b border-gray-100 last:border-b-0`,
    width &&
      css`
        width: ${width}px;
      `,
  ]
)

export const TableCellContainer = tw.div`col-span-4`

export const TableCellMain = tw.div`grid grid-cols-6`
