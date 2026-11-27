import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { getRegisterStatus } from '@/api/auth/register-status'
import { showToast } from '@nui/ui/toast'

import { clearRegisterSession, getRegisterEmail } from './register-session'

/**
 * The email link (and on iOS its storage) opens in the browser, not the PWA.
 * Ask the backend where the registration is whenever the page opens or the
 * PWA is shown again, and move on from there.
 *
 * Activated → login. Email verified → `onEmailVerified` (each page decides).
 * Anything else, or an error, stays on the page and tries again next time.
 */
export function useRegisterStatus(
  onEmailVerified: (retryAfterSeconds?: number) => void
) {
  const navigate = useNavigate()

  // Latest callback without re-adding the listeners
  const onEmailVerifiedRef = useRef(onEmailVerified)
  onEmailVerifiedRef.current = onEmailVerified

  useEffect(() => {
    let active = true
    let pending = false

    const check = async () => {
      const email = getRegisterEmail()
      if (!email || pending || document.visibilityState !== 'visible') return

      pending = true
      try {
        const status = await getRegisterStatus(email)
        if (!active || !status) return

        if (status.activated) {
          clearRegisterSession()
          showToast({
            type: 'success',
            title: 'Akun Berhasil Diaktifkan!',
            message:
              'Akun Anda kini aktif. Silakan masuk menggunakan kata sandi yang telah Anda buat.',
          })
          navigate('/login', { replace: true })
          return
        }

        if (status.emailVerified) {
          onEmailVerifiedRef.current(status.retryAfterSeconds)
        }
      } catch {
        // Network/5xx (or a 400 bug): stay here, retry when shown again
      } finally {
        pending = false
      }
    }

    void check()
    document.addEventListener('visibilitychange', check)
    // iOS can restore the page from the back-forward cache without
    // visibilitychange
    window.addEventListener('pageshow', check)

    return () => {
      active = false
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('pageshow', check)
    }
  }, [navigate])
}
