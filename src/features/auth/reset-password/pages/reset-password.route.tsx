import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

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

  // @todo: validate the token with the backend and handle expired links
  return { token }
}

export async function authResetPasswordAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = resetPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    return { success: false, message: 'Please check your input' }
  }

  // @todo: call the reset password API once the backend is ready
  showToast({
    type: 'success',
    title: 'Password Successfully Updated!',
    message:
      'Your password has been changed. Please log in using your new password.',
  })

  return redirect('/login')
}
