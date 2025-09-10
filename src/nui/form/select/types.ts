import { UseSelectProps, UseSelectStateChange } from 'downshift'
import { FocusEventHandler } from 'react'

import { InputPropsWithoutRef } from '@nui/types'

export type SelectProps<T> = {
  options: UseSelectProps<T>
  initialSelectedItem?: T
  leading?: React.ReactNode
  simpleControl?: boolean
  placeholder?: string
  disabled?: boolean
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode
  renderValue?: (selectedItem: T) => React.ReactNode
  portalId?: string
}

export type SelectItemDefaultType = {
  value: number
  label: string
}

export type SelectItemProps = {
  item: SelectItemDefaultType
  isSelected: boolean
  itemToString?: (item: any) => string
}

export type SelectSelectedProps = {
  selectedItem: any
  itemToString?: (item: any) => string
}

export type SimpleSelectOption =
  | {
      value: string | number
      label: string
    }
  | null
  | undefined

export type SimpleSelectProps = {
  simpleControl?: boolean
  items?: SimpleSelectOption[]
  onSelectedItemChange?: (
    changes: UseSelectStateChange<SimpleSelectOption>
  ) => void
  portalId?: string
} & InputPropsWithoutRef
