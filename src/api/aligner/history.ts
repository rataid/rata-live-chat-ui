import { useQuery } from '@tanstack/react-query'

import axiosInstance from '../axiosInstance'

export const ALIGNER_HISTORY_ENDPOINT = '/livechat/aligner/history'

export const alignerHistoryKey = ['aligner', 'history']

export type AlignerHistoryItem = {
  setNumber: number
  // YYYY-MM-DD
  changedOn: string
}

export const getAlignerHistory = async (
  limit?: number
): Promise<AlignerHistoryItem[]> => {
  const res = await axiosInstance.get<{ items?: AlignerHistoryItem[] }>(
    ALIGNER_HISTORY_ENDPOINT,
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
