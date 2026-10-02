import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { BadgeWrapperProps } from './types'

const colorMap = {
  success: tw`text-success-600 bg-success-50`,
  warning: tw`text-warning-700 bg-warning-50`,
  danger: tw`text-danger-700 bg-danger-50`,
  gray: tw`text-gray-700 bg-gray-50`,
  primary: tw`text-primary-700 bg-primary-50`,
  indigo: tw`text-indigo-700 bg-indigo-50`,
  orange: tw`text-orange-700 bg-orange-50`,
  pink: tw`text-pink-700 bg-pink-50`,
  purple: tw`text-purple-700 bg-purple-50`,
  rose: tw`text-rose-700 bg-rose-50`,
  blue: tw`text-blue-700 bg-blue-50`,
  blueGray: tw`text-slate-700 bg-slate-50`,
  blueLight: tw`text-cyan-700 bg-cyan-50`,
}

const colorMapNoBackground = {
  success: tw`text-success-700 border border-success-100`,
  warning: tw`text-warning-700 border border-warning-100`,
  danger: tw`text-danger-700 border border-danger-100`,
  gray: tw`text-gray-700 border border-gray-100`,
  primary: tw`text-primary-700 border border-primary-100`,
  indigo: tw`text-indigo-700 border border-indigo-100`,
  orange: tw`text-orange-700 border border-orange-100`,
  pink: tw`text-pink-700 border border-pink-100`,
  purple: tw`text-purple-700 border border-purple-100`,
  rose: tw`text-rose-700 border border-rose-100`,
  blue: tw`text-blue-700 border border-blue-100`,
  blueGray: tw`text-slate-700 border border-slate-100`,
  blueLight: tw`text-cyan-700 border border-cyan-100`,
}

const colorIconMap = {
  success: tw`text-success-500`,
  warning: tw`text-warning-500`,
  danger: tw`text-danger-500`,
  gray: tw`text-gray-500`,
  primary: tw`text-primary-500`,
  indigo: tw`text-indigo-500`,
  orange: tw`text-orange-500`,
  pink: tw`text-pink-500`,
  purple: tw`text-purple-500`,
  rose: tw`text-rose-500`,
  blue: tw`text-blue-500`,
  blueGray: tw`text-slate-500`,
  blueLight: tw`text-cyan-500`,
}

const roundeds = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  base: tw`rounded`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
  full: tw`rounded-full`,
}

export const BadgeWrapper = styled.div.attrs<BadgeWrapperProps>(({ noBackground, color, rounded, size, width, hasChildren }) =>  {
    const sizeMapText = {
      xs: tw`px-2 py-1 text-[0.6875rem] leading-3 font-semibold`,
      sm: tw`px-3 py-1 text-xs leading-4 font-semibold`,
      md: tw`px-[0.9375rem] py-[0.3125rem] leading-5 text-sm font-medium`,
      lg: tw`px-[1.125rem] py-1.5 text-sm leading-5 font-medium`,
      xl: tw`px-6 py-4 text-base leading-6 font-bold`,
    }

    const sizeMapBoxIcon = {
      xs: tw`px-2 py-1 text-xs font-semibold`,
      sm: tw`h-6 !w-6 p-1.5`,
      md: tw`h-[1.875rem] !w-[1.875rem] p-2`,
      lg: tw`h-7 !w-7 p-2`,
      xl: tw`h-8 !w-8 p-2`,
    }

    const isBackground = !noBackground ? colorMap : colorMapNoBackground

    return { className: [tw`inline-flex h-fit w-fit items-center justify-center gap-0.5 overflow-hidden whitespace-nowrap`, color && isBackground[color], rounded && roundeds[rounded], size && (hasChildren ? sizeMapText[size] : sizeMapBoxIcon[size])].filter(Boolean).join(' ') }
  })<BadgeWrapperProps>`
  ${({ noBackground, color, rounded, size, width, hasChildren }) => width && css({ width })}
`

export const BadgeMain = styled.div.attrs<BadgeWrapperProps>(({ color }) =>  {
  return { className: [tw`flex justify-center items-center`, color && colorIconMap[color]].filter(Boolean).join(' ') }
})<BadgeWrapperProps>``
