import { Row } from '@tanstack/react-table'
import { useMemo } from 'react'

import { useAuth } from '@/components/auth'
import { PaginatedTable, PaginationSelected } from '@nui/pagination'

import { usersArgs } from '../pages/list.route'
import userColumns from './list/columns'

export default function UserList() {
  const { can } = useAuth()

  const columns = userColumns.all

  const args = useMemo(() => usersArgs(), [])

  return (
    <PaginatedTable
      columns={columns}
      args={args}
      query={()=> {}}
      // filter={filter}
      selected={<PaginationSelected />}
      // rowLink={rowLink}
    />
  )
}
