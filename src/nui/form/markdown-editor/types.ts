import { Editor } from '@milkdown/core'
import { ChangeEventHandler } from 'react'

import { InputPropsWithoutRef } from '@nui/types'

export type MarkdownEditorValueProps = {
  tooltipId?: string
} & InputPropsWithoutRef

export type MarkdownEditorProps = {
  tooltipId?: string
  markdown: string
  onChange?: ChangeEventHandler<HTMLInputElement>
} & InputPropsWithoutRef

export type MarkdownEditorToolbarProps = {
  tooltipId?: string
  get: () => Editor | undefined
}
