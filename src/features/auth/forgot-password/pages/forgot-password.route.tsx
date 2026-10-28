import { isAxiosError } from 'axios'
import { ActionFunctionArgs } from 'react-router-dom'

import { forgotPassword } from '@/api/auth/password'
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
    return { success: false, message: 'Masukkan alamat email yang valid.' }
  }

  try {
    await forgotPassword(data.data.email)
  } catch (error) {
    const body = isAxiosError(error) ? error.response?.data : undefined

    if (body?.code === EMAIL_NOT_REGISTERED) {
      // Unknown emails leave the form unchanged, per the reset-password flow.
      return { success: false }
    }

    const message =
      isAxiosError(error) && error.response?.status === 429
        ? 'Terlalu banyak permintaan. Tunggu minimal 1 menit sebelum mencoba lagi. Maksimal 5 permintaan dalam 1 jam.'
        : 'Email belum dapat dikirim. Periksa koneksi Anda dan coba beberapa saat lagi.'
    showToast({ type: 'error', title: 'Gagal Mengirim Email', message })

    return { success: false, message }
  }

  return { success: true, email: data.data.email.trim().toLowerCase() }
}
