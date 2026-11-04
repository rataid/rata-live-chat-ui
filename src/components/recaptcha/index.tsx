import { useEffect, useRef, useState } from 'react'

import { RECAPTCHA_SITE_KEY } from '@/constants/recaptcha'

import { RecaptchaError, RecaptchaWrapper } from './recaptcha.style'

type Grecaptcha = {
  render: (
    container: HTMLElement,
    params: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
    }
  ) => number
  reset: (widgetId: number) => void
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
    onRecaptchaLoad?: () => void
  }
}

const SITE_KEY = RECAPTCHA_SITE_KEY

const SCRIPT_URL =
  'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=id'

let scriptPromise: Promise<Grecaptcha> | undefined

// Loaded once, the first time a widget is shown
function loadRecaptcha() {
  scriptPromise ??= new Promise((resolve, reject) => {
    window.onRecaptchaLoad = () => resolve(window.grecaptcha!)

    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onerror = () => {
      scriptPromise = undefined
      script.remove()
      reject(new Error('reCAPTCHA failed to load'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

type RecaptchaProps = {
  // The token, or '' when it expires or fails
  onChange: (token: string) => void
  // Clears the checkbox when it changes (a token can be used only once)
  resetKey?: unknown
}

// reCAPTCHA v2 checkbox
export default function Recaptcha({ onChange, resetKey }: RecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<number>()
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const [failed, setFailed] = useState(!SITE_KEY)

  useEffect(() => {
    if (!SITE_KEY) return undefined

    let cancelled = false

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !containerRef.current) return
        if (widgetRef.current !== undefined) return

        widgetRef.current = grecaptcha.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => onChangeRef.current(token),
          'expired-callback': () => onChangeRef.current(''),
          'error-callback': () => onChangeRef.current(''),
        })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (widgetRef.current === undefined) return

    window.grecaptcha?.reset(widgetRef.current)
    onChangeRef.current('')
  }, [resetKey])

  if (failed) {
    return (
      <RecaptchaError>
        Verifikasi keamanan gagal dimuat. Periksa koneksi Anda lalu muat ulang
        halaman.
      </RecaptchaError>
    )
  }

  return (
    <RecaptchaWrapper>
      <div ref={containerRef} />
    </RecaptchaWrapper>
  )
}
