import { NotificationPrompt } from '@/features/livechat/components/notification-prompt'

import AuthFormLogin from '../components/form-login'

export function AuthLoginPage() {
  return (
    <>
      <AuthFormLogin />
      <NotificationPrompt />
    </>
  )
}
