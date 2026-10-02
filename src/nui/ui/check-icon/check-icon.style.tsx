import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { CheckIconWrapperProps } from './types'

export const CheckIconMain = styled.svg.attrs<CheckIconWrapperProps>(({ size }) =>  {
  const sizes = {
    xs: tw`w-[0.625rem]`,
    sm: tw`w-3`,
    md: tw`w-[0.875rem]`,
    lg: tw`w-4`,
    xl: tw`w-[1.125rem]`,
    '2xl': tw`w-5`,
  }

  return { className: [size && sizes[size]].filter(Boolean).join(' ') }
})<CheckIconWrapperProps>``
export const CheckIconWrapper = styled.div.attrs<CheckIconWrapperProps>(({ size, variant }) =>  {
    const sizes = {
      xs: tw`h-5 w-5`,
      sm: tw`h-6 w-6`,
      md: tw`h-7 w-7`,
      lg: tw`h-8 w-8`,
      xl: tw`h-9 w-9`,
      '2xl': tw`h-10 w-10`,
    }

    const variants = {
      primary: tw`bg-primary-100 text-primary-500`,
      gray: tw`bg-gray-100 text-gray-500`,
      success: tw`bg-success-100 text-success-500`,
    }

    return { className: [tw`inline-flex items-center justify-center rounded-full p-1`, size && sizes[size], variant && variants[variant]].filter(Boolean).join(' ') }
  })<CheckIconWrapperProps>``
