import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

type TableCellWrapperProps = {
  isMobile?: boolean
  width?: number
}

export const TableCellWrapper = styled.td.attrs<TableCellWrapperProps>(({ width, isMobile }) => ({ className: [tw`relative h-full`, !isMobile && tw`block border-b border-gray-100 last:border-b-0`].filter(Boolean).join(' ') }))<TableCellWrapperProps>`
  ${({ width, isMobile }) => width &&
      css`
        width: ${width}px;
      `}
`

export const TableCellContainer = styled.div.attrs({ className: tw`col-span-4` })``

export const TableCellMain = styled.div.attrs({ className: tw`grid grid-cols-6` })``
