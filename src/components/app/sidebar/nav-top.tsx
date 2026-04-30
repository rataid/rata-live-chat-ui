import { Divider } from 'antd'
import { NavLink } from 'react-router-dom'

import { AppLayoutSidebarNavButton } from '@nui/layouts/app/components/sidebar/nav.style'
import { useAppContext } from '@nui/layouts/app/provider'
import Icon from '@nui/ui/icon'
import Tooltip from '@nui/ui/tooltip'

import { menu } from './menu'

export default function AppSidebarNavTop() {
  const { setIsMobileNav } = useAppContext()

  return (
    <>
      {menu.map((item, index) => (
        <div key={index}>
          <Tooltip
            portalId="appSidebarNav"
            content={item.tooltip}
            placement="right-start"
          >
            <NavLink to={item.url} onClick={() => setIsMobileNav(false)}>
              {({ isActive }) => (
                <AppLayoutSidebarNavButton isActive={isActive}>
                  <Icon icon={item.icon} />
                </AppLayoutSidebarNavButton>
              )}
            </NavLink>
          </Tooltip>
        </div>
      ))}
    </>
  )
}
