import Icon from '@nui/ui/icon'

import {
  AuthBackLink,
  AuthCard,
  AuthHeading,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import { getRegisterEmail } from '../register-session'

// Shown after the OTP is verified: the account is activated from the email link
export default function AuthEmailSent() {
  const email = getRegisterEmail()

  return (
    <AuthCard>
      <AuthBackLink to="/login">
        <Icon icon="lucide-arrow-left" size="2xs" />
        Back to Login
      </AuthBackLink>
      <AuthHeading className="!mb-0">
        <AuthTitle>Your account is almost ready!</AuthTitle>
        <AuthSubtitle>
          We have sent a verification link to{' '}
          {email ? <strong>{email}</strong> : 'your email'}. Please open the
          email and click the link to activate your account.
        </AuthSubtitle>
      </AuthHeading>
    </AuthCard>
  )
}
