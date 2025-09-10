import { EntryName, EntryValue, EntryWrapper } from './entry.style'
import { EntryProps } from './types'

// Use as Pair component item

export function Entry({ name, fontWeight = 'normal', children }: EntryProps) {
  return (
    <EntryWrapper>
      <EntryName fontWeight={fontWeight} className="entry-name">
        {name}
      </EntryName>
      <EntryValue className="entry-value">{children}</EntryValue>
    </EntryWrapper>
  )
}
