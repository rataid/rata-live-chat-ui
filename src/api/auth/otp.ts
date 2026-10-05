import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

// Relative to VITE_API_ENDPOINT (e.g. http://localhost:5000/api)
export const OTP_REQUEST_ENDPOINT = '/livechat/otp/request'
export const OTP_VERIFY_ENDPOINT = '/livechat/otp/verify'

export type OtpChannel = 'WA'

export type OtpPurpose = 'REGISTER'

export type RequestOtpPayload = {
  // International format with a leading +, e.g. +6281234567890
  target: string
  channel: OtpChannel
  purpose: OtpPurpose
}

export const requestOtp = async (payload: RequestOtpPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    OTP_REQUEST_ENDPOINT,
    payload
  )

  return res.data
}

export type VerifyOtpPayload = RequestOtpPayload & {
  // 6 digit code the user received
  code: string
}

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    OTP_VERIFY_ENDPOINT,
    payload
  )

  return res.data
}
