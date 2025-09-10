import { ReactNode } from 'react'

import { BoxPadding } from '@nui/ui/box'

export type CardDualToneColumnProps = {
  caption?: ReactNode | string
  titleDate?: string
  date?: string
  fit?: boolean
  noBackground?: boolean
  more?: ReactNode
  padding?: BoxPadding
} & React.PropsWithChildren
