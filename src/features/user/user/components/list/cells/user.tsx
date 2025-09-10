import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'
import ContactInfo from '@nui/ui/contact-info'

import { User } from '@gql/graphql'

type UserCellProps = {
  row: Row<User>
}

export default function UserCell({ row }: UserCellProps) {
  const { name, phone, email } = row.original

  return (
    <Cell>
      <ContactInfo name={name} src="" phone={phone} address={email} />
    </Cell>
  )
}
