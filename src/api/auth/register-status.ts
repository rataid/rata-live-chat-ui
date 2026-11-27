import { ApiResponse } from '@/model/shared/query'
import { RegisterStatusResponse } from '@/model/user'

import axiosInstance from '../axiosInstance'

// Read-only: sends no email or OTP, safe to call again
export const getRegisterStatus = async (email: string) => {
  const res = await axiosInstance.post<ApiResponse<RegisterStatusResponse>>(
    '/livechat/register/status',
    { email }
  )

  return res.data?.data
}
