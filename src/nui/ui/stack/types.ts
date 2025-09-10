import { DivPropsWithoutRef } from '@nui/types'

export type StackProps = {
  spacing?: string
  flow?: 'row' | 'column'
  width?: number
  fit?: boolean
  align?: 'none' | 'center' | 'start' | 'end'
  justify?: 'between' | 'center' | 'start' | 'end'
} & React.PropsWithChildren &
  DivPropsWithoutRef

export type StackWrapperProps = Pick<
  StackProps,
  'flow' | 'spacing' | 'fit' | 'width' | 'align' | 'justify'
>
