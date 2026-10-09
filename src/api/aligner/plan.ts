import { useQuery } from '@tanstack/react-query'

import { AlignerPlan, SaveAlignerPlanPayload } from '@/model/aligner'

import axiosInstance from '../axiosInstance'

export const alignerPlanKey = ['aligner', 'plan']

function toAlignerPlan(body: unknown): AlignerPlan | null {
  if (body && typeof body === 'object' && 'data' in body) {
    return ((body as { data: unknown }).data as AlignerPlan | null) ?? null
  }

  return (body as AlignerPlan | null) ?? null
}

export const getAlignerPlan = async (): Promise<AlignerPlan | null> => {
  const res = await axiosInstance.get('/livechat/aligner/plan')

  return toAlignerPlan(res.data)
}

export const saveAlignerPlan = async (
  payload: SaveAlignerPlanPayload
): Promise<AlignerPlan | null> => {
  const res = await axiosInstance.put('/livechat/aligner/plan', payload)

  return toAlignerPlan(res.data)
}

export const changeToNextAlignerSet = async (): Promise<AlignerPlan | null> => {
  const res = await axiosInstance.post('/livechat/aligner/plan/next-set')

  return toAlignerPlan(res.data)
}

export const useAlignerPlan = () =>
  useQuery({
    queryKey: alignerPlanKey,
    queryFn: getAlignerPlan,
    refetchOnWindowFocus: false,
  })
