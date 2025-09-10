import tw, { styled } from 'twin.macro'

import { BadgeGroupWrapperProps } from './types'

const sizes = {
  md: tw`text-xs font-semibold`,
  lg: tw`text-sm font-medium`,
}

export const BadgeGroupWrapper = styled.div(
  ({ size, color, theme, trailing }: BadgeGroupWrapperProps) => {
    const light = {
      primary: tw`text-primary-700 bg-primary-50`,
      gray: tw`text-gray-700 bg-gray-50`,
      danger: tw`text-danger-600 bg-danger-50`,
      warning: tw`text-warning-700 bg-warning-50`,
      success: tw`text-success-700 bg-success-50`,
    }

    const medium = {
      primary: tw`text-primary-700 bg-primary-100`,
      gray: tw`text-gray-700 bg-gray-100`,
      danger: tw`text-danger-600 bg-danger-100`,
      warning: tw`text-warning-700 bg-warning-100`,
      success: tw`text-success-700 bg-success-100`,
    }

    const dark = {
      primary: tw`text-primary-700 bg-primary-50`,
      gray: tw`text-gray-700 bg-gray-50`,
      danger: tw`text-danger-600 bg-danger-50`,
      warning: tw`text-warning-700 bg-warning-50`,
      success: tw`text-success-700 bg-success-50`,
    }

    const themes = {
      light: color && light[color],
      medium: color && medium[color],
      dark: color && dark[color],
    }

    return [
      tw`flex items-center rounded-full gap-x-1 py-1 w-fit`,
      trailing ? tw`pl-3 pr-1` : tw`pl-1 pr-3`,
      theme && themes[theme],
      size && sizes[size],
    ]
  }
)

export const BoxLabel = styled.div(
  ({ size, color, theme, trailing }: BadgeGroupWrapperProps) => {
    const light = {
      primary: tw`text-primary-700 bg-white`,
      gray: tw`text-gray-700 bg-white`,
      danger: tw`text-danger-600 bg-white`,
      warning: tw`text-warning-700 bg-white`,
      success: tw`text-success-700 bg-white`,
    }

    const medium = {
      primary: tw`text-primary-700 bg-primary-50`,
      gray: tw`text-gray-700 bg-gray-100`,
      danger: tw`text-danger-600 bg-danger-50`,
      warning: tw`text-warning-700 bg-warning-50`,
      success: tw`text-success-700 bg-success-50`,
    }

    const dark = {
      primary: tw`bg-primary-700 text-white`,
      gray: tw`bg-gray-700 text-white`,
      danger: tw`bg-danger-600 text-white`,
      warning: tw`bg-warning-700 text-white`,
      success: tw`bg-success-700 text-white`,
    }

    const themes = {
      light: color && light[color],
      medium: color && medium[color],
      dark: color && dark[color],
    }

    return [
      tw`rounded-full px-2 py-0.5 font-semibold inline-flex items-center gap-1`,
      !trailing ? tw`mr-1` : tw`ml-2`,
      size && sizes[size],
      theme && themes[theme],
    ]
  }
)
