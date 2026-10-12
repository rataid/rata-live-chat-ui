import { isAxiosError } from 'axios'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { register } from '@/api/auth/register'
import { getApiErrorMessage } from '@/api/shared/error'
import { registerSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

import { setRegisterEmail, setRegisterPhone } from '../register-session'

// The phone number doesn't match any registered customer (API returns 404)
export const REGISTER_ERROR_CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND'

export type AuthRegisterActionData = {
  success: boolean
  code?: string
}

export async function authRegisterAction({
  request,
}: ActionFunctionArgs): Promise<AuthRegisterActionData | Response> {
  const formData = await request.formData()
  const data = registerSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    showToast({
      type: 'error',
      title: 'Account Activation Failed',
      message: 'Please check your input',
    })
    return { success: false }
  }

  const { name, email, password } = data.data

  const phone = `+${data.data.phone.replace(/^\+/, '')}`

  let otpSent = true

  try {
    const res = await register({ name, email, phone, password })
    otpSent = res?.data?.otpSent !== false
  } catch (error) {
    const status = isAxiosError(error) ? error.response?.status : undefined

    if (status === 404) {
      return { success: false, code: REGISTER_ERROR_CUSTOMER_NOT_FOUND }
    }

    if (status === 429) {
      showToast({
        type: 'error',
        title: 'Too Many OTP Requests',
        message: getApiErrorMessage(error, 'Please try again later.'),
      })
      return { success: false }
    }

    if (status === 409) {
      showToast({
        type: 'error',
        title: 'Account Already Registered',
        message:
          'Your details are already registered. Please log in using your password.',
      })
      return { success: false }
    }

    // Any other error (validation, server, network) is shown as a toast
    showToast({
      type: 'error',
      title: 'Account Activation Failed',
      message: getApiErrorMessage(error, 'Please try again in a moment.'),
    })
    return { success: false }
  }

  setRegisterPhone(phone)
  setRegisterEmail(email.trim().toLowerCase())

  if (!otpSent) {
    showToast({
      type: 'error',
      title: 'Failed to Send OTP',
      message: 'Please tap Resend OTP to try again.',
    })
  }

  return redirect('/register/verify-otp')
}
