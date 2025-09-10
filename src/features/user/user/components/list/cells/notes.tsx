import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'

import { User } from '@gql/graphql'

type NotesCellProps = {
  row: Row<User>
}

export default function NotesCell({ row }: NotesCellProps) {
  const { notes } = row.original

  return (
    <Cell>
      <div>{notes}</div>
    </Cell>
  )
}
