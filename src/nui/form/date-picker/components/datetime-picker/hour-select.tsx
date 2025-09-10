import { UseSelectProps, UseSelectStateChange } from 'downshift'

import { Select } from '@nui/form/select'

import { TimeSelectProps } from '../../types'

type HourSelectProps = {
  value?: string
  disabled?: boolean
  onSelectedItemChange?: (
    changes: UseSelectStateChange<TimeSelectProps>
  ) => void
}

export default function DatetimePickerHourSelect({
  value,
  disabled,
  onSelectedItemChange,
}: HourSelectProps) {
  const items = []

  for (let i = 0; i < 24; i += 1) {
    const hour = i < 10 ? `0${i}` : i.toString()
    items.push({ value: hour, label: hour })
  }

  const selectedItem = items.find((item) => item.value === value)

  const options: UseSelectProps<TimeSelectProps> = {
    items,
    selectedItem,
    onSelectedItemChange,
  }

  return <Select disabled={disabled} options={options} />
}
