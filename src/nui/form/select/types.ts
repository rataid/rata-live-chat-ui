import { UseSelectProps, UseSelectStateChange } from 'downshift'
import { FocusEventHandler } from 'react'

import { InputPropsWithoutRef } from '@nui/types'
import { BadgeColor } from '@nui/ui/badge'

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
  value: number | string
  label: string
}
export type SelectItemProps = {
  item: SelectItemDefaultType
  isSelected: boolean
  itemToString?: (item: any) => string
}

export type SelectItemBadgeProps = SelectItemProps & {
  badgeColor?: BadgeColor
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

export type SimpleSelectProps<T extends SimpleSelectOption = SimpleSelectOption> = {
  simpleControl?: boolean
  items?: T[]
  onSelectedItemChange?: (
    changes: UseSelectStateChange<T>
  ) => void
  portalId?: string
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode
} & InputPropsWithoutRef
