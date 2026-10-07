import { useLayoutEffect, useRef, useState } from 'react'

import Icon from '@nui/ui/icon'

import {
  ChatEditorBox,
  ChatEditorSend,
  ChatEditorTextarea,
  ChatEditorToolbar,
  ChatEditorToolbarButton,
  ChatEditorWrapper,
} from './chat.style'

const toolbarItems = [
  { icon: 'lucide-bold', label: 'Bold' },
  { icon: 'lucide-italic', label: 'Italic' },
  { icon: 'lucide-link', label: 'Link' },
  { icon: 'lucide-image', label: 'Image' },
  { icon: 'lucide-list', label: 'Bullet list' },
  { icon: 'lucide-list-ordered', label: 'Numbered list' },
]

type ChatEditorProps = {
  onSend: (text: string) => void
}

export function ChatEditor({ onSend }: ChatEditorProps) {
  const [text, setText] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [text])

  const send = () => {
    const value = text.trim()
    if (!value) return
    onSend(value)
    setText('')
  }

  return (
    <ChatEditorWrapper>
      <ChatEditorToolbar>
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
          disabled={!text.trim()}
          onClick={send}
        >
          <Icon icon="lucide-send" size="xs" />
        </ChatEditorSend>
      </ChatEditorBox>
    </ChatEditorWrapper>
  )
}
