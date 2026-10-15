import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import Icon from '@nui/ui/icon'
import { showToast } from '@nui/ui/toast'

import {
  ChatCameraButton,
  ChatCameraClose,
  ChatCameraDialog as ChatCameraPanel,
  ChatCameraFooter,
  ChatCameraHeader,
  ChatCameraOverlay,
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

  useEffect(() => {
    if (!open) {
      setImageSrc(null)
      return
    }

    let cancelled = false

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { facingMode: 'user', width: 1280, height: 720 },
      })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          void videoRef.current.play()
        }
      })
      .catch(() => {
        showToast({
          type: 'error',
          title: 'Camera unavailable',
          message: 'Allow camera access, then try again.',
        })
        onOpenChange(false)
      })

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [open, onOpenChange])

  const capture = () => {
    const video = videoRef.current
    if (!video?.videoWidth) return

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
                <ChatCameraTitle>Take Photo</ChatCameraTitle>
              </Dialog.Title>
              <Dialog.Close asChild>
                <ChatCameraClose type="button" aria-label="Close">
                  <Icon icon="lucide-x" size="sm" />
                </ChatCameraClose>
              </Dialog.Close>
            </ChatCameraHeader>
            <Dialog.Description className="hidden">
              Take a photo to send in the chat
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
                    : 'max-h-[420px] w-full object-contain'
                }
              />
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Captured photo"
                  className="max-h-[420px] w-full object-contain"
                />
              )}
            </ChatCameraPreview>
            <ChatCameraFooter>
              {imageSrc ? (
                <>
                  <ChatCameraRetake
                    type="button"
                    aria-label="Retake photo"
                    disabled={uploading}
                    onClick={retake}
                  >
                    <Icon icon="lucide-camera" size="sm" />
                  </ChatCameraRetake>
                  <ChatCameraButton
                    type="button"
                    aria-label="Use photo"
                    disabled={uploading}
                    onClick={confirm}
                  >
                    <Icon icon="lucide-check" size="sm" />
                  </ChatCameraButton>
                </>
              ) : (
                <ChatCameraButton
                  type="button"
                  aria-label="Take photo"
                  onClick={capture}
                >
                  <Icon icon="lucide-camera" size="sm" />
                </ChatCameraButton>
              )}
            </ChatCameraFooter>
          </ChatCameraPanel>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
