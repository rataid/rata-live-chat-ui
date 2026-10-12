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
  setUserName,
} from '@/components/auth'
import { loginSchema } from '@/model/user'
import { queryClient } from '@libs/query-client'
import { showToast } from '@nui/ui/toast'

export const LOGIN_ERROR_ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE'
export const LOGIN_ERROR_RATE_LIMITED = 'LOGIN_RATE_LIMITED'

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
      const from = params.get('from') || '/home'

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
      setUserName(result?.account?.name ?? '')

      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/home'

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

    if (
      body?.code === LOGIN_ERROR_RATE_LIMITED ||
      (isAxiosError(error) && error.response?.status === 429)
    ) {
      showToast({
        type: 'error',
        title: 'Too Many Attempts',
        message:
          typeof body?.message === 'string'
            ? body.message
            : 'Too many login attempts. Try again in 15 minutes.',
      })

      return { success: false, code: LOGIN_ERROR_RATE_LIMITED }
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
