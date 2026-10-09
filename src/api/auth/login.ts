import axiosInstance from '../axiosInstance'

export const login = async (payload: { email: string; password: string }) => {
  const result = await axiosInstance.post('/livechat/login', payload, {
    withCredentials: false,
  })

  if (result.status === 201) {
    return result.data
  }

  return result
}
