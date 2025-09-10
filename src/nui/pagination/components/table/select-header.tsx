import { usePagination } from '@nui/pagination'
import Checkbox from '@nui/ui/checkbox'

export function PaginatedTableSelectHeader() {
  const [isSelectedAll, selectAllRows] = usePagination((s) => [
    s.isSelectedAll,
    s.selectAll,
  ])

  return (
    <div tw="xl:text-center">
      <Checkbox
        scale="md"
        checked={isSelectedAll}
        onChange={() => {
          selectAllRows()
        }}
      />
    </div>
  )
}
