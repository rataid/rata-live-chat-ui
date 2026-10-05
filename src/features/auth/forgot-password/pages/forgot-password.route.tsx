import { ActionFunctionArgs } from 'react-router-dom'

import { forgotPasswordSchema } from '@/model/user'

export type AuthForgotPasswordActionData = {
  success: boolean
  message?: string
}

export async function authForgotPasswordAction({
  request,
}: ActionFunctionArgs): Promise<AuthForgotPasswordActionData> {
  const formData = await request.formData()
  const data = forgotPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    return { success: false, message: 'Email is invalid' }
  }

  // @todo: call the forgot password API once the backend is ready.
  // Always show the same result whether the email is registered or not,
  // so the page can't be used to check which emails have an account.
  return { success: true }
}
