import { formatDate, parseDate } from '@utils'

import { DateInfoMain, DateInfoWrapper } from './date.style'
import { DateInfoProps } from './types'

export function DateInfo({ title, date, dateFormat }: DateInfoProps) {
  return (
    <DateInfoWrapper>
      {title}
      <DateInfoMain>{formatDate(parseDate(date), dateFormat)}</DateInfoMain>
    </DateInfoWrapper>
  )
}
