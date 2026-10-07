import { useQuery } from '@tanstack/react-query'

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

export const getMe = async () => {
  const result = await axiosInstance.get('/v1/public/auth/profile', {
    params: {
      app_name: 'procurement',
    },
  })

  if (result.status === 200) {
    return result.data
  }

  return result
}

export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
    refetchOnWindowFocus: false, // avoid refetch every time you focus tab
  })
}
