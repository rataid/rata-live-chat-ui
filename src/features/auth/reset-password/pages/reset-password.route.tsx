import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

import { checkResetPasswordToken, resetPassword } from '@/api/auth/password'
import { getApiErrorMessage } from '@/api/shared/error'
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
    showToast({
      type: 'error',
      title: 'Link Expired',
      message: getApiErrorMessage(
        error,
        'This password reset link is invalid or has expired.'
      ),
    })

    return redirect('/forgot-password')
  }

  return { token }
}

export async function authResetPasswordAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = resetPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    return { success: false, message: 'Please check your input' }
  }

  try {
    await resetPassword({
      token: data.data.token,
      password: data.data.password,
    })
  } catch (error) {
    const message = getApiErrorMessage(error, 'Please try again in a moment.')
    showToast({ type: 'error', title: 'Failed to Update Password', message })

    return { success: false, message }
  }

  showToast({
    type: 'success',
    title: 'Password Successfully Updated!',
    message:
      'Your password has been changed. Please log in using your new password.',
  })

  return redirect('/login')
}
