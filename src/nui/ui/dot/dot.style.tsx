import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { DotWrapperProps } from './types'

const sizeMap = {
  xs: tw`h-1 w-1`,
  sm: tw`h-1.5 w-1.5`,
  md: tw`h-2 w-2`,
  lg: tw`h-3 w-3`,
}

const colorMap = {
  success: tw`bg-success-500`,
  warning: tw`bg-warning-500`,
  danger: tw`bg-danger-500`,
  gray: tw`bg-gray-500`,
  primary: tw` bg-primary-500`,
  indigo: tw`bg-indigo-500`,
  orange: tw`bg-orange-500`,
  pink: tw`bg-pink-500`,
  purple: tw`bg-purple-500`,
  rose: tw`bg-rose-500`,
  blue: tw`bg-blue-500`,
  blueGray: tw`bg-slate-500`,
  blueLight: tw`bg-cyan-500`,
  sky: tw`bg-sky-500`,
  disable: tw`bg-gray-300`,
  white: tw`bg-white`,
}

const outlineColorMap = {
  success: tw`outline-success-50`,
  warning: tw`outline-warning-50`,
  danger: tw`outline-danger-50`,
  gray: tw`outline-gray-50`,
  primary: tw` outline-primary-50`,
  indigo: tw`outline-indigo-50`,
  orange: tw`outline-orange-50`,
  pink: tw`outline-pink-50`,
  purple: tw`outline-purple-50`,
  rose: tw`outline-rose-50`,
  blue: tw`outline-blue-50`,
  blueGray: tw`outline-slate-50`,
  blueLight: tw`outline-cyan-50`,
  sky: tw`outline-sky-50`,
  disable: tw`outline-gray-100`,
  white: tw`outline-gray-50`,
}

const labelColorMap = {
  success: tw`text-success-600`,
  warning: tw`text-warning-700`,
  danger: tw`text-danger-700`,
  gray: tw`text-gray-700`,
  primary: tw` text-primary-700`,
  indigo: tw`text-indigo-700`,
  orange: tw`text-orange-700`,
  pink: tw`text-pink-700`,
  purple: tw`text-purple-700`,
  rose: tw`text-rose-700`,
  blue: tw`text-blue-700`,
  blueGray: tw`text-slate-700`,
  blueLight: tw`text-cyan-700`,
  sky: tw`text-sky-700`,
  disable: tw`text-gray-300`,
  white: tw`bg-white`,
}

export const DotWrapper = styled.div.attrs({ className: tw`flex items-center w-fit gap-x-2` })``

export const DotSymbol = styled.div.attrs<DotWrapperProps>(({ size, color, hexColor, outline }) =>  {
    return { className: [tw`inline-block rounded-full shrink-0`, !outline && tw`outline outline-[1.5px]`, !outline && color && outlineColorMap[color], size && sizeMap[size], !hexColor && color && colorMap[color]].filter(Boolean).join(' ') }
  })<DotWrapperProps>`
  ${({ size, color, hexColor, outline }) => hexColor &&
        css`
          background-color: ${hexColor};
        `}
`

export const DotLabel = styled.div.attrs<DotWrapperProps>(({ color, hexColor }) =>  {
  return { className: [tw`text-xs font-semibold whitespace-nowrap`, !hexColor && color && labelColorMap[color]].filter(Boolean).join(' ') }
})<DotWrapperProps>`
  ${({ color, hexColor }) => hexColor &&
      css`
        color: ${hexColor};
      `}
`
