import { Outlet } from 'react-router-dom'

import { LogoSmiledental } from '@/assets'
import { PORTAL_NAME } from '@/constants/portal'

import {
  AuthBrand,
  AuthBrandLogo,
  AuthBrandSubtitle,
  AuthBrandTitle,
  AuthLayoutContainer,
  AuthLayoutWrapper,
} from './components/auth.style'
import { RegistrationGuide } from './components/registration-guide'

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
          <AuthBrandTitle>{PORTAL_NAME}</AuthBrandTitle>
          <AuthBrandSubtitle>
            Selamat datang di {PORTAL_NAME} untuk <br /> memenuhi kebutuhan
            perawatan gigi Anda.
          </AuthBrandSubtitle>
        </AuthBrand>
        <Outlet />
        <RegistrationGuide />
      </AuthLayoutContainer>
    </AuthLayoutWrapper>
  )
}
