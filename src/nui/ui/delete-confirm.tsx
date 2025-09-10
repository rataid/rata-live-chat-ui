import { Icon } from '@iconify/react'
import { useRef } from 'react'
import { useSubmit } from 'react-router-dom'

import { usePagination } from '@nui/pagination'
import Button from '@nui/ui/button'

import {
  DeleteConfirmAction,
  DeleteConfirmMessage,
  DeleteConfirmWrapper,
} from './delete-confirm.style'
import { useTipContext } from './tip/hooks'

export type DeleteConfirmProps = {
  button?: React.ReactNode
  inline?: boolean
} & React.PropsWithChildren

export default function DeleteConfirm({
  children,
  inline = true,
  button,
}: DeleteConfirmProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const submit = useSubmit()

  const { setOpen } = useTipContext()

  const [clearSelections] = usePagination((s) => [s.clearSelections])

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Close tooltip if accessible
    setOpen(false)

    // Clear selections if accessible
    clearSelections()

    // Submit form
    submit(buttonRef.current)
  }

  const actionButton = button || (
    <Button
      ref={buttonRef}
      type="button"
      name="intent"
      value="delete"
      size="sm"
      variant="secondaryGray"
      icon={<Icon icon="lucide:alert-circle" />}
      trailing
      danger
      onClick={onClick}
    >
      Delete
    </Button>
  )

  return (
    <DeleteConfirmWrapper inline={inline}>
      <DeleteConfirmMessage>{children}</DeleteConfirmMessage>
      <DeleteConfirmAction>{actionButton}</DeleteConfirmAction>
    </DeleteConfirmWrapper>
  )
}
