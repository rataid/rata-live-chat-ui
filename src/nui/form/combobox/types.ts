import { UseComboboxProps } from 'downshift'
import React, { FocusEventHandler } from 'react'

export type ComboboxProps<T> = {
  options: UseComboboxProps<T>
  leading?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  renderItem?: (item: T) => React.ReactNode
  renderSelected?: (selectedItem: T) => React.ReactNode
  portalId?: string
  viewOnly?: boolean
}

export type ComboboxItemDefaultType = {
  value: number
  label: string
}

export type ComboboxItemProps = {
  item?: any
  itemToString?: (item: any) => string
  renderItem?: (item: any) => React.ReactNode
} & React.PropsWithChildren

export type ComboboxSelectedProps = {
  selectedItem?: any
  itemToString?: (item: any) => string
  renderSelected?: (item: any) => React.ReactNode
} & React.PropsWithChildren

export type ComboProps<T> = {
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
  renderItem?: (item: T) => React.ReactNode
  renderSelected?: (selectedItem: T) => React.ReactNode
  portalId?: string
}
