import Icon from '@nui/ui/icon'

import { SelectItemProps } from '../types'
import {
  SelectItemLabel,
  SelectItemSymbol,
  SelectItemWrapper,
} from './item.style'

export function SelectItem({
  item,
  isSelected,
  itemToString,
}: SelectItemProps) {
  return (
    <SelectItemWrapper isSelected={isSelected}>
      <SelectItemLabel>
        {itemToString ? itemToString(item) : item.label || ''}
      </SelectItemLabel>
      <SelectItemSymbol>
        {isSelected && <Icon icon="lucide:check" size="xs" />}
      </SelectItemSymbol>
    </SelectItemWrapper>
  )
}
