import { DropdownProps } from 'react-day-picker'

import { SimpleSelect } from '@nui/form/select'

export default function DateSelect({
  value,
  options,
  onChange,
}: DropdownProps) {
  const items =
    options?.map((opt) => ({
      value: opt.value,
      label: opt.label,
      disabled: opt.disabled,
    })) ?? []

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e)
  }

  return (
    <SimpleSelect
      simpleControl
      value={value}
      items={items}
      onChange={handleSelectChange as any}
    />
  )
}
