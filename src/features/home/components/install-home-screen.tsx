import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

import { LogoSmiledental } from '@/assets'
import { PortalBrandLogo } from '@/components/portal-layout/portal-layout.style'
import { PORTAL_NAME } from '@/constants/portal'
import {
  NOTIFICATION_PROMPT_SETTLED_EVENT,
  isHomeNotificationPromptSettled,
  isHomeScreenApp,
  isIosDevice,
} from '@/features/livechat/notification-preference'

import {
  clearInstallPrompt,
  getInstallPrompt,
  isInstallReminderDue,
} from '../install-prompt'
import {
  InstallAppHost,
  InstallAppName,
  InstallButton,
  InstallDescription,
  InstallError,
  InstallHandle,
  InstallHeader,
  InstallLater,
  InstallOverlay,
  InstallSheet,
  InstallStepImage,
  InstallStepItem,
  InstallStepNumber,
  InstallStepText,
  InstallSteps,
  InstallTitle,
} from './install-home-screen.style'

const lastShownKey = (placement: 'dashboard' | 'login') =>
  `smilehub.install.lastShownAt:${placement}`

// Survives React StrictMode remounts so the sheet is not lost after tour → notif.
const openedThisSession = new Set<string>()
const dismissedThisSession = new Set<string>()

const INSTALL_IMAGE_PATH = '/assets/img/install'

const INSTALL_ERROR = `Belum dapat memasang ${PORTAL_NAME}. Coba lagi atau gunakan menu Pasang aplikasi di browser Anda.`

const INSTALL_STEPS: Record<
  'android' | 'ios',
  { text: React.ReactNode; image: string }[]
> = {
  android: [
    {
      text: (
        <>
          Klik <strong>Pasang {PORTAL_NAME}</strong>
        </>
      ),
      image: 'android-1.png',
    },
    {
      text: (
        <>
          Klik <strong>Instal</strong>
        </>
      ),
      image: 'android-2.png',
    },
    {
      text: (
        <>
          <strong>{PORTAL_NAME}</strong> langsung dapat digunakan di layar utama
          Anda
        </>
      ),
      image: 'android-3.png',
    },
  ],
  ios: [
    {
      text: (
        <>
          Klik tombol <strong>bagikan</strong> di bagian bawah Safari.
        </>
      ),
      image: 'ios-1.png',
    },
    {
      text: (
        <>
          Cari dan Klik tombol <strong>Tambahkan ke Layar Utama</strong>
        </>
      ),
      image: 'ios-2.png',
    },
    {
      text: (
        <>
          Klik <strong>Tambah</strong> di kanan atas
        </>
      ),
      image: 'ios-3.png',
    },
  ],
}

function readLastShown(placement: 'dashboard' | 'login') {
  const storageKey = lastShownKey(placement)
  try {
    let lastShown = Number(localStorage.getItem(storageKey)) || 0
    // Migrate the old shared key so Android tests do not suppress iOS login.
    if (!lastShown && placement === 'dashboard') {
      lastShown =
        Number(localStorage.getItem('smilehub.install.lastShownAt')) || 0
    }
    return lastShown
  } catch {
    return 0
  }
}

