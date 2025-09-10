import { Paginated, PaginatedTableProps } from '@nui/pagination'

import PaginatedTableData from './table-data'

export function PaginatedTable({
  name,
  columns,
  query,
  args,
  filter,
  rowLink,
  onRowClick,
  disabled,
  disabledViewRow,
  title,
  more,
  selected,
  perPages,
  placeholder,
  children,
}: PaginatedTableProps) {
  return (
    <Paginated
      name={name}
      query={query}
      args={args}
      filter={filter}
      title={title}
      more={more}
      selected={selected}
      perPages={perPages}
      placeholder={placeholder}
    >
      {children}
      <PaginatedTableData
        {...{ disabled, disabledViewRow, columns, rowLink, onRowClick }}
      />
    </Paginated>
  )
}
