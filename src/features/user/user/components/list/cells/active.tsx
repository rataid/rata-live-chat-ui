import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'
import Center from '@nui/ui/center'
import Dot from '@nui/ui/dot'

import { User } from '@gql/graphql'

type ActiveCellProps = {
  row: Row<User>
}

export default function ActiveCell({ row }: ActiveCellProps) {
  const { isActive } = row.original

  return (
    <Cell>
      <Center>
        <Dot size="sm" outline color={isActive ? 'success' : 'disable'} />
      </Center>
    </Cell>
  )
}
