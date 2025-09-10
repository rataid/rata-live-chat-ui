import { isEmpty } from 'lodash'
import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

import { AnchorPropsWithoutRef } from '@nui/types'

type LinkProps = {
  to?: string
} & AnchorPropsWithoutRef &
  React.PropsWithChildren

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...props },
  forwardedRef
) {
  if (to && !isEmpty(to)) {
    return (
      <NavLink ref={forwardedRef} to={to} {...props}>
        {children}
      </NavLink>
    )
  }

  return children as React.ReactElement
})

export default Link
