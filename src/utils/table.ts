// Some utilities for table (react-table, etc).
import { ColumnDef } from '@tanstack/react-table'

export const pickColumns = <T>(
  columns: ColumnDef<T>[],
  arrColumn: string[]
): ColumnDef<T>[] => {
  const columnList = arrColumn.map((column) => {
    const match = columns.find((col) => col.id === column)

    if (!match) {
      throw new Error(`Column ${column} not found`)
    }

    return match
  }) as ColumnDef<T>[]

  return columnList ?? []

  // return columns.filter((column) => arrColumn.includes(column.id ?? ''))
}
