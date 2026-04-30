import { flexRender } from '@tanstack/react-table'
import { Fragment } from 'react'

import { TableHeadSideProps } from '../types'
import { TableHeadSideMain, TableHeadSideWrapper } from './side.style'

export default function TableHeadSide<T>({
  index,
  isMobile,
  hideCells,
  selectId,
  getHeaderGroups,
  getVisibleCells,
}: TableHeadSideProps<T>) {
  return !isMobile ? (
    <>
      {getHeaderGroups().map((headerGroup) => {
        const tableHeaderGroups = headerGroup?.headers?.filter(
          (item) => !hideCells.includes(item.column.columnDef.id ?? '')
        )

        const isPlaceholder = tableHeaderGroups[index]?.isPlaceholder

        const columnDefId = selectId.includes(
          tableHeaderGroups[index]?.column.columnDef.id ?? ''
        )

        const filterRows = getVisibleCells().filter((items) =>
          selectId.includes(items.column.id)
        )

        const columnDefHeader =
          tableHeaderGroups[index]?.column.columnDef.header

        return (
          <Fragment 
          // key={headerGroup.id}
          >
            {isPlaceholder || columnDefId ? (
              filterRows.map((item) => (
                <TableHeadSideWrapper key={item.id}>
                  {flexRender(item.column.columnDef.cell, item.getContext())}
                </TableHeadSideWrapper>
              ))
            ) : (
              <TableHeadSideMain>
                {!['date', 'createdAt'].includes(
                  tableHeaderGroups[index]?.column.columnDef.id ?? ''
                ) &&
                  flexRender(
                    columnDefHeader,
                    tableHeaderGroups[index]?.getContext()
                  )}
              </TableHeadSideMain>
            )}
          </Fragment>
        )
      })}
    </>
  ) : null
}
