import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const REGISTER_ENDPOINT = '/livechat/register'

export type RegisterPayload = {
  name: string
  email: string
  phone: string
  password: string
}

// @todo: type the response data once the backend response shape is final
export const register = async (payload: RegisterPayload) => {
  const res = await axiosInstance.post<ApiResponse>(REGISTER_ENDPOINT, payload)

  return res.data
}
