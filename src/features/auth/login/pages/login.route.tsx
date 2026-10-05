import { isAxiosError } from 'axios'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { login } from '@/api/auth/login'
import {
  AuthenticatedUser,
  getToken,
  isTokenValid,
  parseToken,
  removeToken,
  setPermissions,
  setToken,
} from '@/components/auth'
import { loginSchema } from '@/model/user'
import { queryClient } from '@libs/query-client'
import { showToast } from '@nui/ui/toast'

export const LOGIN_ERROR_ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE'

export type AuthLoginActionData = {
  success: boolean
  message?: string
  code?: string
  email?: string
}

export async function authLoginLoader({ request }: ActionFunctionArgs) {
  const token = getToken()

  if (token) {
    if (isTokenValid(token)) {
      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/chat'

      return redirect(from)
    }

    removeToken()
  }

  return null
}

export async function authLoginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = loginSchema.parse(Object.fromEntries(formData))

  try {
    const result = await login(data)
    const tokenResult = result?.accessToken || null

    if (tokenResult && isTokenValid(tokenResult)) {
      queryClient.invalidateQueries()

      setToken(tokenResult)

      showToast({
        type: 'success',
        title: 'Account Activation Successful!',
        message:
          'Your account is now active. Please log in using the password you created.',
      })

      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/chat'

      return redirect(from)
    }

    showToast({
      type: 'error',
      title: 'Login Failed',
      message:
        'The email or password you entered is incorrect. Please check again.',
    })

    return { success: false }
  } catch (error) {
    const body = isAxiosError(error) ? error.response?.data : undefined

    // Inactive accounts open the Email Not Verified modal, not a toast.
    if (body?.code === LOGIN_ERROR_ACCOUNT_INACTIVE) {
      return {
        success: false,
        code: body.code,
        email: body.email,
        message: typeof body.message === 'string' ? body.message : undefined,
      }
    }

    showToast({
      type: 'error',
      title: 'Login Failed',
      message:
        'The email or password you entered is incorrect. Please check again.',
    })

    return { success: false }
  }
}
