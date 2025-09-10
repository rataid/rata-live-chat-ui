import { Row } from '@tanstack/react-table'
import { useMemo } from 'react'

import { useAuth } from '@/components/auth'
import { PaginatedTable, PaginationSelected } from '@nui/pagination'

import { QueryMode, Role, RolesQueryVariables } from '@gql/graphql'
import { rolesQuery } from '@models/role/role'

import { rolesArgs } from '../pages/list.route'
import roleColumns from './list/columns'

export default function RoleList() {
  const { can } = useAuth()

  const columns = roleColumns.all

  const args = useMemo(() => rolesArgs(), [])

  const query = rolesQuery

  const filter = (q: string): Pick<RolesQueryVariables, 'where'> => ({
    where: {
      OR: [{ title: { contains: q, mode: QueryMode.Insensitive } }],
    },
  })

  const rowLink = (row: Row<Role>) => {
    if (can(['user.role.update'])) {
      return `${row.original.id}/edit`
    }

    return `${row.original.id}/detail`
  }

  return (
    <PaginatedTable
      columns={columns}
      args={args}
      query={query}
      filter={filter}
      selected={<PaginationSelected />}
      rowLink={rowLink}
    />
  )
}
