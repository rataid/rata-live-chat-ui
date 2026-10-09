import { ApiResponse } from '@/model/shared/query'
import { RegisterPayload } from '@/model/user'

import axiosInstance from '../axiosInstance'

export const register = async (payload: RegisterPayload) => {
  const res = await axiosInstance.post<ApiResponse>(
    '/livechat/register',
    payload
  )

  return res.data
}
