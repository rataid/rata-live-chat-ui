import { UseSelectProps, UseSelectStateChange } from 'downshift'

import { Select } from '@nui/form/select'

import { TimeSelectProps } from '../../types'

type MinuteSelectProps = {
  value?: string
  disabled?: boolean
  onSelectedItemChange?: (
    changes: UseSelectStateChange<TimeSelectProps>
  ) => void
}

export default function DatetimePickerMinuteSelect({
  value,
  disabled,
  onSelectedItemChange,
}: MinuteSelectProps) {
  const items = []

  for (let i = 0; i < 60; i++) {
    const minute = i < 10 ? `0${i}` : i.toString()
    items.push({ value: minute, label: minute })
  }

  const selectedItem = items.find((item) => item.value === value)

  const options: UseSelectProps<TimeSelectProps> = {
    items,
    selectedItem,
    onSelectedItemChange,
  }

  return <Select disabled={disabled} options={options} />
}
