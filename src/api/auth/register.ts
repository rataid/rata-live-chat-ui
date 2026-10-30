import { ApiResponse } from '@/model/shared/query'
import { RegisterPayload, RegisterResponse } from '@/model/user'

import axiosInstance from '../axiosInstance'

export const register = async (payload: RegisterPayload) => {
  const res = await axiosInstance.post<ApiResponse<RegisterResponse>>(
    '/livechat/register',
    payload
  )

  return res.data
}
