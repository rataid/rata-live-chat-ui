import { ApiResponse } from '@/model/shared/query'
import { RequestOtpPayload, VerifyOtpPayload } from '@/model/user'

import axiosInstance from '../axiosInstance'

export const requestOtp = async (payload: RequestOtpPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    '/livechat/otp/request',
    payload
  )

  return res.data
}

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    '/livechat/otp/verify',
    payload
  )

  return res.data
}
