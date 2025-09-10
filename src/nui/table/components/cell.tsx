import { flexRender } from '@tanstack/react-table'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { TableCellProps } from '../types'
import {
  TableCellContainer,
  TableCellMain,
  TableCellWrapper,
} from './cell.style'

export default function TableCell<T>({
  index,
  isMobile,
  cell,
  handleRowLink,
  children,
}: TableCellProps<T>) {
  const TableCellMainResponsive = isMobile ? Fragment : TableCellMain

  const TableCellContainerResponsive = isMobile ? Fragment : TableCellContainer

  const columnSelectId = !isMobile
    ? !['select'].includes(cell.column.columnDef.id ?? '')
    : true

  return (
    <TableCellWrapper
      isMobile={isMobile}
      width={
        cell.column.getSize() !== 0 && isMobile
          ? cell.column.getSize()
          : undefined
      }
    >
      {/* Don't render link on defined columns, such as: select and action */}
      <TableCellMainResponsive>
        {children}
        {columnSelectId && (
          <TableCellContainerResponsive>
            {['select', 'action'].includes(cell.column.columnDef.id ?? '') ? (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            ) : (
              <Link to={handleRowLink()} tabIndex={index > 0 ? -1 : undefined}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Link>
            )}
          </TableCellContainerResponsive>
        )}
      </TableCellMainResponsive>
    </TableCellWrapper>
  )
}
