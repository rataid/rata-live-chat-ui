import styled, { css } from 'styled-components'
import { tw, TwStyle } from '@nui/utils/tw'

import { MenuItemColor, MenuItemPadding } from '../types'

export const MenuItemStyle = css`
  width: 100%;
  min-width: 8rem;
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  white-space: nowrap;
  font-weight: 500;
  cursor: pointer;
  outline: 2px solid var(--nui-color-transparent);
  outline-offset: 2px;

  &:focus {
    color: var(--nui-color-primary-700);
    font-weight: 700;
    outline: 2px solid var(--nui-color-transparent);
    outline-offset: 2px;
  }

  &[data-nested][data-open]:not([data-focus-inside]) {
    font-weight: 700;
    outline: 2px solid var(--nui-color-transparent);
    outline-offset: 2px;
  }

  &[data-focus-inside][data-open] {
    font-weight: 700;
    outline: 2px solid var(--nui-color-transparent);
    outline-offset: 2px;
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

export const MenuItemWrapper = styled.div.attrs<MenuItemWrapperProps>(
  ({ color = 'gray-500', padding = 'xs' }) => ({
    className: [
      padding && paddingMap[padding],
      colorMap[color],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<MenuItemWrapperProps>`
  ${MenuItemStyle}

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--nui-color-gray-300);
      font-weight: 400;

      &:focus {
        color: var(--nui-color-gray-300);
        font-weight: 400;
        cursor: not-allowed;
      }
    `}

  ${({ danger }) =>
    danger &&
    css`
      color: #ef4444;

      &:focus {
        color: #ef4444;
        font-weight: 700;
      }
    `}
`
