import { Outlet } from 'react-router-dom'

import { LogoSmiledental } from '@/assets'
import { BlankLayout } from '@nui/layouts'

import {
  AuthFormLoginImage,
  AuthFormLoginWrapper,
} from './components/form-login.style'

export function Layout() {
  return (
    <BlankLayout>
      <AuthFormLoginWrapper>
        <AuthFormLoginImage>
          <div className="w-[6rem] text-white">
            <LogoSmiledental />
          </div>
        </AuthFormLoginImage>
        <Outlet />
      </AuthFormLoginWrapper>
    </BlankLayout>
  )
}
