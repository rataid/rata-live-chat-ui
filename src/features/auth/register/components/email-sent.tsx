import Icon from '@nui/ui/icon'

import {
  AuthBackLink,
  AuthCard,
  AuthHeading,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'

// Shown after the OTP is verified: the account is activated from the email link
export default function AuthEmailSent() {
  return (
    <AuthCard>
      <AuthBackLink to="/login">
        <Icon icon="lucide-arrow-left" size="2xs" />
        Back to Login
      </AuthBackLink>
      <AuthHeading className="!mb-0">
        <AuthTitle>Your account is almost ready!</AuthTitle>
        <AuthSubtitle>
          We have sent a verification link to your email. Please open the email
          and click the link to activate your account.
        </AuthSubtitle>
      </AuthHeading>
    </AuthCard>
  )
}
