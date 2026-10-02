import { Row, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useResponsive } from 'ahooks'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { key } from '../../utils/common'
import TableCell from './components/cell'
import { TableCellWrapper } from './components/cell.style'
import TableHead from './components/head'
import TableHeadSide from './components/side'
import { TableBody, TableMain, TableRow, TableWrapper } from './table.style'
import { TableProps } from './types'

export function Table<T>({
  isMobile = true,
  disabled,
  columns,
  rows,
  rowLink,
  onRowClick,
  disabledViewRow,
  children,
}: TableProps<T>) {
  const navigate = useNavigate()

  const data = useMemo(() => rows || [], [rows])

  const table = useReactTable<T>({
    data,
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  })

  const arrChildren = React.Children.toArray(children)

  const handleRowClick = (row: Row<T>, e: React.MouseEvent) => {
    if (disabled && disabled(row)) {
      navigate('')
    } else if (onRowClick) {
      onRowClick(row, e)
    }
  }

  const handleRowLink = (row: Row<T>): string => {
    if (disabled && disabled(row)) {
      return ''
    }
    if (rowLink) {
      return rowLink(row)
    }

    return ''
  }

  const responsive = useResponsive()

  const xl = isMobile ? responsive.xl : true

  let hideCells = ['date', 'createdAt']

  const selectId = ['select']

  const columnDefIds = table
    .getHeaderGroups()[0]
    .headers.map((header) => header.column.columnDef.id)
  const findIndexColumnDefIds = columnDefIds.findIndex((obj) =>
    selectId.includes(obj ?? '')
  )

  let withSelectId = '' as string | undefined

  if (
    findIndexColumnDefIds !== -1 &&
    findIndexColumnDefIds + 1 < columnDefIds.length
  ) {
    withSelectId = columnDefIds[findIndexColumnDefIds + 1]
  }

  if (withSelectId && hideCells.includes(withSelectId)) {
    hideCells = hideCells.filter((item) => item === withSelectId)
  } else {
    hideCells = []
  }

  return (
    <TableWrapper isMobile={xl}>
      <TableMain>
        <TableHead
          isMobile={xl}
          getHeaderGroups={() => table.getHeaderGroups()}
        />

        <TableBody isMobile={xl}>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const getVisibleCells = row
                .getVisibleCells()
                .filter((filteritem) =>
                  !xl && hideCells.length > 0
                    ? !selectId.includes(filteritem.column.id)
                    : filteritem.column.id
                )

              return (
                <TableRow
                  key={key(row.original)}
                  isMobile={xl}
                  onClick={(e) => handleRowClick(row, e)}
                  disabled={disabled && disabled(row)}
                  disabledView={disabledViewRow && disabledViewRow(row)}
                >
                  {getVisibleCells.map((cell, index) => {
                    return (
                      <TableCell<T>
                        // key={cell.id}
                        index={index}
                        cell={cell}
                        isMobile={xl}
                        handleRowLink={() => handleRowLink(row)}
                      >
                        <TableHeadSide
                          index={index}
                          isMobile={xl}
                          selectId={selectId}
                          getHeaderGroups={() => table.getHeaderGroups()}
                          hideCells={hideCells}
                          getVisibleCells={() => row.getVisibleCells()}
                        />
                      </TableCell>
                    )
                  })}
                  {!xl && arrChildren.length > 1 && (
                    <TableRow isMobile={xl}>
                      {arrChildren.length > 1 && children}
                    </TableRow>
                  )}
                </TableRow>
              )
            })
          ) : (
            <TableRow isMobile={xl}>
              <TableCellWrapper colSpan={columns?.length} isMobile={xl}>
                <div className="py-10 text-center">No data available</div>
              </TableCellWrapper>
            </TableRow>
          )}
          {xl && arrChildren.length > 1 && (
            <TableRow isMobile={xl}>
              {arrChildren.length > 1 && children}
            </TableRow>
          )}
        </TableBody>
      </TableMain>
      {arrChildren.length === 1 && children}
    </TableWrapper>
  )
}
