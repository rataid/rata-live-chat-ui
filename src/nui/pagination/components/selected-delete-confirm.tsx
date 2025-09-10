import { Form } from '@nui/form'
import { usePagination } from '@nui/pagination'
import DeleteConfirm from '@nui/ui/delete-confirm'

export function PaginationSelectedDeleteConfirm() {
  const [selectedRows] = usePagination((s) => [s.selectedRows])

  const numSelected = selectedRows.length

  const selectedRowIds = selectedRows.map((row) => row.id)

  return (
    <Form>
      <input type="hidden" name="ids" value={JSON.stringify(selectedRowIds)} />
      <DeleteConfirm>
        Are you sure you want to delete these {numSelected} records?
      </DeleteConfirm>
    </Form>
  )
}
