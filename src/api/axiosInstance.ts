import axios, { InternalAxiosRequestConfig } from 'axios'

import { getToken } from '@/components/auth'
import { refreshAccessToken } from '@/libs/session'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
axiosInstance.interceptors.request.use((config) => {
  const token = getToken()
  if (token && config.url !== '/livechat/login')
    config.headers.Authorization = `Bearer ${token}`
  return config
})
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as
      | (InternalAxiosRequestConfig & { sessionRetried?: boolean })
      | undefined
    if (
      error.response?.status === 401 &&
      config?.headers.Authorization &&
      !config.sessionRetried &&
      config.url !== '/livechat/login'
    ) {
      config.sessionRetried = true
      const accessToken = await refreshAccessToken(true)
      config.headers.Authorization = `Bearer ${accessToken}`
      return axiosInstance.request(config)
    }
    return Promise.reject(error)
  }
)
export default axiosInstance
