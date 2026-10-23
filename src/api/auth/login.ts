import { withSessionLock } from '@/libs/session'

import axiosInstance from '../axiosInstance'

export const login = async (payload: { email: string; password: string }) => {
  const result = await withSessionLock(() =>
    axiosInstance.post('/livechat/login', payload, { withCredentials: true })
  )

  if (result.status === 201) {
    return result.data
  }

  return result
}
