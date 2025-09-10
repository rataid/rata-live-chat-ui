import { Row } from '@tanstack/react-table'
import { useState } from 'react'

import { Can } from '@/components/auth/components/can'
import { Form } from '@nui/form'
import Button from '@nui/ui/button'
import Cell from '@nui/ui/cell'
import DeleteConfirm from '@nui/ui/delete-confirm'
import Icon from '@nui/ui/icon'
import Tooltip from '@nui/ui/tooltip'

import { User } from '@gql/graphql'

type ActionCellProps = {
  row: Row<User>
}

export default function ActionCell({ row }: ActionCellProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  return (
    <Cell stopPropagate>
      <Can permissions={['user.user.delete']}>
        <Tooltip
          content={
            <Form action="/user?index" method="post">
              <input type="hidden" name="action" value="delete" />
              <input
                type="hidden"
                name="ids"
                value={JSON.stringify([row.original.id])}
              />
              <DeleteConfirm>Delete ?</DeleteConfirm>
            </Form>
          }
          open={deleteConfirmOpen}
          onOpenChange={(v) => setDeleteConfirmOpen(v)}
        >
          <Button
            type="submit"
            icon={<Icon icon="lucide-trash" />}
            variant="tertiaryGray"
            size="xs"
            onClick={() => setDeleteConfirmOpen((v) => !v)}
          />
        </Tooltip>
      </Can>
    </Cell>
  )
}
