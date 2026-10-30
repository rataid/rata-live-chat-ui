import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { InstallHomeScreen } from '@/features/home/components/install-home-screen'
import { showToast } from '@nui/ui/toast'

import {
  dismissIosInstallPrompt,
  dismissNotificationPrompt,
  isNotificationMuted,
  isNotificationPromptDismissed,
  notifyNotificationPromptSettled,
  readNotificationPermission,
  recordNotificationChoice,
  setLivechatNotifications,
  useNotificationMuted,
} from '../notification-preference'
import {
  ChatNotifyMenu,
  ChatNotifyMenuAction,
  ChatNotifyMenuBody,
  ChatNotifyMenuTitle,
  NotificationPromptActions,
  NotificationPromptBody,
  NotificationPromptCard,
  NotificationPromptEnable,
  NotificationPromptLater,
  NotificationPromptNote,
  NotificationPromptPosition,
  NotificationPromptTitle,
} from './chat.style'

type PromptMode = 'hidden' | 'enable' | 'ios-install' | 'settings'
type PromptVariant = 'default' | 'home'

function promptMode(pageOnly: boolean): PromptMode {
  const permission = readNotificationPermission()
  if (permission === 'granted' && !isNotificationMuted()) return 'hidden'
  if (isNotificationPromptDismissed(pageOnly)) return 'hidden'
  return permission === 'denied' || permission === 'unavailable'
    ? 'settings'
    : 'enable'
}

export function NotificationPrompt({
  open,
  onClose,
  pageOnly = false,
  desktopCorner = false,
  variant = 'default',
}: {
  open?: boolean
  onClose?: () => void
  pageOnly?: boolean
  desktopCorner?: boolean
  variant?: PromptVariant
} = {}) {
  const [mode, setMode] = useState<PromptMode>('hidden')
  const [permission, setPermission] = useState(readNotificationPermission)
  const [pending, setPending] = useState(false)

  const { muted } = useNotificationMuted()
  const cardRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  const bellMenu = open === true

  const close = () => {
    setMode('hidden')
    closeRef.current?.()
    notifyNotificationPromptSettled()
  }

  useEffect(() => {
    setPermission(readNotificationPermission())
    if (open === false) {
      setMode('hidden')
      return
    }
    if (open === true) {
      setMode('settings')
      return
    }
    const next = promptMode(pageOnly)
    setMode(next)
    // Let the home install sheet open when this page does not need a prompt.
    if (next === 'hidden') notifyNotificationPromptSettled()
  }, [open, pageOnly, muted])

  useEffect(() => {
    if (mode === 'hidden') return
    const previous = document.activeElement as HTMLElement | null
    const card = (bellMenu ? menuRef.current : cardRef.current) as HTMLElement | null
    card?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        if (bellMenu) close()
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
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!bellMenu) return
      const target = event.target as Node | null
      const root = menuRef.current?.parentElement
      // Ignore clicks on the bell button or the menu itself.
      if (root && target && root.contains(target)) return
      close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      previous?.focus()
    }
  }, [open, mode, bellMenu])

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
    if (!open) {
      if (!pageOnly) recordNotificationChoice()
      if (mode === 'ios-install') dismissIosInstallPrompt()
      else dismissNotificationPrompt()
    }
    close()
  }

  const iosInstall = mode === 'ios-install'
  const homeCopy = variant === 'home'

  if (iosInstall) {
    return <InstallHomeScreen forceOpen onDismiss={later} />
  }

  // Bell button: compact menu under the icon (not a centered overlay).
  if (bellMenu) {
    return (
      <ChatNotifyMenu
        ref={menuRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="livechat-notification-prompt-title"
        aria-describedby="livechat-notification-prompt-description"
      >
        <ChatNotifyMenuTitle id="livechat-notification-prompt-title">
          Notifikasi
        </ChatNotifyMenuTitle>
        <ChatNotifyMenuBody id="livechat-notification-prompt-description">
          {permission === 'denied'
            ? 'Notifikasi diblokir oleh browser. Izinkan notifikasi melalui pengaturan situs di browser, lalu coba lagi.'
            : permission === 'unavailable'
            ? 'Browser ini belum mendukung notifikasi. Silakan gunakan browser yang mendukung notifikasi.'
            : notificationsOn
            ? 'Notifikasi akan dikirimkan setiap kali ada balasan, meskipun Anda sedang mengakses halaman lain'
            : 'Aktifkan notifikasi supaya Anda tahu saat ada balasan, meskipun tab ini sedang tidak dibuka.'}
        </ChatNotifyMenuBody>
        {canToggle ? (
          <ChatNotifyMenuAction
            type="button"
            disabled={pending}
            onClick={enable}
          >
            {notificationsOn ? 'Matikan' : 'Aktifkan'}
          </ChatNotifyMenuAction>
        ) : (
          <ChatNotifyMenuAction type="button" onClick={later}>
            Tutup
          </ChatNotifyMenuAction>
        )}
      </ChatNotifyMenu>
    )
  }

  return createPortal(
    <NotificationPromptPosition $desktopCorner={desktopCorner}>
      <NotificationPromptCard
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="livechat-notification-prompt-title"
        aria-describedby="livechat-notification-prompt-description"
      >
        <NotificationPromptTitle id="livechat-notification-prompt-title">
          {homeCopy
            ? 'Jangan lewatkan balasan kami!'
            : 'Jangan lewatkan informasi terbaru!'}
        </NotificationPromptTitle>
        <NotificationPromptBody id="livechat-notification-prompt-description">
          {permission === 'denied'
            ? 'Notifikasi diblokir oleh browser. Izinkan notifikasi melalui pengaturan situs di browser, lalu coba lagi.'
            : permission === 'unavailable'
            ? 'Browser ini belum mendukung notifikasi. Silakan gunakan browser yang mendukung notifikasi.'
            : homeCopy
            ? 'Aktifkan notifikasi agar Anda tahu setiap ada balasan dari kami, meskipun Anda sedang mengakses halaman lain.'
            : notificationsOn
            ? 'Notifikasi akan dikirimkan setiap kali ada balasan, meskipun Anda sedang mengakses halaman lain'
            : mode === 'settings'
            ? 'Aktifkan notifikasi supaya Anda tahu saat ada balasan, meskipun tab ini sedang tidak dibuka.'
            : 'Notifikasi akan dikirimkan setiap kali ada balasan, meskipun Anda sedang mengakses halaman lain'}
        </NotificationPromptBody>
        <NotificationPromptActions>
          {!canToggle ? null : (
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
              {mode === 'settings' ? 'Tutup' : 'Mungkin nanti'}
            </NotificationPromptLater>
          ) : null}
        </NotificationPromptActions>
        {mode === 'settings' || homeCopy ? null : (
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
