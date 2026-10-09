import { Outlet, useLoaderData } from 'react-router-dom'

import { LogoSmiledental } from '@/assets'
import { AuthenticatedUser, useAuth } from '@/components/auth'
import { AuthProvider } from '@/components/auth/provider'
import { LiveChatProvider } from '@/components/socket'
import Icon from '@nui/ui/icon'

import { MobileMenu } from './mobile-menu'
import {
  PortalBrand,
  PortalBrandLogo,
  PortalBrandName,
  PortalContent,
  PortalHeader,
  PortalHeaderInner,
  PortalMain,
  PortalNav,
  PortalNavDivider,
  PortalNavLabel,
  PortalNavLink,
  PortalWrapper,
} from './portal-layout.style'
import { UserMenu } from './user-menu'

// Layout for the patient pages after login. Provides the auth store from the
// portal route loader ({ userData } from the login token) and the live chat
// socket to everything inside.
export function PortalLayout() {
  const { userData } = useLoaderData() as { userData: AuthenticatedUser | null }

  return (
    <AuthProvider userData={userData}>
      <LiveChatProvider>
        <PortalShell />
      </LiveChatProvider>
    </AuthProvider>
  )
}

// Fixed header + page content, reads the user from the auth store
function PortalShell() {
  const { userData } = useAuth()

  return (
    <PortalWrapper>
      <PortalHeader>
        <PortalHeaderInner>
          <PortalBrand to="/home">
            <PortalBrandLogo>
              <div className="w-1/2">
                <LogoSmiledental />
              </div>
            </PortalBrandLogo>
            <PortalBrandName>Dental Patient Portal</PortalBrandName>
          </PortalBrand>
          <PortalNav aria-label="Main">
            <PortalNavLink to="/home" activePaths={['/faq']}>
              <Icon icon="lucide-home" size="xs" />
              <PortalNavLabel>Home</PortalNavLabel>
            </PortalNavLink>
            <PortalNavLink to="/livechat">
              <Icon icon="lucide-messages-square" size="xs" />
              <PortalNavLabel>Live Chat</PortalNavLabel>
            </PortalNavLink>
            <PortalNavDivider />
            <UserMenu name={userData?.fullname || userData?.username} />
          </PortalNav>
          <MobileMenu name={userData?.fullname || userData?.username} />
        </PortalHeaderInner>
      </PortalHeader>
      <PortalMain>
        <PortalContent>
          <Outlet />
        </PortalContent>
      </PortalMain>
    </PortalWrapper>
  )
}
