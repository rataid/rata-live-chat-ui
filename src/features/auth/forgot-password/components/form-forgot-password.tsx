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
  AuthCard,
  AuthError,
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import { AuthForgotPasswordActionData } from '../pages/forgot-password.route'

function BackToLogin() {
  return (
    <AuthBackLink to="/login">
      <Icon icon="lucide-arrow-left" size="2xs" />
      Kembali ke halaman masuk
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
      <AuthCard>
        <BackToLogin />
        <AuthHeading className="!mb-0">
          <AuthTitle>Cek Email Anda</AuthTitle>
          <AuthSubtitle>
            Jika email Anda sudah terdaftar, kami akan mengirimkan tautan atur
            ulang kata sandi ke{' '}
            {actionData.email ? (
              <strong>{actionData.email}</strong>
            ) : (
              'email Anda'
            )}
            . Silakan cek inbox Anda dan klik tautan untuk mengatur ulang kata
            sandi.
          </AuthSubtitle>
        </AuthHeading>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <AuthHeading>
        <AuthTitle>Atur Ulang Kata Sandi</AuthTitle>
        <AuthSubtitle>
          Masukkan email Anda yang terdaftar dan kami akan mengirimkan tautan
          atur ulang kata sandi ke email Anda.
        </AuthSubtitle>
      </AuthHeading>
      {actionData?.success === false && actionData.message && (
        <AuthError>{actionData.message}</AuthError>
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
        <FormAction className="!pt-6">
          <Button
            type="submit"
            wider="full"
            fontWeight="medium"
            disabled={!isFilled || isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Tautan Atur Ulang'}
          </Button>
        </FormAction>
      </Form>
      <AuthFooter>
        Berubah pikiran? <AuthLink to="/login">Masuk</AuthLink>
      </AuthFooter>
    </AuthCard>
  )
}
