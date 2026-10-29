import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { verifyOtp } from '@/api/auth/otp'
import { handleApiError } from '@/api/shared/error'
import { verifyOtpSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

import { clearRegisterSession, getRegisterPhone } from '../register-session'

// Result of the email link, passed to the OTP page as ?status=
export const VERIFY_OTP_STATUS = {
  // Email verified, but the backend couldn't send the OTP: resend right away
  otpFailed: 'otp-failed',
} as const

export type VerifyOtpStatus =
  (typeof VERIFY_OTP_STATUS)[keyof typeof VERIFY_OTP_STATUS]

export type AuthVerifyOtpActionData = {
  success: boolean
}

export async function authVerifyOtpLoader() {
  const phone = getRegisterPhone()

  if (!phone) return redirect('/register')

  return { phone }
}

export async function authVerifyOtpAction({
  request,
}: ActionFunctionArgs): Promise<AuthVerifyOtpActionData | Response> {
  const formData = await request.formData()
  const data = verifyOtpSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) return { success: false }

  try {
    await verifyOtp({
      target: data.data.phone,
      channel: 'WA',
      purpose: 'REGISTER',
      code: data.data.otp,
    })
  } catch (error) {
    return (
      handleApiError<AuthVerifyOtpActionData>(error, {
        title: 'OTP Gagal Diverifikasi!',
      }) ?? { success: false }
    )
  }

  clearRegisterSession()

  showToast({
    type: 'success',
    title: 'Akun Berhasil Diaktifkan!',
    message:
      'Akun Anda kini aktif. Silakan masuk menggunakan kata sandi yang telah Anda buat.',
  })

  return redirect('/login')
}
