import { RegistrationGuide } from '@features/auth/components/registration-guide'

import AuthFormVerifyOtp from '../components/form-verify-otp'

export function AuthVerifyOtpPage() {
  return (
    <>
      <AuthFormVerifyOtp />
      <RegistrationGuide />
    </>
  )
}
