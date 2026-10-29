import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { InstallHomeScreen } from '@/features/home/components/install-home-screen'
import { showToast } from '@nui/ui/toast'

import {
  dismissIosInstallPrompt,
  dismissNotificationPrompt,
  isNotificationMuted,
  readNotificationPermission,
  recordNotificationChoice,
  setLivechatNotifications,
  useNotificationMuted,
} from '../notification-preference'
import {
  NotificationPromptActions,
  NotificationPromptBody,
  NotificationPromptCard,
  NotificationPromptEnable,
  NotificationPromptLater,
  NotificationPromptNote,
  NotificationPromptPosition,
  NotificationPromptSteps,
  NotificationPromptTitle,
} from './chat.style'

type PromptMode = 'hidden' | 'enable' | 'ios-install' | 'settings'

function promptMode(): PromptMode {
  const permission = readNotificationPermission()
  if (permission === 'granted' && !isNotificationMuted()) return 'hidden'
  // No dismissal persistence: ask on each visit while notifications are off.
  return permission === 'denied' || permission === 'unavailable'
    ? 'settings'
    : 'enable'
}

export function NotificationPrompt({
  open,
  onClose,
  pageOnly = false,
  desktopCorner = false,
}: {
  open?: boolean
  onClose?: () => void
  pageOnly?: boolean
  desktopCorner?: boolean
} = {}) {
  const [mode, setMode] = useState<PromptMode>('hidden')
  const [permission, setPermission] = useState(readNotificationPermission)
  const [pending, setPending] = useState(false)

  const { muted } = useNotificationMuted()
  const cardRef = useRef<HTMLElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  const close = () => {
    setMode('hidden')
    closeRef.current?.()
  }

  useEffect(() => {
    setPermission(readNotificationPermission())
    setMode(
      open === false ? 'hidden' : open === true ? 'settings' : promptMode()
    )
  }, [open, pageOnly])

  useEffect(() => {
    if (mode === 'hidden') return
    const previous = document.activeElement as HTMLElement | null
    const card = cardRef.current
    card?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
      }
      if (event.key === 'Tab') {
        const buttons = card?.querySelectorAll<HTMLButtonElement>('button')
        if (!buttons?.length) return
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (
          event.shiftKey &&
          (document.activeElement === first || document.activeElement === card)
        ) {
          event.preventDefault()
          last.focus()
        } else if (
          !event.shiftKey &&
          (document.activeElement === last || document.activeElement === card)
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [open, mode])

  if (mode === 'hidden') return null

  const notificationsOn = permission === 'granted' && !muted
  const canToggle = permission === 'default' || permission === 'granted'

  const enable = () => {
    if (pending) return
    setPending(true)
    recordNotificationChoice()
    void setLivechatNotifications(!notificationsOn)
      .then((result) => {
        setPermission(result)
        if (result === 'granted' || notificationsOn) close()
        else setMode('settings')
      })
      .catch(() => {
        setMode('settings')
        showToast({
          type: 'error',
          title: 'Notifikasi belum aktif',
          message:
            'Pendaftaran notifikasi belum berhasil. Periksa koneksi atau konfigurasi Web Push server, lalu coba lagi.',
        })
      })
      .finally(() => setPending(false))
  }

  const later = () => {
    if (!open) recordNotificationChoice()
    if (!open) {
      if (mode === 'ios-install') dismissIosInstallPrompt()
      else dismissNotificationPrompt()
    }
    close()
  }

  const iosInstall = mode === 'ios-install'

  if (iosInstall) {
    return <InstallHomeScreen forceOpen onDismiss={later} />
  }

  return createPortal(
    <NotificationPromptPosition
      $desktopCorner={desktopCorner}
      style={
        open
          ? {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
              pointerEvents: 'auto',
            }
          : undefined
      }
    >
      <NotificationPromptCard
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="livechat-notification-prompt-title"
        aria-describedby="livechat-notification-prompt-description"
      >
        <NotificationPromptTitle id="livechat-notification-prompt-title">
          {iosInstall
            ? 'Pasang Smile Hub di iPhone Anda'
            : mode === 'settings'
            ? 'Notifikasi'
            : 'Jangan lewatkan informasi terbaru!'}
        </NotificationPromptTitle>
        <NotificationPromptBody id="livechat-notification-prompt-description">
          {iosInstall
            ? 'Untuk menerima notifikasi di iPhone, tambahkan portal ini ke Layar Utama lalu buka melalui ikonnya.'
            : permission === 'denied'
            ? 'Notifikasi diblokir oleh browser. Izinkan notifikasi melalui pengaturan situs di browser, lalu coba lagi.'
            : permission === 'unavailable'
            ? 'Browser ini belum mendukung notifikasi. Silakan gunakan browser yang mendukung notifikasi.'
            : notificationsOn
            ? 'Notifikasi akan dikirimkan setiap kali ada balasan, meskipun Anda sedang mengakses halaman lain'
            : mode === 'settings'
            ? 'Aktifkan notifikasi supaya Anda tahu saat ada balasan, meskipun tab ini sedang tidak dibuka.'
            : 'Notifikasi akan dikirimkan setiap kali ada balasan, meskipun Anda sedang mengakses halaman lain'}
        </NotificationPromptBody>
        {iosInstall ? (
          <NotificationPromptSteps>
            <li>Ketuk tombol Bagikan di Safari.</li>
            <li>Pilih Tambahkan ke Layar Utama, lalu ketuk Tambah.</li>
            <li>
              Buka ikon portal di Layar Utama, lalu ketuk Aktifkan notifikasi di
              halaman login atau livechat.
            </li>
          </NotificationPromptSteps>
        ) : null}
        <NotificationPromptActions>
          {iosInstall || !canToggle ? null : (
            <NotificationPromptEnable
              type="button"
              disabled={pending}
              onClick={enable}
            >
              {notificationsOn
                ? 'Matikan'
                : mode === 'settings'
                ? 'Aktifkan'
                : 'Aktifkan notifikasi'}
            </NotificationPromptEnable>
          )}
          {mode !== 'settings' || !canToggle ? (
            <NotificationPromptLater type="button" onClick={later}>
              {iosInstall
                ? 'Mengerti'
                : mode === 'settings'
                ? 'Tutup'
                : 'Mungkin nanti'}
            </NotificationPromptLater>
          ) : null}
        </NotificationPromptActions>
        {iosInstall || mode === 'settings' ? null : (
          <NotificationPromptNote>
            Anda dapat mengubah izin ini kapan saja melalui pengaturan browser
            Anda
          </NotificationPromptNote>
        )}
      </NotificationPromptCard>
    </NotificationPromptPosition>,
    document.body
  )
}
