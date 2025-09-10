import { MouseEventHandler } from 'react'

export type ButtonTabsItems = {
  fit?: boolean
  name?: string
  link?: string
  isButton?: boolean
  isActive?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
} & React.PropsWithChildren

export type ButtonTabsProps = {
  items?: ButtonTabsItems[]
  link?: string
  fit?: boolean
} & React.PropsWithChildren
