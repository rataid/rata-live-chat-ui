import { parseISO } from 'date-fns'

import { AlignerHistoryItem } from '@/model/aligner'
import { formatDate } from '@utils'

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
      <HistoryTitle>Riwayat</HistoryTitle>
      {isLoading && <HistoryMessage>Memuat Riwayat...</HistoryMessage>}
      {isError && (
        <HistoryMessage>
          Tidak dapat memuat riwayat. Silakan coba lagi.
        </HistoryMessage>
      )}
      {items && items.length === 0 && (
        <HistoryMessage>Belum ada perubahan set.</HistoryMessage>
      )}
      {items && items.length > 0 && (
        <HistoryList>
          {items.map((item) => (
            <HistoryRow key={`${item.setNumber}-${item.changedOn}`}>
              <span>Ganti ke Set {item.setNumber}</span>
              <HistoryRowDate>
                {formatDate(parseISO(item.changedOn), 'dd/MM/yy')}
              </HistoryRowDate>
            </HistoryRow>
          ))}
        </HistoryList>
      )}
    </HistoryWrapper>
  )
}
