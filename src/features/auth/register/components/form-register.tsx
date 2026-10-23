import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useActionData, useNavigation } from 'react-router-dom'

import { PORTAL_NAME } from '@/constants/portal'
import { registerSchema } from '@/model/user'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  Input,
  InputIcase,
} from '@nui/form'
import { InputPhone } from '@nui/form/input/components/phone'
import useFormHelper from '@nui/hooks/use-form-helper'
import Button from '@nui/ui/button'
import { useDialog } from '@nui/ui/dialog'

import {
  AuthCard,
  AuthFooter,
  AuthHeading,
  AuthLink,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import {
  AuthRegisterActionData,
  REGISTER_ERROR_CUSTOMER_NOT_FOUND,
} from '../pages/register.route'

export default function AuthFormRegister() {
  const actionData = useActionData() as AuthRegisterActionData | undefined

  const isNotFound = actionData?.code === REGISTER_ERROR_CUSTOMER_NOT_FOUND

  const { openDialog } = useDialog()

  // Reopen on every submit that returns the not found error
  useEffect(() => {
    if (!isNotFound) return

    openDialog({
      title: 'Data tidak ditemukan',
      message: `Data Anda tidak ditemukan. ${PORTAL_NAME} hanya untuk pasien terdaftar. Hubungi kami jika ini kesalahan.`,
      closable: true,
    })
  }, [actionData, isNotFound, openDialog])

  const isSubmitting = useNavigation().state !== 'idle'

  const { methods, onSubmit } = useFormHelper({
    schema: registerSchema,
  })

  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const values = watch([
    'name',
    'email',
    'phone',
    'password',
    'password_confirmation',
  ])

  const isFilled = values.every(Boolean)

  return (
    <AuthCard>
      <AuthHeading>
        <AuthTitle>Aktivasi Akun</AuthTitle>
        <AuthSubtitle>
          Buat kata sandi untuk mulai menggunakan akun pasien Anda.
        </AuthSubtitle>
      </AuthHeading>
      <Form onSubmit={onSubmit}>
        <FormMain gap="sm">
          <FormControl required error={errors.name}>
            <FormLabel>Nama Lengkap</FormLabel>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="cth. Budi Santoso"
                  autoComplete="name"
                  {...field}
                />
              )}
            />
          </FormControl>
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
          <FormControl required error={errors.phone}>
            <FormLabel>Nomor Telepon</FormLabel>
            <Controller
              name="phone"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputPhone placeholder="8XX-XXXX-XXXX" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.password}>
            <FormLabel>Kata Sandi</FormLabel>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Minimum 8 karakter"
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.password_confirmation}>
            <FormLabel>Konfirmasi Kata Sandi</FormLabel>
            <Controller
              name="password_confirmation"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Ulangi kata sandi"
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
          </FormControl>
        </FormMain>
        <FormAction className="!pt-3">
          <Button
            type="submit"
            wider="full"
            fontWeight="medium"
            disabled={!isFilled || isSubmitting}
          >
            {isSubmitting ? 'Aktivasi...' : 'Aktivasi Akun'}
          </Button>
        </FormAction>
      </Form>
      <AuthFooter>
        Akun sudah aktif? <AuthLink to="/login">Masuk</AuthLink>
      </AuthFooter>
    </AuthCard>
  )
}
