import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosInstance from '@/api/axiosInstance'
import { getToken, removeToken } from '@/components/auth/helpers'
import { showToast } from '@nui/ui/toast'

// Only real foreground interaction renews an otherwise idle session. There is
// deliberately no interval or heartbeat that keeps an unattended tab logged in.
export function SessionActivity() {
  const navigate = useNavigate()

  useEffect(() => {
    let lastActivity = 0
    let pending = false
    let disposed = false
    const expire = () => {
      if (disposed) return
      disposed = true
      showToast({
        type: 'error',
        title: 'Sesi Habis',
        message: 'Silakan kembali masuk untuk lanjut menggunakan Smile Hub.',
      })
      removeToken()
      navigate(`/login?from=${encodeURIComponent(window.location.pathname)}`, {
        replace: true,
      })
    }
    const recordActivity = () => {
      if (document.visibilityState !== 'visible' || pending) return
      const token = getToken()
      if (!token) return expire()
      if (Date.now() - lastActivity < 60_000) return
      lastActivity = Date.now()
      pending = true
      void axiosInstance
        .post('/livechat/session/activity')
        .catch((error: unknown) => {
          if (
            isAxiosError(error) &&
            error.response?.status === 401 &&
            getToken() === token
          )
            expire()
          else lastActivity = 0
        })
        .finally(() => {
          pending = false
        })
    }
    const onInteraction = (event: Event) => {
      if (event.isTrusted) recordActivity()
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible') recordActivity()
    }
    window.addEventListener('livechat-session-expired', expire)
    recordActivity()
    window.addEventListener('pointerdown', onInteraction, { passive: true })
    window.addEventListener('keydown', onInteraction)
    window.addEventListener('scroll', onInteraction, {
      passive: true,
      capture: true,
    })
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      disposed = true
      window.removeEventListener('livechat-session-expired', expire)
      window.removeEventListener('pointerdown', onInteraction)
      window.removeEventListener('keydown', onInteraction)
      window.removeEventListener('scroll', onInteraction, true)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [navigate])

  return null
}
