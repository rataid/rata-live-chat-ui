import { Row } from '@tanstack/react-table'

import Cell from '@nui/ui/cell'

type NotesCellProps = {
  row: Row<any>
}

export default function NotesCell({ row }: NotesCellProps) {

  return (
    <Cell>
      <div>{"notes"}</div>
    </Cell>
  )
}
