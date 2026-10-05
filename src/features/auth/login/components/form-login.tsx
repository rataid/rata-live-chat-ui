import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useActionData, useNavigation } from 'react-router-dom'

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
import { usePopupDialog } from '@nui/ui/popup-dialog'
import { maskEmail } from '@utils'

import {
  AuthLoginActionData,
  LOGIN_ERROR_ACCOUNT_INACTIVE,
} from '../pages/login.route'
import {
  AuthFormLoginError,
  AuthFormLoginFooter,
  AuthFormLoginHeading,
  AuthFormLoginMain,
  AuthFormLoginMore,
  AuthFormLoginSubtitle,
  AuthFormLoginTitle,
  AuthLink,
} from './form-login.style'

export default function AuthFormLogin() {
  const actionData = useActionData() as AuthLoginActionData | undefined

  const isInactive = actionData?.code === LOGIN_ERROR_ACCOUNT_INACTIVE

  const { openPopup } = usePopupDialog()

  // Reopen on every submit that returns the inactive error
  useEffect(() => {
    if (isInactive) {
      openPopup({
        title: 'Email Not Verified',
        message: (
          <>
            Your email{' '}
            <span className="font-semibold text-gray-900">
              ({maskEmail(actionData?.email)})
            </span>{' '}
            isn&apos;t verified yet. Check your inbox or spam folder to complete
            activation.
          </>
        ),
        actions: [
          { label: 'Close', variant: 'secondaryGray' },
          // @todo: call the resend activation email API once available
          { label: 'Resend Email' },
        ],
      })
    }
  }, [actionData, isInactive, openPopup])

  const isSubmitting = useNavigation().state !== 'idle'

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
    <AuthFormLoginMain>
      <AuthFormLoginHeading>
        <AuthFormLoginTitle>Welcome</AuthFormLoginTitle>
        <AuthFormLoginSubtitle>
          Log in to your patient account
        </AuthFormLoginSubtitle>
      </AuthFormLoginHeading>
      {actionData?.success === false && !isInactive && (
        <AuthFormLoginError>{actionData.message}</AuthFormLoginError>
      )}
      <Form onSubmit={onSubmit}>
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
        <AuthFormLoginMore>
          <AuthLink to="/forgot-password">Forgot password?</AuthLink>
        </AuthFormLoginMore>
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
      <AuthFormLoginFooter>
        Don&apos;t have an account yet?{' '}
        <AuthLink to="/register">Account Activation</AuthLink>
      </AuthFormLoginFooter>
    </AuthFormLoginMain>
  )
}
