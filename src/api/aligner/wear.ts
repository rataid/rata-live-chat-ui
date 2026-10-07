import { useQuery } from '@tanstack/react-query'

import axiosInstance from '../axiosInstance'

export const WEAR_TODAY_ENDPOINT = '/livechat/aligner/wear/today'
export const WEAR_START_ENDPOINT = '/livechat/aligner/wear/start'
export const WEAR_STOP_ENDPOINT = '/livechat/aligner/wear/stop'

export const wearTodayKey = ['aligner', 'wear', 'today']

export type WearToday = {
  active: boolean
  activeStartedAt: string | null
  removedSec: number
  allowanceSec: number
  remainingSec: number
  onTrack: boolean
  removalPercent: number
}

function toWearToday(body: unknown): WearToday {
  if (body && typeof body === 'object' && 'data' in body) {
    return (body as { data: WearToday }).data
  }

  return body as WearToday
}

export const getWearToday = async () => {
  const res = await axiosInstance.get(WEAR_TODAY_ENDPOINT)

  return toWearToday(res.data)
}

export const startWearTimer = async () => {
  const res = await axiosInstance.post(WEAR_START_ENDPOINT)

  return toWearToday(res.data)
}

export const stopWearTimer = async () => {
  const res = await axiosInstance.post(WEAR_STOP_ENDPOINT)

  return toWearToday(res.data)
}

export const useWearToday = () =>
  useQuery({
    queryKey: wearTodayKey,
    queryFn: getWearToday,
    refetchOnWindowFocus: false,
  })
