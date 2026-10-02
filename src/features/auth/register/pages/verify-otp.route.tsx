import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

import { verifyOtpSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

export type AuthVerifyOtpActionData = {
  success: boolean
  message?: string
}

// @todo: remove once the backend validates the OTP, use it to test the error state
const DUMMY_INVALID_OTP = '000000'

export async function authVerifyOtpLoader({ request }: LoaderFunctionArgs) {
  const phone = new URL(request.url).searchParams.get('phone')

  // Only reachable after submitting the register form
  if (!phone) return redirect('/register')

  return { phone }
}

export async function authVerifyOtpAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = verifyOtpSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    return { success: false, message: 'OTP must be 6 digits' }
  }

  // @todo: call the verify OTP API once the backend is ready
  if (data.data.otp === DUMMY_INVALID_OTP) {
    return { success: false, message: 'Invalid OTP code' }
  }

  showToast({
    type: 'success',
    title: 'Account Activation Successful!',
    message:
      'Your account is now active. Please log in using the password you created.',
  })

  return redirect('/login')
}
