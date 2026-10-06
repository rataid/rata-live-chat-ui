import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const PORTAL_HEADER_HEIGHT = '4rem'

export const PortalWrapper = styled.div.attrs({
  className: tw`min-h-screen bg-white`,
})``

// Fixed to the top; the page content is pushed down by PortalMain's padding
export const PortalHeader = styled.header.attrs({
  className: tw`fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-200 bg-white`,
})``

export const PortalHeaderInner = styled.div.attrs({
  className: tw`mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-12`,
})``

export const PortalBrand = styled(NavLink).attrs({
  className: tw`flex min-w-0 items-center gap-2.5`,
})``

export const PortalBrandLogo = styled.div.attrs({
  className: tw`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white`,
})``

export const PortalBrandName = styled.span.attrs({
  className: tw`hidden truncate text-sm font-semibold text-gray-900 sm:inline`,
})``

export const PortalNav = styled.nav.attrs({
  className: tw`flex items-center gap-1 sm:gap-2`,
})``

// Plain component: NavLink needs a className function to style the active page,
// which styled-components' attrs can't pass through
type PortalNavLinkProps = Omit<NavLinkProps, 'className'> & {
  // Extra path prefixes that also mark this link active, e.g. ['/faq'] for Home
  activePaths?: string[]
}

export function PortalNavLink({ activePaths, ...props }: PortalNavLinkProps) {
  const { pathname } = useLocation()

  const isExtraActive = !!activePaths?.some((path) => pathname.startsWith(path))

  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        [
          tw`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium`,
          isActive || isExtraActive
            ? tw`bg-primary-50 text-primary-700`
            : tw`text-gray-700 hover:bg-gray-50 hover:text-gray-900`,
        ].join(' ')
      }
    />
  )
}

// Labels are hidden on phones, icons stay
export const PortalNavLabel = styled.span.attrs({
  className: tw`hidden sm:inline`,
})``

export const PortalNavDivider = styled.span.attrs({
  className: tw`mx-1 h-6 w-px bg-gray-200 sm:mx-2`,
})``

// Pushed below the fixed header
export const PortalMain = styled.main.attrs({
  className: tw`px-4 pt-16`,
})``

// Every page after login shares this 910px content width
export const PortalContent = styled.div.attrs({
  className: tw`mx-auto w-full max-w-[56.875rem]`,
})``

// User menu

export const UserMenuWrapper = styled.div.attrs({
  className: tw`relative`,
})``

export const UserMenuButton = styled.button.attrs({
  className: tw`flex items-center gap-1 rounded-lg p-1 text-gray-500 hover:bg-gray-50`,
})``

export const UserMenuAvatar = styled.span.attrs({
  className: tw`flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500`,
})``

export const UserMenuPanel = styled.div.attrs({
  className: tw`absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg`,
})``

export const UserMenuName = styled.div.attrs({
  className: tw`truncate border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900`,
})``

export const UserMenuItem = styled.button.attrs({
  className: tw`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-danger-600 hover:bg-gray-50`,
})``
