import { Controller } from 'react-hook-form'
import { useActionData, useNavigation } from 'react-router-dom'

import { forgotPasswordSchema } from '@/model/user'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  InputIcase,
} from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'

import {
  AuthBackLink,
  AuthFormLoginError,
  AuthFormLoginHeading,
  AuthFormLoginMain,
  AuthFormLoginSubtitle,
  AuthFormLoginTitle,
} from '../../login/components/form-login.style'
import { AuthForgotPasswordActionData } from '../pages/forgot-password.route'

function BackToLogin() {
  return (
    <AuthBackLink to="/login">
      <Icon icon="lucide-arrow-left" size="2xs" />
      Back to Login
    </AuthBackLink>
  )
}

export default function AuthFormForgotPassword() {
  const actionData = useActionData() as AuthForgotPasswordActionData | undefined

  const isSubmitting = useNavigation().state !== 'idle'

  const { methods, onSubmit } = useFormHelper({
    schema: forgotPasswordSchema,
  })

  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const isFilled = !!watch('email')

  if (actionData?.success) {
    return (
      <AuthFormLoginMain>
        <BackToLogin />
        <AuthFormLoginHeading tw="!mb-0">
          <AuthFormLoginTitle>Check Your Email</AuthFormLoginTitle>
          <AuthFormLoginSubtitle>
            If your email is registered, we&apos;ve sent password reset
            instructions to your inbox. Please check your inbox and spam
            folders.
          </AuthFormLoginSubtitle>
        </AuthFormLoginHeading>
      </AuthFormLoginMain>
    )
  }

  return (
    <AuthFormLoginMain>
      <BackToLogin />
      <AuthFormLoginHeading>
        <AuthFormLoginTitle>Forgot Password?</AuthFormLoginTitle>
        <AuthFormLoginSubtitle>
          Enter your primary email to receive a recovery link.
        </AuthFormLoginSubtitle>
      </AuthFormLoginHeading>
      {actionData?.success === false && (
        <AuthFormLoginError>{actionData.message}</AuthFormLoginError>
      )}
      <Form onSubmit={onSubmit}>
        <FormMain gap="sm">
          <FormControl required error={errors.email}>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputIcase
                  displayCase="lower"
                  allowSpace={false}
                  placeholder="you@email.com"
                  autoComplete="email"
                  {...field}
                />
              )}
            />
          </FormControl>
        </FormMain>
        <FormAction tw="!pt-6">
          <Button
            type="submit"
            wider="full"
            fontWeight="medium"
            disabled={!isFilled || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </FormAction>
      </Form>
    </AuthFormLoginMain>
  )
}
