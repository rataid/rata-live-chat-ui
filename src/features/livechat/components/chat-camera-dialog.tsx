import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'

import Icon from '@nui/ui/icon'
import { showToast } from '@nui/ui/toast'

import {
  ChatCameraButton,
  ChatCameraClose,
  ChatCameraFooter,
  ChatCameraHeader,
  ChatCameraOverlay,
  ChatCameraDialog as ChatCameraPanel,
  ChatCameraPreview,
  ChatCameraRetake,
  ChatCameraTitle,
} from './chat.style'

type ChatCameraDialogProps = {
  open: boolean
  uploading?: boolean
  onOpenChange: (open: boolean) => void
  onCapture: (file: File) => void
}

function dataUrlToFile(dataUrl: string, filename: string) {
  const [header, data] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg'
  const binary = atob(data)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new File([bytes], filename, { type: mime })
}

export function ChatCameraDialog({
  open,
  uploading = false,
  onOpenChange,
  onCapture,
}: ChatCameraDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [facing, setFacing] = useState<'user' | 'environment'>(() =>
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      ? 'environment'
      : 'user'
  )
  const [canSwitch, setCanSwitch] = useState(false)
  const [ready, setReady] = useState(false)
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  useEffect(() => {
    if (!open) {
      setImageSrc(null)
      return
    }

    let cancelled = false
    let currentStream: MediaStream | null = null
    setReady(false)
    setImageSrc(null)

    if (!navigator.mediaDevices?.getUserMedia) {
      showToast({
        type: 'error',
        title: 'Kamera tidak tersedia',
        message:
          'Buka melalui HTTPS dan gunakan browser yang mendukung kamera.',
      })
      onOpenChangeRef.current(false)
      return
    }

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        currentStream = stream
        streamRef.current = stream
        void navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            if (!cancelled)
              setCanSwitch(
                devices.filter((device) => device.kind === 'videoinput')
                  .length > 1
              )
          })
          .catch(() => undefined)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          void videoRef.current
            .play()
            .then(() => {
              if (!cancelled) setReady(true)
            })
            .catch(() => undefined)
        }
      })
      .catch(() => {
        if (cancelled) return
        showToast({
          type: 'error',
          title: 'Kamera tidak tersedia',
          message:
            'Izinkan akses kamera melalui pengaturan browser, lalu coba lagi.',
        })
        onOpenChangeRef.current(false)
      })

    return () => {
      cancelled = true
      currentStream?.getTracks().forEach((track) => track.stop())
      if (streamRef.current === currentStream) streamRef.current = null
    }
  }, [open, facing])

  const capture = () => {
    const video = videoRef.current
    if (!ready || !video?.videoWidth) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)
    setImageSrc(canvas.toDataURL('image/jpeg', 0.92))
    video.pause()
  }

  const retake = () => {
    setImageSrc(null)
    void videoRef.current?.play()
  }

  const confirm = () => {
    if (!imageSrc || uploading) return
    onCapture(dataUrlToFile(imageSrc, 'take-photo.jpg'))
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <ChatCameraOverlay />
        </Dialog.Overlay>
        <Dialog.Content
          asChild
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <ChatCameraPanel>
            <ChatCameraHeader>
              <Dialog.Title asChild>
                <ChatCameraTitle>Ambil Foto</ChatCameraTitle>
              </Dialog.Title>
              <Dialog.Close asChild>
                <ChatCameraClose type="button" aria-label="Tutup kamera">
                  <Icon icon="lucide-x" size="sm" />
                </ChatCameraClose>
              </Dialog.Close>
            </ChatCameraHeader>
            <Dialog.Description className="hidden">
              Ambil foto untuk dikirim melalui chat.
            </Dialog.Description>
            <ChatCameraPreview>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={
                  imageSrc
                    ? 'hidden'
                    : 'h-full min-h-0 w-full object-contain sm:max-h-[420px]'
                }
              />
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Captured photo"
                  className="h-full min-h-0 w-full object-contain sm:max-h-[420px]"
                />
              )}
            </ChatCameraPreview>
            <ChatCameraFooter>
              {imageSrc ? (
                <>
                  <ChatCameraRetake
                    type="button"
                    aria-label="Ambil ulang foto"
                    disabled={uploading}
                    onClick={retake}
                  >
                    <Icon icon="lucide-camera" size="sm" />
                  </ChatCameraRetake>
                  <ChatCameraButton
                    type="button"
                    aria-label="Kirim foto"
                    disabled={uploading}
                    onClick={confirm}
                  >
                    <Icon icon="lucide-check" size="sm" />
                  </ChatCameraButton>
                </>
              ) : (
                <>
                  {canSwitch && (
                    <ChatCameraRetake
                      type="button"
                      aria-label="Ganti kamera depan atau belakang"
                      disabled={!ready || uploading}
                      onClick={() =>
                        setFacing((value) =>
                          value === 'user' ? 'environment' : 'user'
                        )
                      }
                    >
                      <Icon icon="lucide-switch-camera" size="sm" />
                    </ChatCameraRetake>
                  )}
                  <ChatCameraButton
                    type="button"
                    aria-label="Ambil foto"
                    disabled={!ready || uploading}
                    onClick={capture}
                  >
                    <Icon icon="lucide-camera" size="sm" />
                  </ChatCameraButton>
                </>
              )}
            </ChatCameraFooter>
          </ChatCameraPanel>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
