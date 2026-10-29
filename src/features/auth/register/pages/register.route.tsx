import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { register } from '@/api/auth/register'
import { handleApiError } from '@/api/shared/error'
import { AuthErrorCode } from '@/constants/auth-error-code'
import { registerSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

import { RESEND_EMAIL_COOLDOWN } from '../components/email-sent'
import {
  setRegisterEmail,
  setRegisterEmailResendAt,
  setRegisterEmailSent,
  setRegisterPhone,
} from '../register-session'

export type AuthRegisterActionData = {
  success: boolean
  code?: string
}

export async function authRegisterAction({
  request,
}: ActionFunctionArgs): Promise<AuthRegisterActionData | Response> {
  const formData = await request.formData()
  const data = registerSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) return { success: false }

  const { name, email, password } = data.data

  const phone = `+${data.data.phone.replace(/^\+/, '')}`

  let retryAfterSeconds: number | undefined

  try {
    const res = await register({ name, email, phone, password })
    retryAfterSeconds = res.data?.retryAfterSeconds
  } catch (error) {
    return (
      handleApiError<AuthRegisterActionData>(error, {
        title: 'Aktivasi Akun Gagal',
        code: {
          // Shown as a dialog by the register form
          [AuthErrorCode.CUSTOMER_NOT_FOUND]: () => ({
            success: false,
            code: AuthErrorCode.CUSTOMER_NOT_FOUND,
          }),
          [AuthErrorCode.ALREADY_ACTIVATED]: () => {
            showToast({
              type: 'error',
              title: 'Akun sudah aktif',
              message:
                'Data Anda sudah terdaftar dan sudah aktif. Silakan masuk menggunakan kata sandi Anda.',
            })
            return { success: false }
          },
        },
      }) ?? { success: false }
    )
  }

  // The phone is kept for the WhatsApp OTP step after the email link
  setRegisterPhone(phone)
  setRegisterEmail(email.trim().toLowerCase())
  setRegisterEmailSent()
  setRegisterEmailResendAt(retryAfterSeconds ?? RESEND_EMAIL_COOLDOWN)

  return redirect('/register/email-sent')
}
