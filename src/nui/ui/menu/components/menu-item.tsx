import { useFloatingTree, useListItem, useMergeRefs } from '@floating-ui/react'
import React, { forwardRef, useContext } from 'react'

import { DivPropsWithoutRef } from '@nui/types'
import Icon from '@nui/ui/icon'

import { MenuContext } from '../provider'
import { MenuItemProps } from '../types'
import { MenuItemWrapper } from './menu-item.style'

export const MenuItem = forwardRef<
  HTMLDivElement,
  MenuItemProps & DivPropsWithoutRef
>(
  (
    { disabled = false, danger = false, icon, color, children, ...props },
    forwardedRef
  ) => {
    const menu = useContext(MenuContext)

    const item = useListItem({ label: disabled ? null : String(children) })

    const tree = useFloatingTree()

    const isActive = item.index === menu.activeIndex

    const newIcon =
      typeof icon === 'string' ? (
        <Icon size="sm" stroke="md" icon={icon} />
      ) : (
        icon
      )

    return (
      <MenuItemWrapper
        disabled={disabled}
        danger={danger}
        color={color}
        {...props}
        ref={useMergeRefs([item.ref, forwardedRef])}
        role="menuitem"
        tabIndex={isActive ? 0 : -1}
        {...menu.getItemProps({
          onClick(event: React.MouseEvent<HTMLDivElement>) {
            if (!disabled) {
              props.onClick?.(event)
              tree?.events.emit('click')
            }
          },
          onFocus(event: React.FocusEvent<HTMLDivElement>) {
            props.onFocus?.(event)
            menu.setHasFocusInside(true)
          },
        })}
      >
        {newIcon}
        {children}
      </MenuItemWrapper>
    )
  }
)
MenuItem.displayName = 'MenuItem'
