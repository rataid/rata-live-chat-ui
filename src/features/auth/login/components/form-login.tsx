import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useActionData, useNavigation } from 'react-router-dom'

import { resendVerificationEmail } from '@/api/auth/resend-verification-email'
import { getApiErrorMessage } from '@/api/shared/error'
import { loginSchema } from '@/model/user'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  Input,
  InputIcase,
} from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Button from '@nui/ui/button'
import { useDialog } from '@nui/ui/dialog'
import { showToast } from '@nui/ui/toast'

import {
  AuthCard,
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthMore,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import {
  AuthLoginActionData,
  LOGIN_ERROR_ACCOUNT_INACTIVE,
} from '../pages/login.route'

export default function AuthFormLogin() {
  const actionData = useActionData() as AuthLoginActionData | undefined

  const isInactive = actionData?.code === LOGIN_ERROR_ACCOUNT_INACTIVE

  const { openDialog } = useDialog()

  // Reopen on every submit that returns the inactive error
  useEffect(() => {
    if (isInactive) {
      const email = actionData?.email

      const handleResend = async () => {
        if (!email) return

        try {
          await resendVerificationEmail(email)
          showToast({
            type: 'success',
            title: 'Email Sent',
            message: `A new activation link has been sent to ${email}.`,
          })
        } catch (error) {
          showToast({
            type: 'error',
            title: 'Failed to Resend Email',
            message: getApiErrorMessage(error, 'Please try again in a moment.'),
          })
        }
      }

      openDialog({
        title: 'Verify your account',
        message:
          'Your account has not been activated yet. Check your email for the activation link, or request a new one.',
        actions: [
          { label: 'Close', variant: 'secondaryGray' },
          { label: 'Resend Email', onClick: handleResend },
        ],
      })
    }
  }, [actionData, isInactive, openDialog])

  const navigation = useNavigation()
  // Show the spinner on click. Navigation state only flips after the request starts,
  // which is too late to see on a fast login.
  const [pending, setPending] = useState(false)
  const isSubmitting = pending || navigation.state !== 'idle'

  useEffect(() => {
    if (navigation.state === 'idle') {
      setPending(false)
    }
  }, [navigation.state])

  const { methods, onSubmit } = useFormHelper({
    schema: loginSchema,
  })

  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const [email, password] = watch(['email', 'password'])

  const isFilled = !!email && !!password

  return (
    <AuthCard>
      <AuthHeading>
        <AuthTitle>Exclusively for Rata, Tanam and Vinir customers</AuthTitle>
        <AuthSubtitle>Log in to continue.</AuthSubtitle>
      </AuthHeading>
      <Form
        onSubmit={async (event) => {
          event.preventDefault()
          setPending(true)
          const valid = await methods.trigger()
          if (!valid) {
            setPending(false)
            return
          }
          onSubmit(event)
        }}
      >
        <FormMain gap="sm">
          <FormControl required error={errors.email}>
            <FormLabel>Email / Phone Number</FormLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputIcase
                  displayCase="lower"
                  allowSpace={false}
                  placeholder="you@email.com or 08XXXXXXXXXX"
                  autoComplete="username"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.password}>
            <FormLabel>Password</FormLabel>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
          </FormControl>
        </FormMain>
        <AuthMore>
          <AuthLink to="/forgot-password">Forgot password?</AuthLink>
        </AuthMore>
        <FormAction className="!pt-3">
          <Button
            type="submit"
            wider="full"
            fontWeight="medium"
            disabled={!isFilled || isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </FormAction>
      </Form>
      <AuthFooter>
        Don&apos;t have an account yet?{' '}
        <AuthLink to="/register">Account Activation</AuthLink>
      </AuthFooter>
    </AuthCard>
  )
}
