import { forwardRef } from 'react'

import Badge from '@nui/ui/badge'
import Dot from '@nui/ui/dot'
import Icon from '@nui/ui/icon'

import { MultipleComboboxSelectedProps } from '../types'
import { MultipleComboboxSelectedWrapper } from './selected.style'

export const MultipleComboboxSelected = forwardRef<
  HTMLButtonElement,
  MultipleComboboxSelectedProps
>(function MultipleComboboxSelected(
  { selectedItem, renderSelected, removeSelectedItem },
  ref
) {
  if (!selectedItem) {
    return null
  }

  if (renderSelected) {
    return <div className="w-full">{renderSelected(selectedItem)}</div>
  }

  return (
    <Badge size="sm" color="gray" noBackground>
      <Dot color="disable" />
      {selectedItem.label || ''}
      <MultipleComboboxSelectedWrapper
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          removeSelectedItem(selectedItem)
        }}
        ref={ref}
      >
        <Icon icon="lucide-x" size="2xs" />
      </MultipleComboboxSelectedWrapper>
    </Badge>
  )
})
