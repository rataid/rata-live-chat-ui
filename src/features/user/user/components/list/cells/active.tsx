import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'
import Center from '@nui/ui/center'
import Dot from '@nui/ui/dot'

type ActiveCellProps = {
  row: Row<any>
}

export default function ActiveCell({ row }: ActiveCellProps) {

  return (
    <Cell>
      <Center>
        <Dot size="sm" outline color={true ? 'success' : 'disable'} />
      </Center>
    </Cell>
  )
}
