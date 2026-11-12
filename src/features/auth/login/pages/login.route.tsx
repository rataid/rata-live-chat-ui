import { isAxiosError } from 'axios'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { login } from '@/api/auth/login'
import { handleApiError } from '@/api/shared/error'
import {
  getToken,
  isTokenValid,
  removeToken,
  setToken,
  setUserName,
} from '@/components/auth'
import { AuthErrorCode } from '@/constants/auth-error-code'
import { isSessionExpired, refreshAccessToken } from '@/libs/session'
import { loginSchema } from '@/model/user'
import { queryClient } from '@libs/query-client'
import { showToast } from '@nui/ui/toast'

export type AuthLoginActionData = {
  success: boolean
  message?: string
  code?: string
  email?: string
}

export async function authLoginLoader({ request }: ActionFunctionArgs) {
  let token = getToken()
  if (token && !isTokenValid(token)) {
    try {
      token = await refreshAccessToken()
    } catch (error) {
      if (!isSessionExpired(error)) throw error
      token = null
    }
  }

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
      title: 'Gagal Masuk',
      message:
        'Layanan masuk sedang mengalami kendala. Silakan coba beberapa saat lagi.',
    })

    return { success: false }
  } catch (error) {
    const body = isAxiosError(error) ? error.response?.data : undefined

    return (
      handleApiError<AuthLoginActionData>(error, {
        title: 'Gagal Masuk',
        fallback: 'Tidak dapat masuk. Silakan coba lagi.',
        code: {
          // Shown as the Email Not Verified dialog by the login form
          [AuthErrorCode.ACCOUNT_INACTIVE]: () => ({
            success: false,
            code: AuthErrorCode.ACCOUNT_INACTIVE,
            email: body?.email,
          }),
          [AuthErrorCode.LOGIN_RATE_LIMITED]: () => {
            const seconds = Number(body?.retryAfterSeconds)
            const minutes = seconds > 0 ? Math.ceil(seconds / 60) : undefined
            showToast({
              type: 'error',
              title: 'Terlalu Banyak Percobaan',
              message: minutes
                ? `Terlalu banyak percobaan masuk dalam waktu yang singkat. Silakan coba masuk lagi setelah ${minutes} menit.`
                : 'Terlalu banyak percobaan masuk dalam waktu yang singkat. Silakan coba masuk lagi dalam beberapa saat.',
            })
            return { success: false }
          },
        },
        status: {
          401: () => {
            showToast({
              type: 'error',
              title: 'Gagal Masuk',
              message:
                'Salah satu data email, nomor telepon, atau kata sandi yang Anda masukkan salah. Silakan periksa kembali dan coba lagi.',
            })
            return { success: false }
          },
        },
      }) ?? { success: false }
    )
  }
}
