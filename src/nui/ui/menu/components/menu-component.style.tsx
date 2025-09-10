import tw, { TwStyle, css, styled } from 'twin.macro'

import { MenuItemPadding } from '../types'
import { MenuItemStyle } from './menu-item.style'

type MenuContainerProps = {
  padding?: MenuItemPadding
}
export const MenuContainer = styled.div<MenuContainerProps>(
  ({ padding = 'sm' }) => {
    const paddingMap: Record<MenuItemPadding, TwStyle> = {
      none: tw`p-0`,
      xs: tw`p-2`,
      sm: tw`p-3`,
      md: tw`p-4`,
      lg: tw`p-6`,
    }

    return [
      paddingMap[padding],
      tw`bg-white border border-gray-200 rounded-lg max-h-[25rem] lg:max-h-max overflow-auto focus:outline-none`,
    ]
  }
)

type MenuButtonProps = {
  isNested: boolean
}

const RootMenuStyle = css`
  ${tw`text-xs`}

  &[data-open],
  .RootMenu:hover {
    ${tw`text-primary-500`}
  }
`

export const MenuButton = styled.div<MenuButtonProps>(({ isNested }) => [
  isNested ? MenuItemStyle : RootMenuStyle,
])
