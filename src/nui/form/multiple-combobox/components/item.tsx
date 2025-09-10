import { MultipleComboboxItemProps } from '../types'
import {
  MultipleComboboxItemLabel,
  MultipleComboboxItemWrapper,
} from './item.style'

export default function MultipleComboboxItem({
  item,
  itemToString,
}: MultipleComboboxItemProps) {
  return (
    <MultipleComboboxItemWrapper>
      <MultipleComboboxItemLabel>
        {itemToString ? itemToString(item) : item.label || ''}
      </MultipleComboboxItemLabel>
    </MultipleComboboxItemWrapper>
  )
}
