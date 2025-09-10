import { AvatarProps } from '@nui/ui/avatar'

export type CardContactProps = {
  name?: string
  phone?: string
  avatarSrc?: AvatarProps['src']
  avatarSize?: AvatarProps['size']
  placeholder?: string
  caption?: React.ReactNode
  to?: string
} & React.PropsWithChildren
