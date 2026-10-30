import { ApiResponse } from '@/model/shared/query'
import { ResendVerificationEmailResponse } from '@/model/user'

import axiosInstance from '../axiosInstance'

export const resendVerificationEmail = async (email: string) => {
  const res = await axiosInstance.post<
    ApiResponse<ResendVerificationEmailResponse>
  >('/livechat/email/resend', {
    email,
  })

  return res.data
}
