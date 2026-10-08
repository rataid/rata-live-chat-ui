import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const FORGOT_PASSWORD_ENDPOINT = '/livechat/password/forgot'
export const CHECK_RESET_PASSWORD_ENDPOINT = '/livechat/password/reset/check'
export const RESET_PASSWORD_ENDPOINT = '/livechat/password/reset'

export const forgotPassword = async (email: string) => {
  const res = await axiosInstance.post<ApiResponse>(FORGOT_PASSWORD_ENDPOINT, {
    email,
  })

  return res.data
}

export const checkResetPasswordToken = async (token: string) => {
  const res = await axiosInstance.post<ApiResponse>(
    CHECK_RESET_PASSWORD_ENDPOINT,
    { token }
  )

  return res.data
}

export type ResetPasswordPayload = {
  token: string
  password: string
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    RESET_PASSWORD_ENDPOINT,
    payload
  )

  return res.data
}
