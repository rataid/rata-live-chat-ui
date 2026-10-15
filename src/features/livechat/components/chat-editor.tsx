import { useLayoutEffect, useRef, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'

import Icon from '@nui/ui/icon'
import { showToast } from '@nui/ui/toast'

import {
  ChatAttachItem,
  ChatAttachMenu,
  ChatEditorBox,
  ChatEditorSend,
  ChatEditorTextarea,
  ChatEditorToolbar,
  ChatEditorToolbarButton,
  ChatEditorWrapper,
} from './chat.style'
import { ChatCameraDialog } from './chat-camera-dialog'

const toolbarItems = [
  { icon: 'lucide-bold', label: 'Bold' },
  { icon: 'lucide-italic', label: 'Italic' },
  { icon: 'lucide-link', label: 'Link' },
  { icon: 'lucide-list', label: 'Bullet list' },
  { icon: 'lucide-list-ordered', label: 'Numbered list' },
]

const MB = 1024 * 1024

const attachItems = [
  {
    kind: 'gallery',
    icon: 'lucide-image',
    label: 'Gallery',
    accept: 'image/jpeg,image/png,video/mp4,video/3gpp,.jpg,.jpeg,.png,.mp4,.3gp',
  },
  {
    kind: 'camera',
    icon: 'lucide-camera',
    label: 'Camera',
    accept: '',
  },
  {
    kind: 'document',
    icon: 'lucide-file-text',
    label: 'Document',
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf,text/plain',
  },
  {
    kind: 'audio',
    icon: 'lucide-headphones',
    label: 'Audio',
    accept: 'audio/aac,audio/amr,audio/mpeg,audio/mp4,audio/ogg,.aac,.amr,.mp3,.m4a,.ogg',
  },
] as const

function fileLimitMb(file: File) {
  if (file.type.startsWith('image/')) return 5
  if (file.type.startsWith('video/')) return 16
  if (file.type.startsWith('audio/')) return 16
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

  return (
    <ChatEditorWrapper>
      <ChatEditorToolbar>
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (!file || disabled || uploading) return

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
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <ChatEditorToolbarButton
              type="button"
              aria-label="Attach file"
              title="Attach file"
              disabled={disabled || uploading}
            >
              <Icon icon="lucide-paperclip" size="xs" />
            </ChatEditorToolbarButton>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side="top" align="end" sideOffset={8}>
              <ChatAttachMenu>
                {attachItems.map((item) => (
                  <ChatAttachItem
                    key={item.kind}
                    type="button"
                    disabled={disabled || uploading}
                    onClick={() => openPicker(item)}
                  >
                    <Icon icon={item.icon} size="sm" />
                    {item.label}
                  </ChatAttachItem>
                ))}
              </ChatAttachMenu>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {toolbarItems.map(({ icon, label }) => (
          <ChatEditorToolbarButton
            key={icon}
            type="button"
            aria-label={label}
            title={label}
            disabled
          >
            <Icon icon={icon} size="xs" />
          </ChatEditorToolbarButton>
        ))}
      </ChatEditorToolbar>
      <ChatEditorBox>
        <ChatEditorTextarea
          ref={textareaRef}
          rows={1}
          value={text}
          placeholder="Write messages..."
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
        <ChatEditorSend
          type="button"
          aria-label="Send"
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
          setCameraOpen(false)
          setUploading(true)
          void onSendFile(file).finally(() => setUploading(false))
        }}
      />
    </ChatEditorWrapper>
  )
}
