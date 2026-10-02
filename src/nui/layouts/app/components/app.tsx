import { useState } from 'react'

import LayoutUiFloatingPortal from '@nui/layouts/ui/floating-portal'
import LayoutUiLoader from '@nui/layouts/ui/loader'

import AppProvider from '../provider'
import { AppLayoutProps } from '../types'
import { AppLayoutContainer, AppLayoutWrapper } from './app.style'
import { AppMain } from './main'
import AppMobileNav from './mobile'
import { AppSidebar } from './sidebar'

export function AppLayout({ navTop, navBottom, profile }: AppLayoutProps) {
  const [isMobileNav, setIsMobileNav] = useState(false)

  return (
    <AppProvider
      navTop={navTop}
      navBottom={navBottom}
      profile={profile}
      isMobileNav={isMobileNav}
      setIsMobileNav={setIsMobileNav}
    >
      <AppMobileNav />
      <AppLayoutWrapper>
        <LayoutUiLoader />
        <AppSidebar />
        <AppLayoutContainer>
          <AppMain />
        </AppLayoutContainer>
        <LayoutUiFloatingPortal />
      </AppLayoutWrapper>
    </AppProvider>
  )
}
