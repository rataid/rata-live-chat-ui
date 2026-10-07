import { useQuery } from '@tanstack/react-query'

import axiosInstance from '../axiosInstance'

export const ALIGNER_PLAN_ENDPOINT = '/livechat/aligner/plan'
export const ALIGNER_NEXT_SET_ENDPOINT = '/livechat/aligner/plan/next-set'

export const alignerPlanKey = ['aligner', 'plan']

export type AlignerPlan = {
  id: string
  currentSet: number
  totalSets: number
  durationDays: number
  // yyyy-MM-dd
  startedOn: string
  changeDueOn: string
  // 1-based day within the current set
  dayIndex: number
  daysLeft: number
  completionPercent: number
}

function toAlignerPlan(body: unknown): AlignerPlan | null {
  if (body && typeof body === 'object' && 'data' in body) {
    return ((body as { data: unknown }).data as AlignerPlan | null) ?? null
  }

  return (body as AlignerPlan | null) ?? null
}

export const getAlignerPlan = async (): Promise<AlignerPlan | null> => {
  const res = await axiosInstance.get(ALIGNER_PLAN_ENDPOINT)

  return toAlignerPlan(res.data)
}

export type SaveAlignerPlanPayload = {
  currentSet: number
  totalSets: number
  durationDays: number
  // YYYY-MM-DD
  startedOn: string
}

export const saveAlignerPlan = async (
  payload: SaveAlignerPlanPayload
): Promise<AlignerPlan | null> => {
  const res = await axiosInstance.put(ALIGNER_PLAN_ENDPOINT, payload)

  return toAlignerPlan(res.data)
}

export const changeToNextAlignerSet = async (): Promise<AlignerPlan | null> => {
  const res = await axiosInstance.post(ALIGNER_NEXT_SET_ENDPOINT)

  return toAlignerPlan(res.data)
}

export const useAlignerPlan = () =>
  useQuery({
    queryKey: alignerPlanKey,
    queryFn: getAlignerPlan,
    refetchOnWindowFocus: false,
  })
