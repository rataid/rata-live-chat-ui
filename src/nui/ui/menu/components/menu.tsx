import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react'
import { forwardRef } from 'react'

import { DivPropsWithoutRef } from '@nui/types'

import { MenuProps } from '../types'
import { MenuComponent } from './menu-component'

export const Menu = forwardRef<HTMLDivElement, MenuProps & DivPropsWithoutRef>(
  function Menu(props, ref) {
    const parentId = useFloatingParentNodeId()

    if (parentId === null) {
      return (
        <FloatingTree>
          <MenuComponent {...props} ref={ref} />
        </FloatingTree>
      )
    }

    return <MenuComponent {...props} ref={ref} />
  }
)
