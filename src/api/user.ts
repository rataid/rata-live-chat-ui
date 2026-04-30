import { useQuery } from '@tanstack/react-query'

import { ApiResponse } from '@/model/shared/query'

import axiosInstance from './axiosInstance'

export const purchaseOrderKey = 'purchase-order'

export const getMe = async () => {
  const res = await axiosInstance.get<ApiResponse>(
    '/v1/private/employees/profile/me'
  )

  if (res.status !== 200) {
    throw new Error('Failed to fetch profile')
  }

  return {
    data: res.data.data,
  }
}

export const useMe = () => {
  return useQuery({
    queryKey: [getMe],
    queryFn: () => getMe(),
    retry: 1, // optional: retry once on failure
    refetchOnWindowFocus: false, // avoid refetch every time you focus tab
  })
}
