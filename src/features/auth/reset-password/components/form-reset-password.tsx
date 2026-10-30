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
      <AuthHeading>
        <AuthTitle>Atur Ulang Kata Sandi</AuthTitle>
        <AuthSubtitle>
          Buat kata sandi yang baru dengan minimum 8 karakter.
        </AuthSubtitle>
      </AuthHeading>
      {/* Validation errors only; API errors are shown as a toast */}
      {actionData?.message && <AuthError>{actionData.message}</AuthError>}
      <Form onSubmit={onSubmit}>
        <Controller
          name="token"
          defaultValue={token}
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <FormMain gap="sm">
          <FormControl required error={errors.password}>
            <FormLabel>Kata Sandi Baru</FormLabel>
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
            <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
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
            {isSubmitting ? 'Menyimpan...' : 'Ubah Kata Sandi'}
          </Button>
        </FormAction>
      </Form>
    </AuthCard>
  )
}
