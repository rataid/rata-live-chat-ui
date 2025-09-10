import tw, { css, styled } from 'twin.macro'

type ResponsiveTableProps = {
  isMobile?: boolean
}

export const TableWrapper = styled.div<ResponsiveTableProps>(({ isMobile }) => [
  isMobile && tw`border border-gray-200`,
  tw`rounded-lg overflow-hidden`,
  css`
    tbody tr:last-child {
      ${isMobile && tw`border-b-0`}
    }
  `,
])

// Create table with cell content that can fill parent td container
// https://stackoverflow.com/questions/3215553/make-a-div-fill-an-entire-table-cell
/*
table { height: 1px; } /* Will be ignored, don't worry.
tr { height: 100%; }
td { height: 100%; }
td > div { height: 100%; }
*/

export const TableMain = tw.table`w-full text-xs h-1`

export const TableBody = styled.tbody<ResponsiveTableProps>(({ isMobile }) => [
  !isMobile && tw`block`,
])

type TableRowProps = {
  disabled?: boolean
  disabledView?: boolean
} & ResponsiveTableProps

export const TableRow = styled.tr<TableRowProps>(
  ({ disabled = false, disabledView, isMobile }) => [
    disabledView
      ? css`
          td * {
            ${tw`!text-opacity-50`}
          }
        `
      : tw``,
    !disabled ? tw` hover:bg-[#fcfcfc] cursor-pointer` : tw`cursor-not-allowed`,
    isMobile
      ? tw`border-b border-gray-100 `
      : tw`block border border-gray-200 rounded-lg mb-6 overflow-hidden last:(mb-0)`,
  ]
)
