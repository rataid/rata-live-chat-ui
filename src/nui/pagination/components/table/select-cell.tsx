import { Row } from '@tanstack/react-table'
import { some } from 'lodash'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { usePagination } from '@nui/pagination'
import Cell from '@nui/ui/cell'
import Center from '@nui/ui/center'
import Checkbox from '@nui/ui/checkbox'

type ColSelectProps = {
  row: Row<any>
}

export function PaginatedTableSelectCell({ row }: ColSelectProps) {
  const [checked, setChecked] = useState(false)

  const [selectRow, selectedRows] = usePagination(
    (s) => [s.toggleSelect, s.selectedRows],
    shallow
  )

  const onChange = () => {
    selectRow(row)
  }

  // @todo:
  // Temporary cut out from pagination store, due to bug on unchecked checkbox
  // Should consider to refactor and move this to pagination store again.

  useEffect(() => {
    const selectedItem = row.original ?? row

    const isChecked = some(
      selectedRows,
      (selectedRow) => selectedRow.id === selectedItem.id
    )

    setChecked(isChecked)
  }, [selectedRows, row])

  return (
    <Cell>
      <Center>
        <Checkbox scale="md" checked={checked} onChange={onChange} />
      </Center>
    </Cell>
  )
}
