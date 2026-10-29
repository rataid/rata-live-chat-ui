import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router-dom'

import { requestOtp } from '@/api/auth/otp'
import { getApiErrorCode, showApiErrorToast } from '@/api/shared/error'
import { AuthErrorCode } from '@/constants/auth-error-code'
import { verifyOtpSchema } from '@/model/user'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  InputOtp,
} from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import { showToast } from '@nui/ui/toast'
import { formatDuration, maskPhone } from '@utils'

import {
  AuthBackLink,
  AuthCard,
  AuthHeading,
  AuthResendButton,
  AuthResendRow,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import { VERIFY_OTP_STATUS } from '../pages/verify-otp.route'
import { clearRegisterSession } from '../register-session'

const RESEND_COOLDOWN = 1 * 60

export default function AuthFormVerifyOtp() {
  const [searchParams] = useSearchParams()
  const otpFailed = searchParams.get('status') === VERIFY_OTP_STATUS.otpFailed

  return <OtpForm otpFailed={otpFailed} />
}

function OtpForm({ otpFailed }: { otpFailed: boolean }) {
  const { phone } = useLoaderData() as { phone: string }

  const navigate = useNavigate()

  const isSubmitting = useNavigation().state !== 'idle'

  // The backend sent the OTP when the email link was opened. If that failed,
  // Resend OTP is available right away.
  const [cooldown, setCooldown] = useState(otpFailed ? 0 : RESEND_COOLDOWN)

  useEffect(() => {
    if (cooldown <= 0) return undefined

    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)

    return () => clearTimeout(timer)
  }, [cooldown])

  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)

    try {
      await requestOtp({ target: phone, channel: 'WA', purpose: 'REGISTER' })
      showToast({
        type: 'success',
        title: 'OTP Sent',
        message: `A new OTP code has been sent to ${maskPhone(phone)}.`,
      })
      setCooldown(RESEND_COOLDOWN)
    } catch (error) {
      // The pending registration is gone (expired or email not verified):
      // nothing to send an OTP for, so the patient registers again
      if (getApiErrorCode(error) === AuthErrorCode.REGISTRATION_NOT_PENDING) {
        clearRegisterSession()
        showToast({
          type: 'error',
          title: 'Gagal Kirim OTP',
          message:
            'Aktivasi akun Anda sudah tidak berlaku. Silakan lakukan registrasi ulang.',
        })
        navigate('/register', { replace: true })
        return
      }

      showApiErrorToast(error, {
        title: 'Gagal Kirim OTP',
      })
    } finally {
      setIsResending(false)
    }
  }

  const { methods, onSubmit } = useFormHelper({
    schema: verifyOtpSchema,
  })

  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const isFilled = /^\d{6}$/.test(watch('otp') ?? '')

  return (
    <AuthCard>
      <AuthHeading>
        <AuthTitle>Akun Anda Hampir Siap!</AuthTitle>
        <AuthSubtitle>
          Kami telah mengirimkan kode OTP ke {maskPhone(phone)}. melalui
          WhatsApp. Masukkan kode tersebut untuk menyelesaikan proses aktivasi
          akun.{' '}
        </AuthSubtitle>
      </AuthHeading>
      <Form onSubmit={onSubmit}>
        <Controller
          name="phone"
          defaultValue={phone}
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <FormMain gap="sm">
          <FormControl required error={errors.otp}>
            <FormLabel>Kode OTP</FormLabel>
            <Controller
              name="otp"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputOtp danger={!!errors.otp} autoFocus {...field} />
              )}
            />
          </FormControl>
        </FormMain>
        <FormAction className="!pt-6">
          <Button
            type="submit"
            wider="full"
            fontWeight="medium"
            disabled={!isFilled || isSubmitting}
          >
            {isSubmitting ? 'Verifikasi...' : 'Verifikasi'}
          </Button>
        </FormAction>
      </Form>
      <AuthResendRow>
        Belum menerima OTP?{' '}
        <AuthResendButton
          type="button"
          disabled={isResending || cooldown > 0}
          onClick={handleResend}
        >
          {isResending
            ? 'Mengirim...'
            : cooldown > 0
            ? `Kirim Ulang OTP (${formatDuration(cooldown)})`
            : 'Kirim Ulang OTP'}
        </AuthResendButton>
      </AuthResendRow>
    </AuthCard>
  )
}
