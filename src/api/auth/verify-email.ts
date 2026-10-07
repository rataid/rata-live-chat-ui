import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const VERIFY_EMAIL_ENDPOINT = '/livechat/email/verify'

export const verifyEmail = async (token: string) => {
  const res = await axiosInstance.post<ApiResponse>(VERIFY_EMAIL_ENDPOINT, {
    token,
  })

  return res.data
}
