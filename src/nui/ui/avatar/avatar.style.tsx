import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { AvatarMainProps, AvatarProps, AvatarWrapperProps } from './types'

export const AvatarWrapper = styled.div.attrs<AvatarWrapperProps>(
  ({ isGroup }) => ({
    className: [
      isGroup && tw`-ml-2`,
      tw`relative inline-flex items-end`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<AvatarWrapperProps>``

export const AvatarMain = styled.div.attrs<AvatarMainProps>(
  ({ size, background, isGroup }) => {
    const sizes = {
      '2xs': tw`w-5 h-5 text-xs`,
      xs: tw`h-6 w-6 text-xs`,
      sm: tw`h-8 w-8 text-sm`,
      md: tw`h-10 w-10 text-base`,
      lg: tw`h-12 w-12 text-lg`,
      xl: tw`h-14 w-14 text-xl`,
      '2xl': tw`h-16 w-16 text-2xl`,
      '3xl': tw`h-20 w-20 text-4xl`,
      '4xl': tw`h-24 w-24 text-4xl`,
      '5xl': tw`h-32 w-32 text-4xl`,
    }

    return {
      className: [
        tw`flex items-center justify-center text-primary-600 font-medium rounded-full overflow-hidden`,
        isGroup
          ? tw`outline outline-white`
          : tw`focus:outline focus:outline-1 focus:outline-primary-100`,
        background && tw`bg-primary-50`,
        size && sizes[size],
      ]
        .filter(Boolean)
        .join(' '),
    }
  }
)<AvatarMainProps>`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const AvatarStatus = styled.div.attrs<Pick<AvatarProps, 'size'>>(
  ({ size }) => {
    const sizes = {
      '2xs': tw`w-1 h-1 text-xs`,
      xs: tw`h-1.5 w-1.5`,
      sm: tw`h-2 w-2`,
      md: tw`h-2.5 w-2.5`,
      lg: tw`h-3 w-3`,
      xl: tw`h-3.5 w-3.5`,
      '2xl': tw`h-4 w-4`,
      '3xl': tw`h-4 w-4`,
      '4xl': tw`h-4 w-4`,
      '5xl': tw`h-4 w-4`,
    }

    return {
      className: [
        tw`absolute bottom-0 right-0 rounded-full outline outline-2 outline-white`,
        size && sizes[size],
      ]
        .filter(Boolean)
        .join(' '),
    }
  }
)<Pick<AvatarProps, 'size'>>``
