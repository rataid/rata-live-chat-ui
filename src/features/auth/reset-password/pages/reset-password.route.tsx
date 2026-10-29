import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

import { checkResetPasswordToken, resetPassword } from '@/api/auth/password'
import { handleApiError } from '@/api/shared/error'
import { resetPasswordSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

export type AuthResetPasswordActionData = {
  success: boolean
  message?: string
}

export async function authResetPasswordLoader({ request }: LoaderFunctionArgs) {
  const token = new URL(request.url).searchParams.get('token')

  // Only reachable from the link in the reset password email
  if (!token) return redirect('/forgot-password')

  try {
    await checkResetPasswordToken(token)
  } catch (error) {
    return (
      handleApiError(error, {
        title: 'Tautan Kedaluwarsa',
        fallback:
          'Tautan atur ulang kata sandi ini sudah tidak berlaku atau kedaluwarsa.',
      }) ?? redirect('/forgot-password')
    )
  }

  return { token }
}

export async function authResetPasswordAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = resetPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) return { success: false }

  try {
    await resetPassword({
      token: data.data.token,
      password: data.data.password,
    })
  } catch (error) {
    return (
      handleApiError<AuthResetPasswordActionData>(error, {
        title: 'Kata Sandi Gagal Diubah!',
      }) ?? { success: false }
    )
  }

  showToast({
    type: 'success',
    title: 'Kata Sandi Berhasil Diubah!',
    message:
      'Kata sandi Anda sudah diubah. Silakan masuk kembali dengan kata sandi Anda yang baru.',
  })

  return redirect('/login')
}
