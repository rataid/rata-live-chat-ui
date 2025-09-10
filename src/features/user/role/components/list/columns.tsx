import { ColumnDef } from '@tanstack/react-table'

import {
  PaginatedTableSelectCell,
  PaginatedTableSelectHeader,
} from '@nui/pagination'
import { pickColumns } from '@utils'

import { Role } from '@gql/graphql'

import ActionCell from './cells/action'
import RoleCell from './cells/role'

const columnDefs: ColumnDef<Role>[] = [
  {
    id: 'select',
    header: () => <PaginatedTableSelectHeader />,
    cell: ({ row }) => <PaginatedTableSelectCell row={row} />,
    size: 1,
  },
  {
    id: 'role',
    header: 'Title',
    cell: ({ row }) => <RoleCell row={row} />,
  },
  {
    id: 'action',
    header: '',
    cell: ({ row }) => <ActionCell row={row} />,
    size: 1,
  },
]

const all = pickColumns(columnDefs, ['select', 'role', 'action'])

const roleColumns = {
  all,
}

export default roleColumns
