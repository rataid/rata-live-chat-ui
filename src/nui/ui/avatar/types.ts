export type AvatarSize =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'

export type AvatarProps = {
  background?: boolean

  size?: AvatarSize

  status?: React.ReactNode

  src?: string

  alt?: string

  // Placeholder node or icon, default is the lucide:image icon
  placeholder?: string | React.ReactNode

  placeholderName?: string
} & React.PropsWithChildren

export type AvatarWrapperProps = {
  isGroup?: boolean
}

export type AvatarMainProps = {
  isGroup?: boolean
} & Pick<AvatarProps, 'size' | 'background'>
