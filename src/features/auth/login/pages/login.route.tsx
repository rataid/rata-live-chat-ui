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

export async function authLoginLoader({ request }: ActionFunctionArgs) {
  const token = getToken()

  if (token) {
    if (isTokenValid(token)) {
      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/dashboard'

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
    const result = await login( data )
    const tokenResult = result?.data?.data?.access_token || null

    if (tokenResult && isTokenValid(tokenResult)) {
      queryClient.invalidateQueries()

      setToken(tokenResult)

      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/dashboard'

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
