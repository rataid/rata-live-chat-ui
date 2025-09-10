export type ConfirmProps = {
  buttonDanger?: boolean
  buttonLabel?: string
  onConfirm: () => void
  onCancel?: () => void
} & React.PropsWithChildren
