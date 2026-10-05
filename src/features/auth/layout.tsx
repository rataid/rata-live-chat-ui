import { Outlet } from 'react-router-dom'

import { LogoSmiledental } from '@/assets'

import {
  AuthBrand,
  AuthBrandLogo,
  AuthBrandSubtitle,
  AuthBrandTitle,
  AuthLayoutContainer,
  AuthLayoutWrapper,
} from './components/auth.style'

export function Layout() {
  return (
    <AuthLayoutWrapper>
      <AuthLayoutContainer>
        <AuthBrand>
          <AuthBrandLogo>
            <div className="w-1/2">
              <LogoSmiledental />
            </div>
          </AuthBrandLogo>
          <AuthBrandTitle>Tanam Patient Portal</AuthBrandTitle>
          <AuthBrandSubtitle>Online Platform</AuthBrandSubtitle>
        </AuthBrand>
        <Outlet />
      </AuthLayoutContainer>
    </AuthLayoutWrapper>
  )
}
