import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const resendVerificationEmail = async (email: string) => {
  const res = await axiosInstance.post<ApiResponse>('/livechat/email/resend', {
    email,
  })

  return res.data
}
