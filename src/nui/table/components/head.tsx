import { flexRender } from '@tanstack/react-table'

import { TableHeadProps } from '../types'
import { TableHeadCell, TableHeadRow, TableHeadWrapper } from './head.style'

export default function TableHead<T>({
  isMobile,
  getHeaderGroups,
}: TableHeadProps<T>) {
  return (
    <TableHeadWrapper>
      {isMobile &&
        getHeaderGroups().map((headerGroup) => (
          <TableHeadRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeadCell
                key={header.id}
                style={{
                  width: header.getSize() !== 0 ? header.getSize() : undefined,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeadCell>
            ))}
          </TableHeadRow>
        ))}
    </TableHeadWrapper>
  )
}
