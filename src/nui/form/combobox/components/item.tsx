import { ComboboxItemProps } from '../types'
import { ComboboxItemWrapper } from './item.style'

export function ComboboxItem({
  item,
  itemToString,
  renderItem,
  children,
}: ComboboxItemProps) {
  // If children is defined, use this component as template wrapper only
  // for quick and consistent template rendering
  if (children) {
    return <ComboboxItemWrapper>{children}</ComboboxItemWrapper>
  }

  // If it has a custom render function, use it
  if (renderItem) {
    return <div tw="w-full">{renderItem(item)}</div>
  }

  // If it has a custom itemToString function, use it
  if (itemToString) {
    return <ComboboxItemWrapper>{itemToString(item)}</ComboboxItemWrapper>
  }

  // Otherwise, use the default item
  return <ComboboxItemWrapper>{item?.label ?? ''}</ComboboxItemWrapper>
}
