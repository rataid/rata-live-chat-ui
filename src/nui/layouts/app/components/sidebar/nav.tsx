import { useAppContext } from '../../provider'
import {
  AppSidebarNavBottom,
  AppSidebarNavTop,
  AppSidebarNavWrapper,
} from './nav.style'

export function AppSidebarNav() {
  const { navTop, navBottom, profile } = useAppContext()
  return (
    <AppSidebarNavWrapper>
      <AppSidebarNavTop>{navTop}</AppSidebarNavTop>
      <AppSidebarNavBottom>
        {navBottom}
        {profile}
      </AppSidebarNavBottom>
    </AppSidebarNavWrapper>
  )
}
