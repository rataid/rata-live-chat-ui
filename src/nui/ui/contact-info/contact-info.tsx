import Avatar, { AvatarSize } from '@nui/ui/avatar'
import Icon, { IconSize } from '@nui/ui/icon'
import { prettyPhone } from '@utils'

import {
  ContactInfoAddress,
  ContactInfoContact,
  ContactInfoContactMain,
  ContactInfoEmail,
  ContactInfoMain,
  ContactInfoMore,
  ContactInfoName,
  ContactInfoPhone,
  ContactInfoWrapper,
} from './contact-info.style'
import { ContactInfoProps, ContactInfoSize } from './types'

export function ContactInfo({
  src,
  alt,
  name,
  address,
  phone,
  email,
  type = 'person',
  size = 'sm',
  nameSemibold = true,
  children,
}: ContactInfoProps) {
  const avatarTypeMap = {
    person: 'lucide-user',
    building: 'lucide:building-2',
  }

  const avatarSizeMap: Record<ContactInfoSize, AvatarSize> = {
    '2xs': '2xs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: '2xl',
    '2xl': '4xl',
  }

  const iconSizeMap: Record<ContactInfoSize, IconSize> = {
    '2xs': '2xs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': '2xl',
  }

  return (
    <ContactInfoWrapper>
      <ContactInfoMain size={size}>
        <Avatar
          src={src}
          alt={alt}
          size={avatarSizeMap[size]}
          placeholder={
            <Icon icon={avatarTypeMap[type]} size={iconSizeMap[size]} />
          }
        />
        <ContactInfoContact size={size}>
          <ContactInfoContactMain>
            <ContactInfoName
              nameSemibold={nameSemibold}
              className="contact-info-name"
            >
              {name}
            </ContactInfoName>
          </ContactInfoContactMain>
          {address && (
            <ContactInfoAddress className="contact-info-address">
              {address}
            </ContactInfoAddress>
          )}
          {email && (
            <ContactInfoEmail className="contact-info-email">
              {email}
            </ContactInfoEmail>
          )}
          {phone && (
            <ContactInfoPhone className="contact-info-phone">
              {prettyPhone(phone)}
            </ContactInfoPhone>
          )}
        </ContactInfoContact>
      </ContactInfoMain>
      {children && (
        <ContactInfoMore className="contact-info-more">
          {children}
        </ContactInfoMore>
      )}
    </ContactInfoWrapper>
  )
}
