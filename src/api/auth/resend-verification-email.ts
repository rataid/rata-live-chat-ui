import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const RESEND_VERIFICATION_EMAIL_ENDPOINT = '/livechat/email/resend'

export const resendVerificationEmail = async (email: string) => {
  const res = await axiosInstance.post<ApiResponse>(
    RESEND_VERIFICATION_EMAIL_ENDPOINT,
    { email }
  )

  return res.data
}
