import { Icon } from '@iconify/react'
import { useResponsive } from 'ahooks'
import { useState } from 'react'
import { shallow } from 'zustand/shallow'

import { PaginatedTableSelectedProps, usePagination } from '@nui/pagination'
import Button from '@nui/ui/button'
import Tooltip from '@nui/ui/tooltip'

import { PaginationSelectedDeleteConfirm } from './selected-delete-confirm'
import {
  PaginationSelectedAction,
  PaginationSelectedActionCancel,
  PaginationSelectedActionDelete,
  PaginationSelectedMain,
  PaginationSelectedStatus,
  PaginationSelectedStatusLabel,
  PaginationSelectedStatusNum,
  PaginationSelectedWrapper,
} from './selected.style'

export function PaginationSelected({
  hideDelete = false,
  children,
}: PaginatedTableSelectedProps) {
  const { sm, xl } = useResponsive()

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

  const [selectedRows, clearSelections] = usePagination(
    (s) => [s.selectedRows, s.clearSelections],
    shallow
  )

  const numSelected = selectedRows.length

  return (
    <PaginationSelectedWrapper>
      <PaginationSelectedMain spacing=".75rem" align="center">
        <PaginationSelectedStatus>
          <PaginationSelectedStatusNum>
            {numSelected}
          </PaginationSelectedStatusNum>
          <PaginationSelectedStatusLabel>
            records selected
          </PaginationSelectedStatusLabel>
        </PaginationSelectedStatus>
        <PaginationSelectedAction>
          <PaginationSelectedActionCancel>
            <Button
              type="button"
              variant="secondaryGray"
              size={xl ? 'md' : 'sm'}
              icon={<Icon icon="lucide:corner-up-left" />}
              onClick={() => clearSelections()}
            >
              {sm && 'Cancel'}
            </Button>
          </PaginationSelectedActionCancel>
          {!hideDelete && (
            <PaginationSelectedActionDelete>
              <Tooltip
                isMobile={!sm}
                placement="bottom-start"
                content={<PaginationSelectedDeleteConfirm />}
                open={openDeleteConfirm}
                onOpenChange={(open) => setOpenDeleteConfirm(open)}
              >
                <Button
                  type="button"
                  variant="secondaryGray"
                  size={xl ? 'md' : 'sm'}
                  icon={<Icon icon="lucide:trash" />}
                  onClick={() => setOpenDeleteConfirm((open) => !open)}
                  danger
                >
                  {sm && 'Delete'}
                </Button>
              </Tooltip>
            </PaginationSelectedActionDelete>
          )}
          {children}
        </PaginationSelectedAction>
      </PaginationSelectedMain>
    </PaginationSelectedWrapper>
  )
}
