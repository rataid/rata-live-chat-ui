import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'

import Icon from '@nui/ui/icon'

import {
  ChatImageViewerButton,
  ChatImageViewerCounter,
  ChatImageViewerImage,
  ChatImageViewerIndicator,
  ChatImageViewerIndicators,
  ChatImageViewerOverlay,
  ChatImageViewerPanel,
  ChatImageViewerSlide,
  ChatImageViewerTrack,
} from './chat.style'

export type ChatImage = { id: string; src: string; alt: string }

type ChatImageViewerProps = {
  images: ChatImage[]
  // Image to open on, null when closed
  startIndex: number | null
  onClose: () => void
}

export function ChatImageViewer({
  images,
  startIndex,
  onClose,
}: ChatImageViewerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const open = startIndex !== null

  const goTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior })
  }

  // Jump to the clicked image without animating
  useEffect(() => {
    if (startIndex === null) return
    setCurrent(startIndex)
    requestAnimationFrame(() => goTo(startIndex, 'auto'))
  }, [startIndex])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    setCurrent(Math.round(track.scrollLeft / track.clientWidth))
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') goTo(current - 1)
    if (event.key === 'ArrowRight') goTo(current + 1)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <ChatImageViewerOverlay />
        </Dialog.Overlay>
        <Dialog.Content
          asChild
          onKeyDown={handleKeyDown}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <ChatImageViewerPanel>
            <Dialog.Title asChild>
              <ChatImageViewerCounter>
                {current + 1}/{images.length}
              </ChatImageViewerCounter>
            </Dialog.Title>
            <Dialog.Description className="hidden">
              Geser untuk melihat gambar lainnya
            </Dialog.Description>
            <Dialog.Close asChild>
              <ChatImageViewerButton
                type="button"
                $position="close"
                aria-label="Tutup"
              >
                <Icon icon="lucide-x" size="md" />
              </ChatImageViewerButton>
            </Dialog.Close>

            <ChatImageViewerButton
              type="button"
              $position="prev"
              aria-label="Gambar sebelumnya"
              disabled={current === 0}
              onClick={() => goTo(current - 1)}
            >
              <Icon icon="lucide-chevron-left" size="md" />
            </ChatImageViewerButton>

            {/* Clicking the empty area around an image closes the viewer */}
            <ChatImageViewerTrack
              ref={trackRef}
              onScroll={handleScroll}
              onClick={onClose}
            >
              {images.map((image) => (
                <ChatImageViewerSlide key={image.id}>
                  <ChatImageViewerImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onClick={(event) => event.stopPropagation()}
                  />
                </ChatImageViewerSlide>
              ))}
            </ChatImageViewerTrack>

            <ChatImageViewerButton
              type="button"
              $position="next"
              aria-label="Gambar berikutnya"
              disabled={current === images.length - 1}
              onClick={() => goTo(current + 1)}
            >
              <Icon icon="lucide-chevron-right" size="md" />
            </ChatImageViewerButton>

            {images.length > 1 && (
              <ChatImageViewerIndicators>
                {images.map((image, index) => (
                  <ChatImageViewerIndicator
                    key={image.id}
                    type="button"
                    $active={index === current}
                    aria-label={`Gambar ${index + 1}`}
                    onClick={() => goTo(index)}
                  >
                    ⬤
                  </ChatImageViewerIndicator>
                ))}
              </ChatImageViewerIndicators>
            )}
          </ChatImageViewerPanel>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