function markShown(placement: 'dashboard' | 'login') {
  const storageKey = lastShownKey(placement)
  openedThisSession.add(storageKey)
  try {
    localStorage.setItem(storageKey, String(Date.now()))
  } catch {}
}

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
  const storageKey = lastShownKey(placement)
  const [open, setOpen] = useState(
    () =>
      previewAndroid ||
      (openedThisSession.has(storageKey) &&
        !dismissedThisSession.has(storageKey))
  )
  const [installing, setInstalling] = useState(false)
  const [error, setError] = useState('')
  const ios = !previewAndroid && isIosDevice()

  useEffect(() => {
    if (previewAndroid) return
    const sync = () => {
      if (isHomeScreenApp() || dismissedThisSession.has(storageKey)) {
        setOpen(false)
        return
      }
      const correctPage = ios
        ? placement === 'login'
        : placement === 'dashboard'
      const mobile = ios || /Android/i.test(navigator.userAgent)
      if (!correctPage || !mobile) {
        setOpen(false)
        return
      }
      // Home: wait until the post-tour notification prompt is done
      // (Aktifkan / Mungkin nanti / Tutup — any choice).
      if (placement === 'dashboard' && !isHomeNotificationPromptSettled()) {
        setOpen(false)
        return
      }
      // Restore after StrictMode remount once we already decided to show.
      if (openedThisSession.has(storageKey)) {
        setOpen(true)
        return
      }
      if (!isInstallReminderDue(readLastShown(placement))) return
      // Show the sheet after notif even if beforeinstallprompt is late;
      // Pasang still uses the deferred prompt when it arrives.
      markShown(placement)
      setOpen(true)
    }
    sync()
    window.addEventListener('smilehub-install-ready', sync)
    window.addEventListener(NOTIFICATION_PROMPT_SETTLED_EVENT, sync)
    return () => {
      window.removeEventListener('smilehub-install-ready', sync)
      window.removeEventListener(NOTIFICATION_PROMPT_SETTLED_EVENT, sync)
    }
  }, [ios, previewAndroid, placement, storageKey])

  const dismiss = () => {
    dismissedThisSession.add(storageKey)
    setOpen(false)
    onDismiss?.()
  }

  const install = async () => {
    if (previewAndroid) {
      dismiss()
      return
    }
    const prompt = getInstallPrompt()
    if (!prompt) {
      setError(INSTALL_ERROR)
      return
    }
    setInstalling(true)
    setError('')
    try {
      await prompt.prompt()
      await prompt.userChoice
      clearInstallPrompt()
      dismiss()
    } catch {
      setError(INSTALL_ERROR)
    } finally {
      setInstalling(false)
    }
  }

  const steps = INSTALL_STEPS[ios ? 'ios' : 'android']

  return (
    <Dialog.Root
      open={forceOpen ?? open}
      onOpenChange={(value) => {
        if (!value) dismiss()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <InstallOverlay />
        </Dialog.Overlay>
        <Dialog.Content
          asChild
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <InstallSheet>
            <InstallHandle />
            <InstallHeader>
              <PortalBrandLogo
                style={{ width: 48, height: 48, backgroundColor: '#6941c6' }}
              >
                <div className="w-1/2">
                  <LogoSmiledental />
                </div>
              </PortalBrandLogo>
              <div>
                <InstallAppName>{PORTAL_NAME}</InstallAppName>
                <InstallAppHost>{window.location.hostname}</InstallAppHost>
              </div>
            </InstallHeader>
            <Dialog.Title asChild>
              <InstallTitle>
                Pasang {PORTAL_NAME} di {ios ? 'iPhone' : 'HP'} Anda
              </InstallTitle>
            </Dialog.Title>
            <Dialog.Description asChild>
              <InstallDescription>
                {ios
                  ? `Ikuti 3 langkah ini agar ${PORTAL_NAME} bisa dibuka langsung dari layar utama.`
                  : 'Pantau progres aligner dan waktu lepas aligner lebih cepat, langsung dari layar utama.'}
              </InstallDescription>
            </Dialog.Description>
            <InstallSteps>
              {steps.map((step, index) => (
                <InstallStepItem key={step.image}>
                  <InstallStepNumber>{index + 1}</InstallStepNumber>
                  <InstallStepText>{step.text}</InstallStepText>
                  <InstallStepImage
                    src={`${INSTALL_IMAGE_PATH}/${step.image}`}
                    alt=""
                    loading="lazy"
                  />
                </InstallStepItem>
              ))}
            </InstallSteps>
            {error && <InstallError role="alert">{error}</InstallError>}
            <InstallButton
              type="button"
              disabled={installing}
              onClick={ios ? dismiss : install}
            >
              {ios
                ? 'Mengerti'
                : installing
                ? 'Memasang...'
                : `Pasang ${PORTAL_NAME}`}
            </InstallButton>
            {!ios && (
              <InstallLater type="button" onClick={dismiss}>
                Nanti Saja
              </InstallLater>
            )}
          </InstallSheet>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
