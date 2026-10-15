import { isAxiosError } from 'axios'
import { ActionFunctionArgs } from 'react-router-dom'

import { forgotPassword } from '@/api/auth/password'
import { getApiErrorMessage } from '@/api/shared/error'
import { forgotPasswordSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

const EMAIL_NOT_REGISTERED = 'EMAIL_NOT_REGISTERED'

export type AuthForgotPasswordActionData = {
  success: boolean
  message?: string
  email?: string
}

export async function authForgotPasswordAction({
  request,
}: ActionFunctionArgs): Promise<AuthForgotPasswordActionData> {
  const formData = await request.formData()
  const data = forgotPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    return { success: false, message: 'Email is invalid' }
  }

  try {
    await forgotPassword(data.data.email)
  } catch (error) {
    const body = isAxiosError(error) ? error.response?.data : undefined

    if (body?.code === EMAIL_NOT_REGISTERED) {
      showToast({
        type: 'error',
        title: 'Email Not Registered',
        message: 'This email is not registered.',
      })

      return { success: false }
    }

    const message = getApiErrorMessage(error, 'Please try again in a moment.')
    showToast({ type: 'error', title: 'Failed to Send Email', message })

    return { success: false, message }
  }

  return { success: true, email: data.data.email.trim().toLowerCase() }
}
