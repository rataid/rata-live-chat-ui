import { useQuery } from '@tanstack/react-query'

import axiosInstance from '../axiosInstance'

// Relative to VITE_API_ENDPOINT (e.g. http://localhost:5000/api)
export const ALIGNER_HISTORY_ENDPOINT = '/livechat/aligner/history'

export const alignerHistoryKey = ['aligner', 'history']

export type AlignerHistoryItem = {
  setNumber: number
  // YYYY-MM-DD
  changedOn: string
}

export const getAlignerHistory = async (): Promise<AlignerHistoryItem[]> => {
  const res = await axiosInstance.get<{ items?: AlignerHistoryItem[] }>(
    ALIGNER_HISTORY_ENDPOINT
  )

  return res.data?.items ?? []
}

export const useAlignerHistory = (enabled: boolean) =>
  useQuery({
    queryKey: alignerHistoryKey,
    queryFn: getAlignerHistory,
    enabled,
    refetchOnWindowFocus: false,
  })
