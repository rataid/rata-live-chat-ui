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
  AuthCard,
  AuthError,
  AuthHeading,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
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
    <AuthCard>
      <AuthBackLink to="/login">
        <Icon icon="lucide-arrow-left" size="2xs" />
        Back to Login
      </AuthBackLink>
      <AuthHeading>
        <AuthTitle>Reset Password</AuthTitle>
        <AuthSubtitle>
          Create a new strong password for your account.
        </AuthSubtitle>
      </AuthHeading>
      {actionData?.success === false && (
        <AuthError>{actionData.message}</AuthError>
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
        <FormAction className="!pt-6">
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
    </AuthCard>
  )
}
