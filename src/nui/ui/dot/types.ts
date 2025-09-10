import { CssHexColor } from '@/types/css'

export type DotSize = 'xs' | 'sm' | 'md' | 'lg'

export type DotColor =
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'
  | 'primary'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'rose'
  | 'blue'
  | 'blueGray'
  | 'blueLight'
  | 'sky'
  | 'disable'
  | 'white'

export type DotHexColor = CssHexColor

export type DotProps = {
  size?: DotSize
  color?: DotColor
  hexColor?: DotHexColor | string
  outline?: boolean
} & React.PropsWithChildren

export type DotWrapperProps = Pick<
  DotProps,
  'size' | 'color' | 'hexColor' | 'outline'
>
