import { ActionFunctionArgs, redirect } from 'react-router-dom'

import {
  AuthenticatedUser,
  getToken,
  isTokenValid,
  parseToken,
  removeToken,
  setPermissions,
  setToken,
} from '@/components/auth'
import { queryClient } from '@libs/query-client'

import { allPermissionsQuery } from '@models/permission/permission'
import { login, loginSchema } from '@models/user/user'

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
    const result = await login({ data })

    const tokenResult = result?.login?.accessToken || null

    if (tokenResult && isTokenValid(tokenResult)) {
      const decodeToken = parseToken(tokenResult) as AuthenticatedUser

      await queryClient.invalidateQueries()

      const permissions = await queryClient.fetchQuery(allPermissionsQuery({}))

      setPermissions(JSON.stringify(permissions))

      setToken(tokenResult, decodeToken.exp - decodeToken.iat)

      const params = new URL(request.url).searchParams
      const from = params.get('from') || '/dashboard'

      return redirect(from)
    }

    return {
      success: false,
      message: 'Invalid credentials',
    }
  } catch (error: any) {
    const message = await error?.text()

    return {
      success: false,
      message,
    }
  }
}
