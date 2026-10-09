import { useQuery } from '@tanstack/react-query'

import { WearToday } from '@/model/aligner'

import axiosInstance from '../axiosInstance'

export const wearTodayKey = ['aligner', 'wear', 'today']

function toWearToday(body: unknown): WearToday {
  if (body && typeof body === 'object' && 'data' in body) {
    return (body as { data: WearToday }).data
  }

  return body as WearToday
}

export const getWearToday = async () => {
  const res = await axiosInstance.get('/livechat/aligner/wear/today')

  return toWearToday(res.data)
}

export const startWearTimer = async () => {
  const res = await axiosInstance.post('/livechat/aligner/wear/start')

  return toWearToday(res.data)
}

export const stopWearTimer = async () => {
  const res = await axiosInstance.post('/livechat/aligner/wear/stop')

  return toWearToday(res.data)
}

export const useWearToday = () =>
  useQuery({
    queryKey: wearTodayKey,
    queryFn: getWearToday,
    refetchOnWindowFocus: false,
  })
