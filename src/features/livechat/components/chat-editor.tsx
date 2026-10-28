import * as Dialog from '@radix-ui/react-dialog'
import * as Popover from '@radix-ui/react-popover'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Icon from '@nui/ui/icon'
import { showToast } from '@nui/ui/toast'

import { ChatCameraDialog } from './chat-camera-dialog'
import {
  ChatAttachItem,
  ChatAttachMenu,
  ChatEditorBox,
  ChatEditorSend,
  ChatEditorTextarea,
  ChatEditorToolbarButton,
  ChatEditorWrapper,
} from './chat.style'

const MB = 1024 * 1024

const attachItems = [
  {
    kind: 'camera',
    icon: 'lucide-camera',
    label: 'Kamera',
    accept: 'image/jpeg,image/png,.jpg,.jpeg,.png',
  },
  {
    kind: 'photo',
    icon: 'lucide-image',
    label: 'Foto',
    accept: 'image/jpeg,image/png,.jpg,.jpeg,.png',
  },
  {
    kind: 'video',
    icon: 'lucide-video',
    label: 'Video',
    accept: 'video/mp4,video/3gpp,.mp4,.3gp',
  },
  {
    kind: 'document',
    icon: 'lucide-file-text',
    label: 'Dokumen',
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf,text/plain',
  },
] as const

function fileLimitMb(file: File) {
  if (file.type.startsWith('image/')) return 5
  if (file.type.startsWith('video/')) return 16
  return 100
}

type ChatEditorProps = {
  onSend: (text: string) => void
  onSendFile: (file: File) => Promise<void>
  disabled?: boolean
}

export function ChatEditor({
  onSend,
  onSendFile,
  disabled = false,
}: ChatEditorProps) {
  const [text, setText] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [mobile, setMobile] = useState(
    () => window.matchMedia('(max-width: 639px)').matches
  )

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const sync = () => {
      setMobile(media.matches)
      setMenuOpen(false)
    }
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [text])

  const send = () => {
    const value = text.trim()
    if (!value || disabled) return
    onSend(value)
    setText('')
  }

  const openPicker = (item: (typeof attachItems)[number]) => {
    if (disabled || uploading) return
    if (item.kind === 'camera') {
      setMenuOpen(false)
      setCameraOpen(true)
      return
    }
    const input = fileRef.current
    if (!input || disabled || uploading) return
    input.accept = item.accept
    input.removeAttribute('capture')
    setMenuOpen(false)
    input.click()
  }

  const attachmentTrigger = (
    <ChatEditorToolbarButton
      type="button"
      aria-label="Lampirkan file"
      title="Lampirkan file"
      disabled={disabled || uploading}
    >
      <Icon icon="lucide-paperclip" size="sm" />
    </ChatEditorToolbarButton>
  )

  const attachmentOptions = attachItems.map((item) => (
    <ChatAttachItem
      key={item.kind}
      type="button"
      disabled={disabled || uploading}
      onClick={() => openPicker(item)}
    >
      {mobile ? (
        <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <Icon icon={item.icon} size="lg" />
        </span>
      ) : (
        <Icon icon={item.icon} size="sm" />
      )}
      {item.label}
    </ChatAttachItem>
  ))

  return (
    <ChatEditorWrapper>
      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (!file || disabled || uploading) return

          const extension = '.' + file.name.split('.').pop()?.toLowerCase()
          const allowed = attachItems.some((item) =>
            item.accept
              .split(',')
              .some((type) =>
                type.startsWith('.') ? type === extension : type === file.type
              )
          )
          if (!allowed) {
            showToast({
              type: 'error',
              title: 'Format tidak didukung',
              message:
                'Hanya foto JPG/PNG, video MP4/3GP, dan dokumen PDF/Word/Excel/TXT yang dapat dikirim.',
            })
            return
          }

          const maxMb = fileLimitMb(file)
          if (file.size > maxMb * MB) {
            showToast({
              type: 'error',
              title: 'File too large',
              message: `Max allowed size is ${maxMb}MB.`,
            })
            return
          }

          setUploading(true)
          void onSendFile(file).finally(() => setUploading(false))
        }}
      />

      <ChatEditorBox>
        <ChatEditorTextarea
          ref={textareaRef}
          rows={1}
          value={text}
          placeholder="Tulis pesan..."
          aria-label="Tulis pesan"
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends, Shift+Enter adds a new line
            if (
              e.key === 'Enter' &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault()
              send()
            }
          }}
        />
        {mobile ? (
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>{attachmentTrigger}</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20" />
              <Dialog.Content
                className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-3 shadow-xl outline-none"
                style={{
                  paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
                }}
              >
                <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-200" />
                <Dialog.Title className="text-base font-semibold text-gray-900">
                  Lampirkan file
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-gray-500">
                  Pilih jenis lampiran yang ingin Anda kirim.
                </Dialog.Description>
                <div className="my-5 grid grid-cols-4 gap-1">
                  {attachmentOptions}
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="w-full rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700"
                  >
                    Batal
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Popover.Trigger asChild>{attachmentTrigger}</Popover.Trigger>
            <Popover.Portal>
              <Popover.Content side="top" align="end" sideOffset={8}>
                <ChatAttachMenu>{attachmentOptions}</ChatAttachMenu>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
        <ChatEditorSend
          type="button"
          aria-label="Kirim pesan"
          disabled={disabled || !text.trim()}
          onClick={send}
        >
          <Icon icon="lucide-send" size="xs" />
        </ChatEditorSend>
      </ChatEditorBox>
      <ChatCameraDialog
        open={cameraOpen}
        uploading={uploading}
        onOpenChange={setCameraOpen}
        onCapture={(file) => {
          if (disabled || uploading) return
          if (file.size > 5 * MB) {
            showToast({
              type: 'error',
              title: 'Foto terlalu besar',
              message: 'Ukuran foto maksimal 5 MB.',
            })
            return
          }
          setCameraOpen(false)
          setUploading(true)
          void onSendFile(file).finally(() => setUploading(false))
        }}
      />
    </ChatEditorWrapper>
  )
}
