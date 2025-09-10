import { useResponsive } from 'ahooks'
import { format, parseISO } from 'date-fns'

import {
  ShortdateCellContainer,
  ShortdateCellMain,
  ShortdateCellWrapper,
} from './shortdate-cell.style'

type ShortdateCellProps = {
  date: string
  primary?: boolean
}

export default function ShortdateCell({
  date,
  primary = false,
}: ShortdateCellProps) {
  const { lg } = useResponsive()

  const formatDay = lg ? 'dd' : 'dd/'

  const day = format(parseISO(date), formatDay)

  const formatMonth = lg ? 'MMM yy' : 'MM/yyyy'

  const month = format(parseISO(date), formatMonth)

  return (
    <ShortdateCellWrapper>
      <ShortdateCellContainer primary={primary}>{day}</ShortdateCellContainer>
      <ShortdateCellMain primary={primary}>{month}</ShortdateCellMain>
    </ShortdateCellWrapper>
  )
}
