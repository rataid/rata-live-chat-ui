import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { verifyOtp } from '@/api/auth/otp'
import { showApiErrorToast } from '@/api/shared/error'
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

  // The phone comes from the register form in this browser.
  // @todo: take it from the verify email response once the backend sends it,
  // so the email link also works in another browser or device
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
      title: 'OTP Gagal Diverifikasi!',
      message: 'OTP tidak valid. Silakan periksa kembali dan coba lagi.',
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
    showApiErrorToast(error, {
      title: 'OTP Gagal Diverifikasi!',
    })
    return { success: false }
  }

  clearRegisterSession()

  showToast({
    type: 'success',
    title: 'Akun Berhasil Diaktifkan!',
    message: 'Akun Anda aktif. Masuk dengan kata sandi Anda.',
  })

  return redirect('/login')
}
