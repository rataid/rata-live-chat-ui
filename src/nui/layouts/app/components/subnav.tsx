import { NavLink } from 'react-router-dom'

import { useAppContext } from '@nui/layouts/app/provider'
import Icon from '@nui/ui/icon'
import { key } from '@utils'

import { AppSubnavProps } from '../types'
import {
  AppSubnavNav,
  AppSubnavNavItem,
  AppSubnavNavItemIcon,
  AppSubnavNavItemLabel,
  AppSubnavNavItemLoader,
  AppSubnavNavItemTotal,
  AppSubnavNavItemWrapper,
  AppSubnavTitle,
  AppSubnavWrapper,
} from './subnav.style'

export function AppSubnav({ id, items, children }: AppSubnavProps) {
  const { setIsMobileNav } = useAppContext()

  return items?.length ? (
    <AppSubnavWrapper id={id}>
      <AppSubnavTitle>{children}</AppSubnavTitle>
      <AppSubnavNav>
        {items.map(({ title, to, icon, total }, index) => (
          <NavLink
            to={to}
            key={key(title + index)}
            end
            onClick={() => setIsMobileNav(false)}
            className="group"
          >
            {(active) => {
              return (
                <AppSubnavNavItemWrapper
                  active={active.isActive}
                  key={key(index)}
                >
                  <AppSubnavNavItem>
                    <AppSubnavNavItemIcon>{icon}</AppSubnavNavItemIcon>
                    <AppSubnavNavItemLabel>{title}</AppSubnavNavItemLabel>
                  </AppSubnavNavItem>
                  {active.isPending ? (
                    <AppSubnavNavItemLoader>
                      <Icon icon="lucide-loader-2" size="md" />
                    </AppSubnavNavItemLoader>
                  ) : (
                    total && (
                      <AppSubnavNavItemTotal active={active.isActive}>
                        {total}
                      </AppSubnavNavItemTotal>
                    )
                  )}
                </AppSubnavNavItemWrapper>
              )
            }}
          </NavLink>
        ))}
      </AppSubnavNav>
    </AppSubnavWrapper>
  ) : null
}
