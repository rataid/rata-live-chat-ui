import { mapValues } from 'lodash'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { verifyEmail } from '@/api/auth/verify-email'
import { handleApiError } from '@/api/shared/error'
import { AuthErrorCode } from '@/constants/auth-error-code'
import {
  VERIFY_OTP_STATUS,
  VerifyOtpStatus,
} from '@/features/auth/register/pages/verify-otp.route'
import { showToast } from '@nui/ui/toast'

const otpPage = (status?: VerifyOtpStatus) =>
  status ? `/register/verify-otp?status=${status}` : '/register/verify-otp'

// Toast and redirect for each error code of the email link
const VERIFY_EMAIL_ERRORS: Record<
  string,
  { title: string; message: string; to: string }
> = {
  [AuthErrorCode.OTP_SEND_FAILED]: {
    title: 'Kode OTP Gagal Dikirim',
    message:
      'Email Anda sudah terverifikasi, tapi kode OTP gagal dikirim ke WhatsApp. Tekan Resend OTP untuk mengirim ulang.',
    to: otpPage(VERIFY_OTP_STATUS.otpFailed),
  },
  [AuthErrorCode.VERIFY_TOKEN_INVALID]: {
    title: 'Tautan Kedaluwarsa',
    message:
      'Tautan verifikasi email ini sudah tidak berlaku atau kedaluwarsa.',
    to: '/register',
  },
  [AuthErrorCode.REGISTRATION_EXPIRED]: {
    title: 'Email Gagal Diverifikasi!',
    message:
      'Waktu verifikasi telah habis. Silakan isi ulang formulir aktivasi.',
    to: '/register',
  },
}

// Email link (/v/:token). Verified → OTP page (the backend sends the
// WhatsApp OTP). Not verified → back to the register form.
export async function authVerifyEmailLoader({ params }: LoaderFunctionArgs) {
  try {
    await verifyEmail(params.token ?? '')
  } catch (error) {
    return (
      handleApiError(error, {
        title: 'Email Gagal Diverifikasi!',
        code: mapValues(VERIFY_EMAIL_ERRORS, ({ title, message, to }) => () => {
          showToast({ type: 'error', title, message })
          return redirect(to)
        }),
      }) ?? redirect('/register')
    )
  }

  showToast({
    type: 'success',
    title: 'Email Berhasil Diverifikasi!',
    message:
      'Satu langkah lagi. Masukkan kode OTP yang kami kirim ke WhatsApp Anda.',
  })

  return redirect(otpPage())
}
