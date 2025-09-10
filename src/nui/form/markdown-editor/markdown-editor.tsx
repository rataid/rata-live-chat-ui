import { Editor, defaultValueCtx, rootCtx } from '@milkdown/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { commonmark } from '@milkdown/preset-commonmark'
import { Milkdown, useEditor } from '@milkdown/react'

import { nuiTheme } from './components/theme'
import { MarkdownEditorTheme } from './components/theme.style'
import MarkdownEditorToolbar from './components/toolbar'
import { MarkdownEditorWrapper } from './markdown-editor.style'
import { MarkdownEditorProps } from './types'

export function MarkdownEditorMain({
  tooltipId,
  markdown,
  onChange,
}: MarkdownEditorProps) {
  const { get } = useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown ?? 'text editor')
        ctx
          .get(listenerCtx)
          .markdownUpdated((e, markdownValue, prevMarkdown) => {
            if (markdownValue !== prevMarkdown && onChange) {
              onChange({ target: { value: markdownValue ?? '' } } as any)
            }
          })
      })
      .config(nuiTheme)
      .use(commonmark)
      .use(listener)
  }, [])

  return (
    <MarkdownEditorWrapper>
      <MarkdownEditorToolbar get={get} tooltipId={tooltipId} />
      <MarkdownEditorTheme />
      <Milkdown />
    </MarkdownEditorWrapper>
  )
}
