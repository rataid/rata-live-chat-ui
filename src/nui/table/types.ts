import { Cell, ColumnDef, HeaderGroup, Row } from '@tanstack/react-table'
import { PropsWithChildren } from 'react'

export type TableProps<T> = {
  isMobile?: boolean
  hideCells?: string[]
  columns?: ColumnDef<T, any>[]
  rows?: T[] | null
  rowLink?: (row: Row<T>) => string
  disabled?: (row: Row<T>) => boolean
  disabledViewRow?: (row: Row<T>) => boolean
  onRowClick?: (row: Row<T>, e?: React.MouseEvent) => void
} & React.PropsWithChildren

export type TableHeadProps<T> = {
  isMobile?: boolean
  getHeaderGroups: () => HeaderGroup<T>[]
}

export type TableHeadSideProps<T> = {
  index: number
  isMobile?: boolean
  hideCells: string[]
  selectId: string[]
  getHeaderGroups: () => HeaderGroup<T>[]
  getVisibleCells: () => Cell<T, unknown>[]
}

export type TableCellProps<T> = {
  index: number
  isMobile?: boolean
  cell: Cell<T, unknown>
  handleRowLink: () => string
} & PropsWithChildren
