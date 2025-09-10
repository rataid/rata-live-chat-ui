import { NavLink } from 'react-router-dom'

import { AppLayoutSidebarNavButton } from '@nui/layouts/app/components/sidebar/nav.style'
import { useAppContext } from '@nui/layouts/app/provider'
import Icon from '@nui/ui/icon'
import Tooltip from '@nui/ui/tooltip'

export default function AppSidebarNavTop() {
  const { setIsMobileNav } = useAppContext()

  return (
    <Tooltip
      portalId="appSidebarNav"
      content="Dashboard"
      placement="right-start"
    >
      <NavLink to="dashboard" onClick={() => setIsMobileNav(false)}>
        {({ isActive }) => (
          <AppLayoutSidebarNavButton isActive={isActive}>
            <Icon icon="lucide:layout-template" />
          </AppLayoutSidebarNavButton>
        )}
      </NavLink>
    </Tooltip>
  )
}
