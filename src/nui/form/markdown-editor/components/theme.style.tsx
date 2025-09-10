import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

export const MarkdownEditorTheme = createGlobalStyle`
.ProseMirror {
  ${tw`p-3 rounded-lg border border-gray-200 min-h-[5rem] max-h-[16.125rem] overflow-auto`}
}
.ProseMirror-focused {
  ${tw`outline-none border border-primary-400`}
}
.nui-theme blockquote {
  ${tw`not-italic font-sans font-normal text-gray-700 border-l-2 pl-2 bg-gray-50/50 p-1 border-gray-200`}
}
.nui-theme p {
  ${tw`my-1`}
}

.nui-theme ol {
  ${tw`my-0 py-1.5`}
}

.nui-theme ul {
  ${tw`my-0 py-1.5`}
}

.nui-theme.prose :where(ol > li):not(:where([class~="not-prose"] *))::marker,
.nui-theme.prose :where(ul > li):not(:where([class~="not-prose"] *))::marker {
  ${tw`text-gray-500 my-1`}
}

`
