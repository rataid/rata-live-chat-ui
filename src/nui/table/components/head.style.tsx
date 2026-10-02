import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const TableHeadWrapper = styled.thead.attrs({ className: tw`border-b border-gray-200 text-xs font-semibold text-gray-700 rounded-tl rounded-tr` })``

export const TableHeadRow = styled.tr.attrs({ className: tw`h-full` })``

export const TableHeadCell = styled.th.attrs({ className: tw`px-4 py-3 h-5 leading-none text-left whitespace-nowrap` })``
