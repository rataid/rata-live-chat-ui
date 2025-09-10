import { HTMLProps } from 'react'

export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type DrawerProps = {
  initialOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type DrawerTriggerProps = {
  children: React.ReactNode
  asChild?: boolean
}

export type DrawerContentProps = {
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>
  drawerSize?: DrawerSize
  isClose?: boolean
} & HTMLProps<HTMLDivElement>

export type DrawerHeadingProps = {
  title?: React.ReactNode
  children?: React.ReactNode
} & Omit<HTMLProps<HTMLDivElement>, 'title'>
