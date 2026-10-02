import { Controller } from 'react-hook-form'
import { useActionData, useLoaderData, useNavigation } from 'react-router-dom'

import { resetPasswordSchema } from '@/model/user'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  Input,
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
import { AuthResetPasswordActionData } from '../pages/reset-password.route'

export default function AuthFormResetPassword() {
  const { token } = useLoaderData() as { token: string }

  const actionData = useActionData() as AuthResetPasswordActionData | undefined

  const isSubmitting = useNavigation().state !== 'idle'

  const { methods, onSubmit } = useFormHelper({
    schema: resetPasswordSchema,
  })

  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const [password, passwordConfirmation] = watch([
    'password',
    'password_confirmation',
  ])

  const isFilled = !!password && !!passwordConfirmation

  return (
    <AuthFormLoginMain>
      <AuthBackLink to="/login">
        <Icon icon="lucide-arrow-left" size="2xs" />
        Back to Login
      </AuthBackLink>
      <AuthFormLoginHeading>
        <AuthFormLoginTitle>Reset Password</AuthFormLoginTitle>
        <AuthFormLoginSubtitle>
          Create a new strong password for your account.
        </AuthFormLoginSubtitle>
      </AuthFormLoginHeading>
      {actionData?.success === false && (
        <AuthFormLoginError>{actionData.message}</AuthFormLoginError>
      )}
      <Form onSubmit={onSubmit}>
        <Controller
          name="token"
          defaultValue={token}
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <FormMain gap="sm">
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
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.password_confirmation}>
            <FormLabel>Confirm Password</FormLabel>
            <Controller
              name="password_confirmation"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
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
            {isSubmitting ? 'Saving...' : 'Save New Password'}
          </Button>
        </FormAction>
      </Form>
    </AuthFormLoginMain>
  )
}
