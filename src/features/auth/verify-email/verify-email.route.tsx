import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { verifyEmail } from '@/api/auth/verify-email'
import { getApiErrorMessage } from '@/api/shared/error'
import { showToast } from '@nui/ui/toast'


export async function authVerifyEmailLoader({ params }: LoaderFunctionArgs) {
  try {
    await verifyEmail(params.token ?? '')

    showToast({
      type: 'success',
      title: 'Account Activation Successful!',
      message:
        'Your account is now active. Please log in using the password you created.',
    })
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Account Activation Failed',
      message: getApiErrorMessage(
        error,
        'This activation link is invalid or has expired.'
      ),
    })
  }

  return redirect('/login')
}
