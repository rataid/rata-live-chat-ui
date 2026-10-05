import { isAxiosError } from 'axios'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { register } from '@/api/auth/register'
import { getApiErrorMessage } from '@/api/shared/error'
import { registerSchema } from '@/model/user'
import { showToast } from '@nui/ui/toast'

// The phone number doesn't match any registered patient (API returns 404)
export const REGISTER_ERROR_CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND'

export type AuthRegisterActionData = {
  success: boolean
  code?: string
}

export async function authRegisterAction({
  request,
}: ActionFunctionArgs): Promise<AuthRegisterActionData | Response> {
  const formData = await request.formData()
  const data = registerSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    showToast({
      type: 'error',
      title: 'Account Activation Failed',
      message: 'Please check your input',
    })
    return { success: false }
  }

  const { name, email, password } = data.data

  // InputPhone gives 6281234567890, the API expects +6281234567890
  const phone = `+${data.data.phone.replace(/^\+/, '')}`

  try {
    await register({ name, email, phone, password })
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { success: false, code: REGISTER_ERROR_CUSTOMER_NOT_FOUND }
    }

    // Any other error (validation, server, network) is shown as a toast
    showToast({
      type: 'error',
      title: 'Account Activation Failed',
      message: getApiErrorMessage(error, 'Please try again in a moment.'),
    })
    return { success: false }
  }

  // The backend sends the OTP to this phone number
  return redirect(`/register/verify-otp?${new URLSearchParams({ phone })}`)
}
