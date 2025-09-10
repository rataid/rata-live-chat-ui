import { map, mapKeys } from 'lodash'
import { DropdownProps } from 'react-day-picker'

import { SimpleSelect } from '@nui/form/select'

export default function DateSelect({
  value,
  children,
  onChange,
}: DropdownProps) {
  let items: any[] = []

  if (Array.isArray(children)) {
    items = children.map((child) => (child as React.ReactElement).props)
    items = map(items, (item) =>
      mapKeys(item, (valueItem, key) => (key === 'children' ? 'label' : key))
    )
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <SimpleSelect
      simpleControl
      value={value}
      items={items as any}
      onChange={handleSelectChange as any}
    />
  )
}
