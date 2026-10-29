import { useEffect, useState } from 'react'
import { wearDay, msUntilNextWearDay } from './wear-day'

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

export const useWearToday = () => {
  const [dayKey, setDayKey] = useState(() => wearDay())
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const sync = () => {
      setDayKey(wearDay())
      clearTimeout(timer)
      timer = setTimeout(sync, msUntilNextWearDay() + 50)
    }
    sync()
    const onVisible = () => { if (document.visibilityState === 'visible') sync() }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', sync)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', sync)
    }
  }, [])
  const query = useQuery({
    queryKey: [...wearTodayKey, dayKey],
    queryFn: getWearToday,
    refetchOnWindowFocus: true,
  })
  return { ...query, dayKey }
}
