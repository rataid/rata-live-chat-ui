import { FeaturedIconSize, FeaturedIconVariant } from '../featured-icon'

export type InfoProps = {
  icon?: React.ReactNode | string
  title?: React.ReactNode
  variant?: FeaturedIconVariant
  borderColor?: 'primary' | 'gray' | 'danger' | 'warning' | 'success'
  borderVariant?: 'dashed' | 'solid'
  sizeIcon?: FeaturedIconSize
  noBorder?: boolean
} & React.PropsWithChildren
