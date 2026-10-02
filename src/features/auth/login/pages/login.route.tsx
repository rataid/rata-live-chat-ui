import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { login } from '@/api/login'
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

export const LOGIN_ERROR_ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE'

const DUMMY_INACTIVE_EMAIL = 'inactive@rata.id'

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

  // @todo: remove this dummy once the backend returns the inactive account error
  if (data.email === DUMMY_INACTIVE_EMAIL) {
    return {
      success: false,
      code: LOGIN_ERROR_ACCOUNT_INACTIVE,
      email: data.email,
    }
  }

  try {
    const result = await login(data)
    const tokenResult = result?.data?.data?.access_token || null

    if (tokenResult && isTokenValid(tokenResult)) {
      queryClient.invalidateQueries()

      setToken(tokenResult)

      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/chat'

      return redirect(from)
    }

    return {
      success: false,
      message: 'Invalid credentials',
    }
  } catch (error: any) {
    const message = error?.response?.data?.message

    return {
      success: false,
      message,
    }
  }
}
