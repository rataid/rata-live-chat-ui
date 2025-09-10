import { SelectSelectedProps } from '../types'
import { SelectSelectedWrapper } from './selected.style'

export function SelectSelected({
  selectedItem,
  itemToString,
}: SelectSelectedProps) {
  if (!selectedItem) return <SelectSelectedWrapper />

  return (
    <SelectSelectedWrapper>
      {itemToString ? itemToString(selectedItem) : selectedItem.label || ''}
    </SelectSelectedWrapper>
  )
}
