import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { verifyOtp } from '@/api/auth/otp'
import { getApiErrorMessage } from '@/api/shared/error'
import { verifyOtpSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

import {
  clearRegisterPhone,
  getRegisterPhone,
  setRegisterEmailSent,
} from '../register-session'

export type AuthVerifyOtpActionData = {
  success: boolean
}

export async function authVerifyOtpLoader() {
  const phone = getRegisterPhone()

  // Only reachable after submitting the register form in this tab
  if (!phone) return redirect('/register')

  return { phone }
}

export async function authVerifyOtpAction({
  request,
}: ActionFunctionArgs): Promise<AuthVerifyOtpActionData | Response> {
  const formData = await request.formData()
  const data = verifyOtpSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    showToast({
      type: 'error',
      title: 'Verification Failed',
      message: 'OTP must be 6 digits',
    })
    return { success: false }
  }

  try {
    await verifyOtp({
      target: data.data.phone,
      channel: 'WA',
      purpose: 'REGISTER',
      code: data.data.otp,
    })
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Verification Failed',
      message: getApiErrorMessage(error, 'Invalid OTP code, please try again.'),
    })
    return { success: false }
  }

  clearRegisterPhone()
  setRegisterEmailSent()

  return redirect('/register/email-sent')
}
