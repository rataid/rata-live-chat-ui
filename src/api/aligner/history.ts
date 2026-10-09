import { useQuery } from '@tanstack/react-query'

import { AlignerHistoryItem } from '@/model/aligner'

import axiosInstance from '../axiosInstance'

export const alignerHistoryKey = ['aligner', 'history']

export const getAlignerHistory = async (
  limit?: number
): Promise<AlignerHistoryItem[]> => {
  const res = await axiosInstance.get<{ items?: AlignerHistoryItem[] }>(
    '/livechat/aligner/history',
    { params: { limit } }
  )

  return res.data?.items ?? []
}

export const useAlignerHistory = (enabled: boolean, limit?: number) =>
  useQuery({
    queryKey: [...alignerHistoryKey, { limit }],
    queryFn: () => getAlignerHistory(limit),
    enabled,
    refetchOnWindowFocus: false,
  })
