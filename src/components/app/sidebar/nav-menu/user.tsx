import { NavLink } from 'react-router-dom'

import { authNavMenuDefaultLink } from '@/components/auth'
import { Can } from '@/components/auth/components/can'
import { userPermissionNavMenuMaps } from '@/constants/permission-nav-menu-map'
import { AppLayoutSidebarNavButton } from '@nui/layouts/app/components/sidebar/nav.style'
import Icon from '@nui/ui/icon'
import Tooltip from '@nui/ui/tooltip'

export default function AppSidebarNavMenuUser() {
  return (
    <Can mode="some" permissions={Object.keys(userPermissionNavMenuMaps)}>
      <Tooltip portalId="appSidebarNav" content="User" placement="right-start">
        <NavLink to={authNavMenuDefaultLink(userPermissionNavMenuMaps)}>
          {({ isActive }) => (
            <AppLayoutSidebarNavButton isActive={isActive}>
              <Icon icon="lucide:users" />
            </AppLayoutSidebarNavButton>
          )}
        </NavLink>
      </Tooltip>
    </Can>
  )
}
