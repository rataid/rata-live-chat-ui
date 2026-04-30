import { HTMLProps, PropsWithChildren } from 'react'

export type DialogSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type DialogProps = {
  initialOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type DialogTriggerProps = {
  children: React.ReactNode
  asChild?: boolean
}

export type DialogContentProps = {
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>
  dialogSize?: DialogSize
  disableOnClose?: boolean
} & HTMLProps<HTMLDivElement>

export type DialogHeadingProps = {
  title?: React.ReactNode
  inline?: boolean
} & Omit<HTMLProps<HTMLHeadingElement>, 'title' | 'as'> &
  PropsWithChildren
