import { useEffect, useState } from 'react'

import { resendVerificationEmail } from '@/api/auth/resend-verification-email'
import { getApiError, showApiErrorToast } from '@/api/shared/error'
import { showToast } from '@nui/ui/toast'
import { formatDuration } from '@utils'

import {
  AuthCard,
  AuthHeading,
  AuthResendButton,
  AuthResendRow,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import {
  getRegisterEmail,
  getRegisterEmailCooldown,
  setRegisterEmailResendAt,
} from '../register-session'

// Seconds before Kirim Ulang is enabled, after the first email and each resend
export const RESEND_EMAIL_COOLDOWN = 60

// Right after the register form: the email link leads to the WhatsApp OTP
export default function AuthEmailSent() {
  const email = getRegisterEmail()

  // Counted from the register response (retryAfterSeconds), so a refresh
  // doesn't restart it
  const [cooldown, setCooldown] = useState(
    () => getRegisterEmailCooldown() ?? RESEND_EMAIL_COOLDOWN
  )
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return undefined

    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)

    return () => clearTimeout(timer)
  }, [cooldown])

  const handleResend = async () => {
    if (!email) return

    setIsResending(true)

    try {
      await resendVerificationEmail(email)
      showToast({
        type: 'success',
        title: 'Email Verifikasi Dikirim!',
        message: `Tautan verifikasi baru telah dikirim ke ${email}.`,
      })
      setRegisterEmailResendAt(RESEND_EMAIL_COOLDOWN)
      setCooldown(RESEND_EMAIL_COOLDOWN)
    } catch (error) {
      // Rate limited: wait the time the backend asks for
      const retryAfterSeconds = getApiError<{ retryAfterSeconds?: number }>(
        error
      )?.retryAfterSeconds
      if (retryAfterSeconds) {
        setRegisterEmailResendAt(retryAfterSeconds)
        setCooldown(retryAfterSeconds)
      }

      showApiErrorToast(error, {
        title: 'Email Verifikasi Gagal Dikirim!',
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthCard>
      <AuthHeading className="!mb-0">
        <AuthTitle>Cek Email Anda</AuthTitle>
        <AuthSubtitle>
          Kami telah mengirim tautan verifikasi ke{' '}
          {email ? (
            <strong className="font-medium text-gray-900">{email}</strong>
          ) : (
            'email Anda'
          )}
          . Klik tautan tersebut untuk lanjut ke verifikasi nomor handphone.
        </AuthSubtitle>
      </AuthHeading>
      <AuthResendRow>
        Belum menerima email?{' '}
        <AuthResendButton
          type="button"
          disabled={!email || isResending || cooldown > 0}
          onClick={handleResend}
        >
          {isResending
            ? 'Mengirim...'
            : cooldown > 0
            ? `Kirim Ulang (${formatDuration(cooldown)})`
            : 'Kirim Ulang'}
        </AuthResendButton>
      </AuthResendRow>
    </AuthCard>
  )
}
