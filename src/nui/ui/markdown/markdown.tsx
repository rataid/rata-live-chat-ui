import MarkdowntoJsx from 'markdown-to-jsx'

import { MarkdownMain } from './markdown.style'
import { MarkdownTheme } from './theme'
import { MarkdownProps } from './types'

export function Markdown({
  children,
  option = {
    namedCodesToUnicode: {
      '#x20': '\u0020',
    },
  },
}: MarkdownProps) {
  const child = typeof children === 'string' ? children : ''

  return (
    <MarkdownMain className="nui-theme">
      <MarkdownTheme />
      <MarkdowntoJsx options={option}>{child}</MarkdowntoJsx>
    </MarkdownMain>
  )
}
