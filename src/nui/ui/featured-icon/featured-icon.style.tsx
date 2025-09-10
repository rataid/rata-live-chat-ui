import tw, { styled } from 'twin.macro'

import { FeaturedIconMainProps } from './types'

export const FeaturedIconMain = styled.div<FeaturedIconMainProps>(
  ({ size, variant, rounded, outline }) => {
    const sizes = {
      xs: [tw`h-6 w-6`, outline && tw`border-2`],
      sm: [tw`h-8 w-8`, outline && tw`border-4`],
      md: [tw`h-10 w-10`, outline && tw`border-[0.375rem]`],
      lg: [tw`h-12 w-12`, outline && tw`border-8`],
      xl: [tw`h-14 w-14`, outline && tw`border-[0.625rem]`],
    }

    const roundeds = {
      none: tw`rounded-none`,
      sm: tw`rounded-sm`,
      md: tw`rounded-md`,
      lg: tw`rounded-lg`,
      xl: tw`rounded-xl`,
      full: tw`rounded-full`,
    }

    const variants = {
      primary: tw`bg-primary-50 text-primary-600 border-primary-50`,
      primaryDark: tw`bg-primary-500 text-white border-primary-600`,
      gray: tw`bg-gray-100 text-gray-600 border-gray-50`,
      grayDark: tw`bg-gray-500 text-white border-gray-600`,
      danger: tw`bg-danger-50 text-danger-600 border-danger-50`,
      dangerDark: tw`bg-danger-500 text-white border-danger-600`,
      warning: tw`bg-warning-50 text-warning-600 border-warning-50`,
      warningDark: tw`bg-warning-500 text-white border-warning-600`,
      success: tw`bg-success-50 text-success-600 border-success-50`,
      successDark: tw`bg-success-500 text-white border-success-600`,
    }

    return [
      tw`inline-flex items-center focus:(outline outline-none) shrink-0 justify-center p-1 outline-offset-[-0.5px]`,
      size && sizes[size],
      variant && variants[variant],
      rounded && roundeds[rounded],
    ]
  }
)
