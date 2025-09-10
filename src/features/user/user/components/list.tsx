import { Row } from '@tanstack/react-table'
import { useMemo } from 'react'

import { useAuth } from '@/components/auth'
import { PaginatedTable, PaginationSelected } from '@nui/pagination'

import { QueryMode, User, UsersQueryVariables } from '@gql/graphql'
import { usersQuery } from '@models/user/user'

import { usersArgs } from '../pages/list.route'
import userColumns from './list/columns'

export default function UserList() {
  const { can } = useAuth()

  const columns = userColumns.all

  const args = useMemo(() => usersArgs(), [])

  const query = usersQuery

  const filter = (q: string): Pick<UsersQueryVariables, 'where'> => ({
    where: {
      OR: [
        { name: { contains: q, mode: QueryMode.Insensitive } },
        { phone: { contains: q, mode: QueryMode.Insensitive } },
        { email: { contains: q, mode: QueryMode.Insensitive } },
      ],
    },
  })

  const rowLink = (row: Row<User>) => {
    if (can(['user.user.update'])) {
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
