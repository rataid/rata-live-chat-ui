import styled, { css } from 'styled-components'
import { tw, TwStyle } from '@nui/utils/tw'

import { MenuItemPadding } from '../types'
import { MenuItemStyle } from './menu-item.style'

type MenuContainerProps = {
  padding?: MenuItemPadding
}

const paddingMap: Record<MenuItemPadding, TwStyle> = {
  none: tw`p-0`,
  xs: tw`p-2`,
  sm: tw`p-3`,
  md: tw`p-4`,
  lg: tw`p-6`,
}

export const MenuContainer = styled.div.attrs<MenuContainerProps>(
  ({ padding = 'sm' }) => ({
    className: [
      paddingMap[padding],
      tw`bg-white border border-gray-200 rounded-lg max-h-[25rem] lg:max-h-max overflow-auto focus:outline-none`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<MenuContainerProps>``

type MenuButtonProps = {
  isNested: boolean
}

const RootMenuStyle = css`
  font-size: 0.75rem;
  line-height: 1rem;

  &[data-open],
  .RootMenu:hover {
    color: var(--nui-color-primary-500);
  }
`

export const MenuButton = styled.div<MenuButtonProps>`
  ${({ isNested }) => (isNested ? MenuItemStyle : RootMenuStyle)}
`
