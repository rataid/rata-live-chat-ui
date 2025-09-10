import { MarkdownToJSX } from 'markdown-to-jsx'

export type MarkdownProps = {
  option?: MarkdownToJSX.Options
} & React.PropsWithChildren
