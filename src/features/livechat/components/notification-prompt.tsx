import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  dismissIosInstallPrompt,
  dismissNotificationPrompt,
  isHomeScreenApp,
  isIosDevice,
  isIosInstallDismissed,
  isNotificationPromptDismissed,
  readNotificationPermission,
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

function canAskForNotificationPermission() {
  return (
    readNotificationPermission() === 'default' &&
    !isNotificationPromptDismissed()
  )
}

function promptMode(): PromptMode {
  const installed = isHomeScreenApp()

  if (isIosDevice() && !installed) {
    return isIosInstallDismissed() ? 'hidden' : 'ios-install'
  }

  // iOS only exposes Notification inside a Home Screen app whose manifest
  // it accepted. Keep the Enable card up until permission is granted.
  if (isIosDevice() && installed) {
    return readNotificationPermission() === 'granted' ? 'hidden' : 'enable'
  }

  return canAskForNotificationPermission() ? 'enable' : 'hidden'
}

export function NotificationPrompt({
  open,
  onClose,
}: {
  open?: boolean
  onClose?: () => void
} = {}) {
  const [mode, setMode] = useState<PromptMode>('hidden')

  const { muted } = useNotificationMuted()
  const cardRef = useRef<HTMLElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  const close = () => {
    setMode('hidden')
    closeRef.current?.()
  }

  useEffect(() => {
    setMode(
      open === false
        ? 'hidden'
        : open === true
        ? isIosDevice() && !isHomeScreenApp()
          ? 'ios-install'
          : 'settings'
        : promptMode()
    )
  }, [open])

  useEffect(() => {
    if (!open || mode === 'hidden') return
    const previous = document.activeElement as HTMLElement | null
    const card = cardRef.current
    card?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMode('hidden')
        closeRef.current?.()
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

  const permission = readNotificationPermission()
  const notificationsOn = permission === 'granted' && !muted
  const canToggle = permission === 'default' || permission === 'granted'

  const enable = () => {
    void setLivechatNotifications(!notificationsOn).then(close).catch(close)
  }

  const later = () => {
    if (!open) {
      if (mode === 'ios-install') dismissIosInstallPrompt()
      else dismissNotificationPrompt()
    }
    close()
  }

  const iosInstall = mode === 'ios-install'

  return createPortal(
    <NotificationPromptPosition
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
        aria-modal={open ? true : undefined}
        aria-labelledby="livechat-notification-prompt-title"
      >
        <NotificationPromptTitle id="livechat-notification-prompt-title">
          {iosInstall
            ? 'Tambahkan ke Layar Utama'
            : notificationsOn
            ? 'Notifikasi chat aktif'
            : 'Jangan lewatkan informasi terbaru!'}
        </NotificationPromptTitle>
        <NotificationPromptBody>
          {iosInstall
            ? 'Untuk menerima notifikasi di iPhone, tambahkan portal ini ke Layar Utama lalu buka melalui ikonnya.'
            : permission === 'denied'
            ? 'Notifikasi diblokir oleh browser. Izinkan notifikasi melalui pengaturan situs di browser, lalu coba lagi.'
            : permission === 'unavailable'
            ? 'Browser ini belum mendukung notifikasi. Silakan gunakan browser yang mendukung notifikasi.'
            : notificationsOn
            ? 'Anda akan menerima notifikasi saat ada balasan chat, meskipun sedang membuka tab lain.'
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
            <NotificationPromptEnable type="button" onClick={enable}>
              {notificationsOn
                ? 'Nonaktifkan notifikasi'
                : 'Aktifkan notifikasi'}
            </NotificationPromptEnable>
          )}
          <NotificationPromptLater type="button" onClick={later}>
            Mungkin nanti
          </NotificationPromptLater>
        </NotificationPromptActions>
        {iosInstall ? null : (
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
