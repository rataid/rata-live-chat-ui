import { AlignerHistoryItem } from '@/model/aligner'
import { formatDayMonth } from '@utils'

import {
  HistoryList,
  HistoryMessage,
  HistoryRow,
  HistoryRowDate,
  HistoryTitle,
  HistoryWrapper,
} from './home.style'

type AlignerSetHistoryProps = {
  id?: string
  items?: AlignerHistoryItem[]
  isLoading?: boolean
  isError?: boolean
}

export function AlignerSetHistory({
  id,
  items,
  isLoading,
  isError,
}: AlignerSetHistoryProps) {
  return (
    <HistoryWrapper id={id}>
      <HistoryTitle>History</HistoryTitle>
      {isLoading && <HistoryMessage>Loading history...</HistoryMessage>}
      {isError && (
        <HistoryMessage>
          Couldn&apos;t load the history. Please try again.
        </HistoryMessage>
      )}
      {items && items.length === 0 && (
        <HistoryMessage>No set changes yet.</HistoryMessage>
      )}
      {items && items.length > 0 && (
        <HistoryList>
          {items.map((item) => (
            <HistoryRow key={`${item.setNumber}-${item.changedOn}`}>
              <span>Changed to Set {item.setNumber}</span>
              <HistoryRowDate>{formatDayMonth(item.changedOn)}</HistoryRowDate>
            </HistoryRow>
          ))}
        </HistoryList>
      )}
    </HistoryWrapper>
  )
}
