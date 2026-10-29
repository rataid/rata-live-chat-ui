import { isAxiosError } from 'axios'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { register } from '@/api/auth/register'
import { getApiErrorMessage, showApiErrorToast } from '@/api/shared/error'
import { registerSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

import { RESEND_EMAIL_COOLDOWN } from '../components/email-sent'
import {
  setRegisterEmail,
  setRegisterEmailResendAt,
  setRegisterEmailSent,
  setRegisterPhone,
} from '../register-session'

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

  let retryAfterSeconds: number | undefined

  try {
    const res = await register({ name, email, phone, password })
    retryAfterSeconds = res.data?.retryAfterSeconds
  } catch (error) {
    const status = isAxiosError(error) ? error.response?.status : undefined

    if (status === 404) {
      return { success: false, code: REGISTER_ERROR_CUSTOMER_NOT_FOUND }
    }

    if (status === 409) {
      showToast({
        type: 'error',
        title: 'Akun sudah aktif',
        message:
          'Data Anda sudah terdaftar dan sudah aktif. Silakan masuk menggunakan kata sandi Anda.',
      })
      return { success: false }
    }

    // Any other error (validation, server, network) is shown as a toast
    showApiErrorToast(error, {
      title: 'Aktivasi Akun Gagal',
    })
    return { success: false }
  }

  // The phone is kept for the WhatsApp OTP step after the email link
  setRegisterPhone(phone)
  setRegisterEmail(email.trim().toLowerCase())
  setRegisterEmailSent()
  setRegisterEmailResendAt(retryAfterSeconds ?? RESEND_EMAIL_COOLDOWN)

  return redirect('/register/email-sent')
}
