import { Outlet } from 'react-router-dom'

import { LogoClinics } from '@/assets'

import {
  AuthBrand,
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
          <LogoClinics />
          <AuthBrandTitle>Dental Patient Portal</AuthBrandTitle>
          <AuthBrandSubtitle>
            Welcome to your one-stop portal for your dental needs
          </AuthBrandSubtitle>
        </AuthBrand>
        <Outlet />
      </AuthLayoutContainer>
    </AuthLayoutWrapper>
  )
}
