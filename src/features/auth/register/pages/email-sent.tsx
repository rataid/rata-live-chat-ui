import { RegistrationGuide } from '@features/auth/components/registration-guide'

import AuthEmailSent from '../components/email-sent'

export function AuthEmailSentPage() {
  return (
    <>
      <AuthEmailSent />
      <RegistrationGuide />
    </>
  )
}
