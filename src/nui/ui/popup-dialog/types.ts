export type PopupDialogSize = 'sm' | 'md' | 'lg'

export type PopupDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  size?: PopupDialogSize
} & React.PropsWithChildren
