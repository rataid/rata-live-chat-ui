import { RegistrationGuide } from '@features/auth/components/registration-guide'

import AuthFormRegister from '../components/form-register'

export function AuthRegisterPage() {
  return (
    <>
      <AuthFormRegister />
      <RegistrationGuide />
    </>
  )
}
