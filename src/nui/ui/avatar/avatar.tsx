import { head, map, random, upperCase, words } from 'lodash'

import Icon, { IconSize } from '@nui/ui/icon'
import { leadingZero } from '@utils'

import { useAvatarGroupContext } from '../avatar-group/context'
import { AvatarMain, AvatarStatus, AvatarWrapper } from './avatar.style'
import { AvatarProps, AvatarSize } from './types'

export function Avatar({
  background: backgroundAvatar,
  size: sizeAvatar = 'md',
  status = false,
  src,
  alt: altValue,
  placeholder: placeholderAvatar,
  placeholderName,
  children,
}: AvatarProps) {
  const groupContext = useAvatarGroupContext()

  const isGroup = !!groupContext

  const background = groupContext?.background ?? backgroundAvatar

  const placeholder = groupContext?.placeholder ?? placeholderAvatar

  const size = groupContext?.size ?? sizeAvatar

  const alt = altValue ?? `avatar #${leadingZero(random(1, 1000), 4)}`

  const sizeMap: Record<AvatarSize, IconSize> = {
    '2xs': '2xs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': 'xl',
    '3xl': 'xl',
    '4xl': '2xl',
    '5xl': '2xl',
  }

  const renderPlaceholder = () => {
    if (placeholderName) {
      const name = words(placeholderName)

      const valueName = map(name, (value) => upperCase(head(value)))

      const result = valueName.slice(0, 2).join('')
      return result
    }
    if (placeholder) {
      if (typeof placeholder === 'string') {
        return <Icon size={sizeMap[size]} icon={placeholder} />
      }

      return placeholder
    }
    return <Icon size={sizeMap[size]} icon="lucide:image" />
  }

  return (
    <AvatarWrapper isGroup={isGroup}>
      <AvatarMain isGroup={isGroup} background={background ?? !src} size={size}>
        {src ? <img src={src} alt={alt} /> : children ?? renderPlaceholder()}
      </AvatarMain>
      {status && <AvatarStatus size={size}>{status}</AvatarStatus>}
    </AvatarWrapper>
  )
}
