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
import { maskPhone } from '@utils'

import {
  AuthBackLink,
  AuthCard,
  AuthFooter,
  AuthHeading,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import { VERIFY_OTP_STATUS } from '../pages/verify-otp.route'
import { clearRegisterSession } from '../register-session'

const RESEND_COOLDOWN = 1 * 60

function formatCooldown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

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
        <AuthTitle>Satu Langkah Lagi</AuthTitle>
        <AuthSubtitle>
          Kami telah mengirimkan kode OTP ke{' '}
          <span className="font-semibold text-gray-900">
            {maskPhone(phone)}.
          </span>
          Masukkan kode tersebut untuk menyelesaikan pendaftaran.{' '}
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
      <AuthFooter>
        Belum menerima OTP?{' '}
        {cooldown > 0 ? (
          <span className="font-medium text-gray-400">
            Kirim Ulang OTP ({formatCooldown(cooldown)})
          </span>
        ) : (
          <button
            type="button"
            className="font-medium text-primary-600 hover:text-primary-700 hover:underline disabled:cursor-wait disabled:text-gray-400 disabled:no-underline"
            disabled={isResending}
            onClick={handleResend}
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </AuthFooter>
    </AuthCard>
  )
}
