import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function Syntax({ children }: React.PropsWithChildren) {
  const codeString = children?.toString() || ''

  return (
    <SyntaxHighlighter tw="rounded-lg" language="javascript" style={darcula}>
      {codeString}
    </SyntaxHighlighter>
  )
}
