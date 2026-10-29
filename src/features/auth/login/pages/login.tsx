import { useSearchParams } from 'react-router-dom'

import { InstallHomeScreen } from '@/features/home/components/install-home-screen'
import { NotificationPrompt } from '@/features/livechat/components/notification-prompt'
import { isIosDevice } from '@/features/livechat/notification-preference'

import AuthFormLogin from '../components/form-login'

export function AuthLoginPage() {
  const [searchParams] = useSearchParams()
  const previewAndroid =
    import.meta.env.DEV && searchParams.get('previewInstall') === 'android'

  return (
    <>
      <AuthFormLogin />
      {previewAndroid ? (
        <InstallHomeScreen previewAndroid />
      ) : isIosDevice() ? (
        <InstallHomeScreen placement="login" />
      ) : (
        <NotificationPrompt desktopCorner />
      )}
    </>
  )
}
