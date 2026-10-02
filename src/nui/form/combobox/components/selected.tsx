import { ComboboxSelectedProps } from '../types'
import {
  ComboboxSelectedCustomWrapper,
  ComboboxSelectedWrapper,
} from './selected.style'

export function ComboboxSelected({
  selectedItem,
  itemToString,
  renderSelected,
  children,
}: ComboboxSelectedProps) {
  // If children is defined, use this component as template wrapper only
  // for quick and consistent template rendering
  if (children) {
    return (
      <ComboboxSelectedCustomWrapper>{children}</ComboboxSelectedCustomWrapper>
    )
  }

  // This should be placed after the children check
  if (!selectedItem) {
    return null
  }

  // If it has a custom render function, use it
  if (renderSelected) {
    return <div className="w-full">{renderSelected(selectedItem)}</div>
  }

  // If it has a custom itemToString function, use it
  if (itemToString) {
    return (
      <ComboboxSelectedWrapper>
        {itemToString(selectedItem)}
      </ComboboxSelectedWrapper>
    )
  }

  // Otherwise, use the default item
  return (
    <ComboboxSelectedWrapper>
      {selectedItem.label || ''}
    </ComboboxSelectedWrapper>
  )
}
