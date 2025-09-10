import { useResponsive } from 'ahooks'

import { AppLayoutSidebarWrapper } from './sidebar.style'
import { AppSidebarHeader } from './sidebar/header'
import { AppSidebarNav } from './sidebar/nav'

export function AppSidebar() {
  const { xl } = useResponsive()

  if (!xl) return null

  return (
    <AppLayoutSidebarWrapper>
      <AppSidebarHeader />
      <AppSidebarNav />
    </AppLayoutSidebarWrapper>
  )
}
