import { DivPropsWithoutRef } from '@nui/types'

export type ImageProps = {
  object?: 'cover' | 'scale-down'
  cursorPointer?: boolean
  width?: string
  height?: string
  src?: string
  alt?: string
} & React.PropsWithChildren &
  DivPropsWithoutRef
