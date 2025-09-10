import { UseMultipleSelectionProps } from 'downshift'
import { FocusEventHandler } from 'react'

export type MultipleComboboxItemDefaultType = {
  value: string
  label: string
}

export type MultipleComboboxProps<T> = {
  options: UseMultipleSelectionProps<T>
  leading?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode
  renderSelected?: (selectedItem: T) => React.ReactNode
  portalId?: string
}

export type MultipleComboboxItemProps = {
  item: MultipleComboboxItemDefaultType
  itemToString?: (item: any) => string
}

export type MultipleComboboxSelectedProps = {
  selectedItem: any
  itemToString?: (item: any) => string
  renderSelected?: (item: any) => React.ReactNode
  removeSelectedItem: (item: any) => void
}

export type MultipleComboProps<T> = {
  items: T[]
  isOpen: any
  selectedItem: any
  selectItem: any
  getToggleButtonProps: any
  getMenuProps: any
  getItemProps: any
  getInputProps: any
  itemToString?: (item: any) => string
  leading?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode
  renderSelected?: (selectedItem: T) => React.ReactNode
  portalId?: string
}
