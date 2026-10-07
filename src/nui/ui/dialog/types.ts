export type DialogSize = 'sm' | 'md' | 'lg'

export type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  size?: DialogSize
} & React.PropsWithChildren
