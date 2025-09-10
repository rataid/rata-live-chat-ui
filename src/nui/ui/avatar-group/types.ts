import { PropsWithChildren } from 'react'

import { AvatarSize } from '../avatar/types'

export type AvatarGroupProviderProps = {
  size?: AvatarSize
  placeholder?: string | React.ReactNode
  background?: boolean
}

export type AvatarGroupProps = {
  maxItem?: number
} & AvatarGroupProviderProps &
  PropsWithChildren
