import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'
import ContactInfo from '@nui/ui/contact-info'

type UserCellProps = {
  row: Row<any>
}

export default function UserCell({ row }: UserCellProps) {

  return (
    <Cell>
      <ContactInfo name={'test'} src="" phone={'0000'} address={'tesst@rata.id'} />
    </Cell>
  )
}
