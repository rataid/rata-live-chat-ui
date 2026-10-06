import { format } from 'date-fns'

import {
  HistoryList,
  HistoryMessage,
  HistoryRow,
  HistoryRowDate,
  HistoryTitle,
  HistoryWrapper,
} from './home.style'

export type AlignerSetHistoryItem = {
  set: number
  // ISO date of the change
  changedAt: string
}

type AlignerSetHistoryProps = {
  id?: string
  items: AlignerSetHistoryItem[]
}

// @todo: load the items from the backend (only when the panel is opened)
export function AlignerSetHistory({ id, items }: AlignerSetHistoryProps) {
  return (
    <HistoryWrapper id={id}>
      <HistoryTitle>History</HistoryTitle>
      {items.length === 0 ? (
        <HistoryMessage>No set changes yet.</HistoryMessage>
      ) : (
        <HistoryList>
          {items.map((item) => (
            <HistoryRow key={`${item.set}-${item.changedAt}`}>
              <span>Changed to Set {item.set}</span>
              <HistoryRowDate>
                {format(new Date(item.changedAt), 'd MMM')}
              </HistoryRowDate>
            </HistoryRow>
          ))}
        </HistoryList>
      )}
    </HistoryWrapper>
  )
}
