import { shallow } from 'zustand/shallow'

import { usePagination } from '@nui/pagination'
import { PaginatedTableDataProps } from '@nui/pagination/types'
import Table from '@nui/table'

export default function PaginatedTableData({
  disabled,
  disabledViewRow,
  columns,
  rowLink,
  onRowClick,
}: PaginatedTableDataProps) {
  const [data] = usePagination((s) => [s.data], shallow)

  const rows = data?.nodes ?? []

  return (
    <Table
      {...{ disabled, disabledViewRow, columns, rows, rowLink, onRowClick }}
    />
  )
}
