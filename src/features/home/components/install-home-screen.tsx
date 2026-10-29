import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

import { LogoSmiledental } from '@/assets'
import { PortalBrandLogo } from '@/components/portal-layout/portal-layout.style'
import {
  NOTIFICATION_PROMPT_SETTLED_EVENT,
  isHomeNotificationPromptSettled,
  isHomeScreenApp,
  isIosDevice,
} from '@/features/livechat/notification-preference'
import Icon from '@nui/ui/icon'

import { clearInstallPrompt, getInstallPrompt, isInstallReminderDue } from '../install-prompt'

const lastShownKey = (placement: 'dashboard' | 'login') =>
  `smilehub.install.lastShownAt:${placement}`
const buttonClass =
  'w-full rounded-lg bg-[#6941c6] px-4 py-3 text-sm font-medium text-white hover:bg-[#53389e] disabled:opacity-50'

export function InstallHomeScreen({
  forceOpen,
  onDismiss,
  previewAndroid = false,
  placement = 'dashboard',
}: {
  forceOpen?: boolean
  onDismiss?: () => void
  placement?: 'dashboard' | 'login'
  previewAndroid?: boolean
} = {}) {
  const [open, setOpen] = useState(previewAndroid)
  const [installing, setInstalling] = useState(false)
  const [error, setError] = useState('')
  const ios = !previewAndroid && isIosDevice()

  useEffect(() => {
    if (previewAndroid) return
    let shownThisMount = false
    const sync = () => {
      if (isHomeScreenApp()) {
        setOpen(false)
        return
      }
      const correctPage = ios
        ? placement === 'login'
        : placement === 'dashboard'
      const mobile = ios || /Android/i.test(navigator.userAgent)
      if (!correctPage || !mobile || (!ios && !getInstallPrompt())) {
        setOpen(false)
        return
      }
      // Home: wait until the post-tour notification prompt is done.
      if (placement === 'dashboard' && !isHomeNotificationPromptSettled()) {
        setOpen(false)
        return
      }
      if (shownThisMount) return
      const storageKey = lastShownKey(placement)
      let lastShown = 0
      try {
        lastShown = Number(localStorage.getItem(storageKey)) || 0
        // Migrate the old shared key so Android tests do not suppress iOS login.
        if (!lastShown && placement === 'dashboard') {
          lastShown = Number(localStorage.getItem('smilehub.install.lastShownAt')) || 0
        }
      } catch {}
      if (!isInstallReminderDue(lastShown)) return
      shownThisMount = true
      try {
        localStorage.setItem(storageKey, String(Date.now()))
      } catch {}
      setOpen(true)
    }
    sync()
    window.addEventListener('smilehub-install-ready', sync)
    window.addEventListener(NOTIFICATION_PROMPT_SETTLED_EVENT, sync)
    return () => {
      window.removeEventListener('smilehub-install-ready', sync)
      window.removeEventListener(NOTIFICATION_PROMPT_SETTLED_EVENT, sync)
    }
  }, [ios, previewAndroid, placement])

  const dismiss = () => {
    setOpen(false)
    onDismiss?.()
  }

  const install = async () => {
    if (previewAndroid) {
      dismiss()
      return
    }
    const prompt = getInstallPrompt()
    if (!prompt) return
    setInstalling(true)
    setError('')
    try {
      await prompt.prompt()
      await prompt.userChoice
      clearInstallPrompt()
      dismiss()
    } catch {
      setError(
        'Belum dapat memasang Smile Hub. Coba lagi atau gunakan menu Pasang aplikasi di browser Anda.'
      )
    } finally {
      setInstalling(false)
    }
  }

  return (
    <Dialog.Root
      open={forceOpen ?? open}
      onOpenChange={(value) => {
        if (!value) dismiss()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90dvh] max-w-md overflow-y-auto rounded-t-3xl bg-white px-6 pb-8 pt-2 shadow-xl outline-none sm:bottom-6 sm:rounded-3xl"
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
          style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-200" />
          <div className="mb-6 flex items-center gap-3">
            <PortalBrandLogo
              style={{ width: 48, height: 48, backgroundColor: '#6941c6' }}
            >
              <div className="w-1/2">
                <LogoSmiledental />
              </div>
            </PortalBrandLogo>
            <div>
              <p className="text-sm font-semibold">Smile Hub</p>
              <p className="text-sm text-gray-500">
                {window.location.hostname}
              </p>
            </div>
          </div>
          <Dialog.Title className="text-xl font-semibold leading-7 text-gray-900">
            Pasang Smile Hub di {ios ? 'iPhone' : 'HP'} Anda
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-5 text-gray-500">
            {ios
              ? 'Ikuti 3 langkah ini agar Smile Hub bisa dibuka langsung dari layar utama.'
              : 'Pantau progres aligner dan waktu lepas aligner lebih cepat, langsung dari layar utama.'}
          </Dialog.Description>
          {ios ? (
            <ol className="my-5 overflow-hidden rounded-2xl border border-gray-200 text-sm leading-5 text-gray-900">
              {[
                <>
                  Ketuk tombol <strong>Bagikan</strong> di bagian bawah Safari.
                </>,
                <>
                  Cari dan ketuk tombol{' '}
                  <strong>Tambahkan ke Layar Utama</strong>.
                </>,
                <>
                  Ketuk <strong>Tambah</strong> di kanan atas.
                </>,
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex min-h-[72px] items-center gap-3 rounded-2xl border-b border-gray-200 px-3 py-4 last:border-b-0"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    {index + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                  <span className="flex h-9 min-w-[36px] shrink-0 items-center justify-center rounded-lg bg-gray-100 px-2">
                    {index === 2 ? (
                      <span className="text-sm font-semibold text-blue-600">
                        Tambah
                      </span>
                    ) : (
                      <span
                        className={
                          index === 0 ? 'text-blue-600' : 'text-gray-900'
                        }
                      >
                        <Icon
                          icon={
                            index === 0 ? 'lucide-share' : 'lucide-square-plus'
                          }
                          size="xs"
                        />
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="my-5 space-y-4 text-sm text-gray-700">
              {[
                ['lucide-layout-grid', 'Buka sekali ketuk dari layar utama'],
                ['lucide-scan', 'Tampilan layar penuh, tanpa bilah browser'],
                ['lucide-zap', 'Ringan, tanpa unduh dari Play Store'],
              ].map(([icon, text]) => (
                <li key={icon} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Icon icon={icon} size="sm" />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}
          {error && (
            <p role="alert" className="mb-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="button"
            className={buttonClass}
            disabled={installing}
            onClick={ios ? dismiss : install}
          >
            {ios ? 'Mengerti' : installing ? 'Memasang...' : 'Pasang Smile Hub'}
          </button>
          {!ios && (
            <button
              type="button"
              onClick={dismiss}
              className="mt-3 w-full py-2 text-sm text-gray-500"
            >
              Nanti Saja
            </button>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
