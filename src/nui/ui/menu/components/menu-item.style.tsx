import tw, { TwStyle, css, styled } from 'twin.macro'

import { MenuItemColor, MenuItemPadding } from '../types'

export const MenuItemStyle = css`
  ${tw`w-full min-w-[8rem] flex items-center gap-x-3 text-sm whitespace-nowrap font-medium outline-none focus:outline-none cursor-pointer`}

  &:focus {
    ${tw`text-primary-700 font-bold outline-none`}
  }

  &[data-nested][data-open]:not([data-focus-inside]) {
    ${tw`font-bold outline-none`}
  }

  &[data-focus-inside][data-open] {
    ${tw`font-bold outline-none`}
  }
`

type MenuItemWrapperProps = {
  danger?: boolean
  disabled?: boolean
  color?: MenuItemColor
  padding?: MenuItemPadding
}

const colorMap: Record<MenuItemColor, TwStyle> = {
  'gray-500': tw`text-gray-500`,
  'gray-600': tw`text-gray-600`,
  'gray-700': tw`text-gray-700`,
  'gray-800': tw`text-gray-800`,
  'gray-900': tw`text-gray-900`,
}

const paddingMap: Record<MenuItemPadding, TwStyle> = {
  none: tw`p-0`,
  xs: tw`py-1.5 first:pt-0 last:pb-0`,
  sm: tw`py-2 first:pt-0 last:pb-0`,
  md: tw`py-4 first:pt-0 last:pb-0`,
  lg: tw`py-6 first:pt-0 last:pb-0`,
}

export const MenuItemWrapper = styled.div<MenuItemWrapperProps>(
  ({ danger, disabled, color = 'gray-500', padding = 'xs' }) => [
    padding && paddingMap[padding],
    MenuItemStyle,
    colorMap[color],
    disabled &&
      tw`text-gray-300 font-normal focus:(text-gray-300 cursor-not-allowed font-normal)`,
    danger && tw`text-red-500 focus:(text-red-500 font-bold)`,
  ]
)
