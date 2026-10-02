import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

type ResponsiveTableProps = {
  isMobile?: boolean
}

export const TableWrapper = styled.div.attrs<ResponsiveTableProps>(
  ({ isMobile }) => ({
    className: [
      isMobile && tw`border border-gray-200`,
      tw`rounded-lg overflow-hidden`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<ResponsiveTableProps>`
  tbody tr:last-child {
    ${({ isMobile }: ResponsiveTableProps) =>
      isMobile &&
      css`
        border-bottom-width: 0;
      `}
  }
`

// Create table with cell content that can fill parent td container
// https://stackoverflow.com/questions/3215553/make-a-div-fill-an-entire-table-cell
/*
table { height: 1px; } /* Will be ignored, don't worry.
tr { height: 100%; }
td { height: 100%; }
td > div { height: 100%; }
*/

export const TableMain = styled.table.attrs({
  className: tw`w-full text-xs h-1`,
})``

export const TableBody = styled.tbody.attrs<ResponsiveTableProps>(
  ({ isMobile }) => ({
    className: [!isMobile && tw`block`].filter(Boolean).join(' '),
  })
)<ResponsiveTableProps>``

type TableRowProps = {
  disabled?: boolean
  disabledView?: boolean
} & ResponsiveTableProps

export const TableRow = styled.tr.attrs<TableRowProps>(
  ({ disabled = false, isMobile }) => ({
    className: [
      !disabled ? tw`hover:bg-[#fcfcfc] cursor-pointer` : tw`cursor-not-allowed`,
      isMobile
        ? tw`border-b border-gray-100`
        : tw`block border border-gray-200 rounded-lg mb-6 overflow-hidden last:mb-0`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<TableRowProps>`
  ${({ disabledView }) =>
    disabledView &&
    css`
      td * {
        --tw-text-opacity: 0.5 !important;
      }
    `}
`
