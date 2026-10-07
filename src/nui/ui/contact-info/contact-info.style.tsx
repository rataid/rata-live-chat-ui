import styled, { css } from 'styled-components'

import { tw } from '@nui/utils/tw'

import { ContactInfoProps } from './types'

export const ContactInfoWrapper = styled.div.attrs({
  className: tw`flex flex-col items-start gap-y-1 w-fit text-sm`,
})``

type ContactInfoMainProps = Pick<ContactInfoProps, 'size'>

export const ContactInfoMain = styled.div.attrs<ContactInfoMainProps>(
  ({ size = 'md' }) => {
    const gapSizeMap = {
      '2xs': tw`gap-x-1`,
      xs: tw`gap-x-1`,
      sm: tw`gap-x-2`,
      md: tw`gap-x-2.5`,
      lg: tw`gap-x-3`,
      xl: tw`gap-x-3`,
      '2xl': tw`gap-x-3`,
    }
    return {
      className: [gapSizeMap[size], tw`flex items-center justify-between`]
        .filter(Boolean)
        .join(' '),
    }
  }
)<ContactInfoMainProps>``

const contactSizeMap = {
  '2xs': {
    name: tw`text-xs`,
    address: tw`text-xs`,
    phone: tw`text-xs`,
    email: tw`text-xs`,
    more: tw`text-xs`,
  },
  xs: {
    name: tw`text-xs`,
    address: tw`text-xs`,
    phone: tw`text-xs`,
    email: tw`text-xs`,
    more: tw`text-xs`,
  },
  sm: {
    name: tw`text-sm`,
    address: tw`text-xs`,
    phone: tw`text-xs`,
    email: tw`text-xs`,
    more: tw`text-xs`,
  },
  md: {
    name: tw`text-sm`,
    address: tw`text-xs`,
    phone: tw`text-xs`,
    email: tw`text-xs`,
    more: tw`text-xs`,
  },
  lg: {
    name: tw`text-lg`,
    address: tw`text-sm`,
    phone: tw`text-sm`,
    email: tw`text-sm`,
    more: tw`text-sm`,
  },
  xl: {
    name: tw`text-xl`,
    address: tw`text-sm`,
    phone: tw`text-sm`,
    email: tw`text-sm`,
    more: tw`text-sm`,
  },
  '2xl': {
    name: tw`text-xl`,
    address: tw`text-sm`,
    phone: tw`text-sm`,
    email: tw`text-sm`,
    more: tw`text-sm`,
  },
}

type ContactInfoContactProps = Pick<ContactInfoProps, 'size'>

export const ContactInfoContact = styled.div.attrs<ContactInfoContactProps>(
  () => ({ className: tw`flex-1 text-left` })
)<ContactInfoContactProps>`
  ${({ size = 'md' }) => css`
    .contact-info {
      &-name {
        ${contactSizeMap[size].name}
      }
      &-address {
        ${contactSizeMap[size].address}
      }
      &-phone {
        ${contactSizeMap[size].phone}
      }
      &-email {
        ${contactSizeMap[size].email}
      }
      &-more {
        ${contactSizeMap[size].more}
      }
    }
  `}
`

type ContactInfoNameProps = Pick<ContactInfoProps, 'nameSemibold'>

export const ContactInfoName = styled.div.attrs<ContactInfoNameProps>(
  ({ nameSemibold }) => ({
    className: [
      nameSemibold ? tw`font-semibold text-gray-900` : tw`text-gray-500`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<ContactInfoNameProps>``

export const ContactInfoContactMain = styled.div.attrs({
  className: tw`flex items-center gap-x-1`,
})``

export const ContactInfoAddress = styled.div.attrs({
  className: tw`text-xs text-gray-500 xl:whitespace-nowrap`,
})``

export const ContactInfoEmail = styled.div.attrs({
  className: tw`text-xs text-gray-500 xl:whitespace-nowrap`,
})``

export const ContactInfoPhone = styled.div.attrs({
  className: tw`text-xs text-gray-500 xl:whitespace-nowrap`,
})``

export const ContactInfoMore = styled.div.attrs({
  className: tw`pl-[2.75rem] text-xs text-gray-500`,
})``
