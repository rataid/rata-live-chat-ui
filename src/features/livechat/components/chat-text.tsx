import { ReactNode } from 'react'

// WhatsApp-style formatting the clinic's agents type in crboard, with the
// same rules as crboard's whatsapp-markdown helper. Renders React nodes
// instead of an HTML string, so message text can't inject markup.
const FORMAT_REGEX =
  /```([\s\S]+?)```|`([^`\n]+?)`|((?:https?:\/\/|www\.)[^\s<]+)|\*(\S(?:.*?\S)?)\*|_(\S(?:.*?\S)?)_|~(\S(?:.*?\S)?)~/g

// Punctuation that usually ends a sentence, not the link
const URL_TRAILING = /[.,!?;:)\]]+$/

// "snake_case_name" shouldn't turn "case" italic: a marker only opens after
// the start of the text or a non-word character
const isWordChar = (char: string | undefined) => !!char && /\w/.test(char)

function renderUrl(url: string, key: string) {
  const trailing = URL_TRAILING.exec(url)?.[0] ?? ''
  const link = trailing ? url.slice(0, -trailing.length) : url
  const href = link.startsWith('http') ? link : `https://${link}`

  return [
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-all underline"
    >
      {link}
    </a>,
    trailing,
  ]
}

function renderFormatted(text: string, keyPrefix = ''): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(FORMAT_REGEX)) {
    const [whole, block, code, url, bold, italic, strike] = match
    const index = match.index ?? 0
    const key = `${keyPrefix}${index}`

    const isEmphasis = bold ?? italic ?? strike
    if (isEmphasis !== undefined && isWordChar(text[index - 1])) continue

    nodes.push(text.slice(lastIndex, index))
    lastIndex = index + whole.length

    if (block !== undefined) {
      nodes.push(
        <code
          key={key}
          className="block whitespace-pre-wrap rounded bg-black/10 px-1.5 py-1 font-mono text-xs"
        >
          {block.trim()}
        </code>
      )
    } else if (code !== undefined) {
      nodes.push(
        <code key={key} className="rounded bg-black/10 px-1 font-mono text-xs">
          {code}
        </code>
      )
    } else if (url !== undefined) {
      nodes.push(...renderUrl(url, key))
    } else if (bold !== undefined) {
      nodes.push(<strong key={key}>{renderFormatted(bold, `${key}-`)}</strong>)
    } else if (italic !== undefined) {
      nodes.push(<em key={key}>{renderFormatted(italic, `${key}-`)}</em>)
    } else if (strike !== undefined) {
      nodes.push(<del key={key}>{renderFormatted(strike, `${key}-`)}</del>)
    }
  }

  nodes.push(text.slice(lastIndex))

  return nodes.filter((node) => node !== '')
}

export function ChatText({ text }: { text: string }) {
  return <>{renderFormatted(text)}</>
}

// Plain text without the markers, for one-line previews (pinned bar)
export function stripChatFormatting(text: string) {
  return text
    .replace(/```([\s\S]+?)```/g, '$1')
    .replace(/`([^`\n]+?)`/g, '$1')
    .replace(/\*(\S(?:.*?\S)?)\*/g, '$1')
    .replace(/_(\S(?:.*?\S)?)_/g, '$1')
    .replace(/~(\S(?:.*?\S)?)~/g, '$1')
}
