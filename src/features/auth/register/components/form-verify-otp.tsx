import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useLoaderData, useNavigation } from 'react-router-dom'

import { requestOtp } from '@/api/auth/otp'
import { getApiErrorMessage } from '@/api/shared/error'
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

const RESEND_COOLDOWN = 60

export default function AuthFormVerifyOtp() {
  const { phone } = useLoaderData() as { phone: string }

  const isSubmitting = useNavigation().state !== 'idle'

  // The OTP was just sent by the register step
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN)

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
      showToast({
        type: 'error',
        title: 'Failed to Send OTP',
        message: getApiErrorMessage(error, 'Please try again in a moment.'),
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
      <AuthBackLink to="/login">
        <Icon icon="lucide-arrow-left" size="2xs" />
        Back to Login
      </AuthBackLink>
      <AuthHeading>
        <AuthTitle>Verification Code (SMS/WA)</AuthTitle>
        <AuthSubtitle>
          We have sent the OTP code to{' '}
          <span className="font-semibold text-gray-900">
            {maskPhone(phone)}
          </span>
          , please check your SMS/WhatsApp.
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
            <FormLabel>OTP</FormLabel>
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
            {isSubmitting ? 'Verifying...' : 'Verification'}
          </Button>
        </FormAction>
      </Form>
      <AuthFooter>
        Didn&apos;t receive OTP?{' '}
        {cooldown > 0 ? (
          <span className="font-medium text-gray-400">
            Resend OTP in {cooldown}s
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
