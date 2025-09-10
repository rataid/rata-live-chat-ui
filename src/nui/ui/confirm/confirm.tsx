import { Icon } from '@iconify/react'

import Button from '@nui/ui/button'
import { useTipContext } from '@nui/ui/tip/hooks'

import { ConfirmAction, ConfirmMain, ConfirmWrapper } from './confirm.style'
import { ConfirmProps } from './types'

export function Confirm({
  children,
  buttonDanger = true,
  buttonLabel = 'Yes',
  onConfirm,
  onCancel,
}: ConfirmProps) {
  const { setOpen } = useTipContext()

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(false)

    if (onCancel) onCancel()
  }

  const handleOnConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(false)

    // Submit form
    onConfirm()
  }

  return (
    <ConfirmWrapper>
      <ConfirmMain>{children}</ConfirmMain>
      <ConfirmAction>
        <Button
          type="button"
          size="sm"
          variant="primary"
          icon={<Icon icon="lucide:alert-circle" />}
          wider="sm"
          danger={buttonDanger}
          onClick={handleOnConfirm}
        >
          {buttonLabel}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondaryGray"
          onClick={handleOnCancel}
        >
          Cancel
        </Button>
      </ConfirmAction>
    </ConfirmWrapper>
  )
}
