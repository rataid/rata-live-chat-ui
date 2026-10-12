import { ApiResponse } from '@/model/shared/query'
import { ResetPasswordPayload } from '@/model/user'

import axiosInstance from '../axiosInstance'

export const forgotPassword = async (email: string) => {
  const res = await axiosInstance.post<ApiResponse>(
    '/livechat/password/forgot',
    {
      email,
    }
  )

  return res.data
}

export const checkResetPasswordToken = async (token: string) => {
  const res = await axiosInstance.post<ApiResponse>(
    '/livechat/password/reset/check',
    { token }
  )

  return res.data
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    '/livechat/password/reset',
    payload
  )

  return res.data
}
