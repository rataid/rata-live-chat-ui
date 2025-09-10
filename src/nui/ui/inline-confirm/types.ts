import { ButtonPropsWithoutRef } from '@nui/types'

export type InlineConfirmProps = {
  buttonDanger?: boolean
  buttonLabel?: string
  onConfirm: () => void
  onCancel?: () => void
} & React.PropsWithChildren &
  ButtonPropsWithoutRef
