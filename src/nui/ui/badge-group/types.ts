type BadgeGroupSize = 'md' | 'lg'

type BadgeGroupColor = 'primary' | 'gray' | 'danger' | 'warning' | 'success'

type BadgeGroupTheme = 'light' | 'medium' | 'dark'

export type BadgeGroupProps = {
  label?: React.ReactNode
  size?: BadgeGroupSize
  color?: BadgeGroupColor
  theme?: BadgeGroupTheme
  trailing?: boolean
  icon?: React.ReactNode
} & React.PropsWithChildren

export type BadgeGroupWrapperProps = Pick<
  BadgeGroupProps,
  'size' | 'color' | 'theme' | 'trailing'
>

export type LabelProps = {
  color: BadgeGroupColor
  trailing: boolean
  theme: BadgeGroupTheme
  size: BadgeGroupSize
} & React.PropsWithChildren
