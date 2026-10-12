import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const verifyEmail = async (token: string) => {
  const res = await axiosInstance.post<ApiResponse>('/livechat/email/verify', {
    token,
  })

  return res.data
}
