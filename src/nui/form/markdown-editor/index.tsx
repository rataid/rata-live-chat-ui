import { MilkdownProvider } from '@milkdown/react'
import { forwardRef } from 'react'

import { MarkdownEditorMain } from './markdown-editor'
import { MarkdownEditorValueProps } from './types'

export const MarkdownEditor = forwardRef<
  HTMLInputElement,
  MarkdownEditorValueProps
>(function MarkdownEditor({ tooltipId, value, onChange, ...props }, ref) {
  const markdown = typeof value === 'string' ? value : ''

  return (
    <MilkdownProvider>
      <input type="hidden" ref={ref} value={value ?? ''} {...props} />
      <MarkdownEditorMain
        tooltipId={tooltipId}
        markdown={markdown}
        onChange={onChange}
      />
    </MilkdownProvider>
  )
})
