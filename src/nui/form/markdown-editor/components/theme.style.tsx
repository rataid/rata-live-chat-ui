import { createGlobalStyle } from 'styled-components'

export const MarkdownEditorTheme = createGlobalStyle`
.ProseMirror {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--nui-color-gray-200);
  min-height: 5rem;
  max-height: 16.125rem;
  overflow: auto;
}
.ProseMirror-focused {
  outline: 2px solid var(--nui-color-transparent);
  outline-offset: 2px;
  border: 1px solid var(--nui-color-primary-400);
}
.nui-theme blockquote {
  font-style: normal;
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue';
  font-weight: 400;
  color: var(--nui-color-gray-700);
  border-left: 2px solid var(--nui-color-gray-200);
  background-color: color-mix(in srgb, var(--nui-color-gray-50) 50%, transparent);
  padding: 0.25rem;
  padding-left: 0.5rem;
}
.nui-theme p {
  margin: 0.25rem 0;
}

.nui-theme ol {
  margin: 0;
  padding: 0.375rem 0;
}

.nui-theme ul {
  margin: 0;
  padding: 0.375rem 0;
}

.nui-theme.prose :where(ol > li):not(:where([class~="not-prose"] *))::marker,
.nui-theme.prose :where(ul > li):not(:where([class~="not-prose"] *))::marker {
  color: var(--nui-color-gray-500);
  margin: 0.25rem 0;
}

`
