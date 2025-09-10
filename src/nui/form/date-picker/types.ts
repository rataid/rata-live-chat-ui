import { DateRange } from 'react-day-picker'

import { InputProps } from '../input/types'

export type DatePickerProps = {
  trigger?: 'input' | 'button'
  portalId?: string
  showError?: boolean
  disabledDays?: any
} & InputProps &
  React.PropsWithChildren

export type DaterangePickerProps = {
  trigger?: 'input' | 'button'
  portalId?: string
  initialRange?: DateRange
  onSelected?: (range?: DateRange) => void
} & InputProps &
  React.PropsWithChildren

export type DatetimePickerProps = {
  timeZone?: string
  trigger?: 'input' | 'button'
  portalId?: string
  disabledDays?: any
} & InputProps &
  React.PropsWithChildren

export type TimeSelectProps = {
  value: string
  label: string
}
