export type MenuItemColor =
  | 'gray-500'
  | 'gray-600'
  | 'gray-700'
  | 'gray-800'
  | 'gray-900'

export type MenuItemFontWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'

export type MenuItemPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg'

export type MenuProps = {
  label: string | React.ReactNode
  nested?: boolean
  portalId?: string
  padding?: MenuItemPadding
} & React.PropsWithChildren

export type MenuItemProps = {
  disabled?: boolean
  danger?: boolean
  icon?: React.ReactNode
  color?: MenuItemColor
  padding?: MenuItemPadding
} & React.PropsWithChildren
