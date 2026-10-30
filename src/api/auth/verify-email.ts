import { ApiResponse } from '@/model/shared/query'
import { VerifyEmailResponse } from '@/model/user'

import axiosInstance from '../axiosInstance'

export const verifyEmail = async (token: string) => {
  const res = await axiosInstance.post<ApiResponse<VerifyEmailResponse>>(
    '/livechat/email/verify',
    { token }
  )

  return res.data
}
