import axios from 'axios'

import { getToken } from '@/components/auth'
import { ApiResponse } from '@/model/shared/query'

const apiUrl = import.meta.env.VITE_API_ENDPOINT

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Optional: interceptors (for request/response handling)
axiosInstance.interceptors.request.use(
  (config) => {
    // you can add auth tokens dynamically here
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message)
    return Promise.reject(error)
  }
)

export default axiosInstance
