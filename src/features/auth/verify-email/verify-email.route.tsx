import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { verifyEmail } from '@/api/auth/verify-email'
import { getApiErrorCode, showApiErrorToast } from '@/api/shared/error'
import { AuthErrorCode } from '@/constants/auth-error-code'
import {
  VERIFY_OTP_STATUS,
  VerifyOtpStatus,
} from '@/features/auth/register/pages/verify-otp.route'
import { showToast } from '@nui/ui/toast'

const otpPage = (status?: VerifyOtpStatus) =>
  status ? `/register/verify-otp?status=${status}` : '/register/verify-otp'

// Email link (/v/:token). Verified → OTP page (the backend sends the
// WhatsApp OTP). Not verified → back to the register form.
export async function authVerifyEmailLoader({ params }: LoaderFunctionArgs) {
  try {
    await verifyEmail(params.token ?? '')
  } catch (error) {
    const code = getApiErrorCode(error)

    if (code === AuthErrorCode.OTP_SEND_FAILED) {
      showToast({
        type: 'error',
        title: 'Kode OTP Gagal Dikirim',
        message:
          'Email Anda sudah terverifikasi, tapi kode OTP gagal dikirim ke WhatsApp. Tekan Resend OTP untuk mengirim ulang.',
      })
      return redirect(otpPage(VERIFY_OTP_STATUS.otpFailed))
    }

    if (code === AuthErrorCode.REGISTRATION_EXPIRED) {
      showToast({
        type: 'error',
        title: 'Email Gagal Diverifikasi!',
        message:
          'Waktu verifikasi telah habis. Silakan isi ulang formulir aktivasi.',
      })
      return redirect('/register')
    }

    showApiErrorToast(error, {
      title: 'Email Gagal Diverifikasi!',
    })
    return redirect('/register')
  }

  showToast({
    type: 'success',
    title: 'Email Berhasil Diverifikasi!',
    message:
      'Satu langkah lagi. Masukkan kode OTP yang kami kirim ke WhatsApp Anda.',
  })

  return redirect(otpPage())
}
