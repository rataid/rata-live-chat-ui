import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'

import { Role } from '@gql/graphql'

type RoleCellProps = {
  row: Row<Role>
}

export default function RoleCell({ row }: RoleCellProps) {
  const { title } = row.original

  return (
    <Cell>
      <div tw="text-sm font-semibold text-gray-900">{title}</div>
    </Cell>
  )
}
