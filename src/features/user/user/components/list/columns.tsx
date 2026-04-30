import { ColumnDef } from '@tanstack/react-table'

import {
  PaginatedTableSelectCell,
  PaginatedTableSelectHeader,
} from '@nui/pagination'
import { pickColumns } from '@utils'

import ActionCell from './cells/action'
import ActiveCell from './cells/active'
import NotesCell from './cells/notes'
import UserCell from './cells/user'

const columnDefs: ColumnDef<any>[] = [
  {
    id: 'select',
    header: () => <PaginatedTableSelectHeader />,
    cell: ({ row }) => <PaginatedTableSelectCell row={row} />,
    size: 1,
  },
  {
    id: 'isActive',
    header: '',
    accessorFn: (row) => row.isActive,
    cell: ({ row }) => <ActiveCell row={row} />,
    size: 1,
  },
  {
    id: 'user',
    header: 'Name',
    cell: ({ row }) => <UserCell row={row} />,
  },
  {
    id: 'notes',
    header: 'Notes',
    cell: ({ row }) => <NotesCell row={row} />,
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => <ActionCell row={row} />,
    size: 1,
  },
]

const all = pickColumns(columnDefs, [
  'select',
  'isActive',
  'user',
  'notes',
  'action',
])

const userColumns = {
  all,
}

export default userColumns
