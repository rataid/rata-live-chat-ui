import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { registerSchema } from '@/model/user'

export type AuthRegisterActionData = {
  success: boolean
  message?: string
}

export async function authRegisterAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = registerSchema.safeParse(Object.fromEntries(formData))

  if (!data.success) {
    return { success: false, message: 'Please check your input' }
  }

  // @todo: call the register API (which sends the OTP) once the backend is ready
  const params = new URLSearchParams({ phone: data.data.phone })

  return redirect(`/register/verify-otp?${params}`)
}
