import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/react'
import { useSelect } from 'downshift'
import { isEqual } from 'lodash'
import { useRef } from 'react'

import Icon from '@nui/ui/icon'
import { key } from '@utils'

import { SelectItemDefaultType, SelectProps } from '../types'
import { SelectItem } from './item'
import {
  SelectControl,
  SelectControlIndicator,
  SelectControlValue,
  SelectControlValuePlaceholder,
  SelectMenu,
  SelectMenuItem,
  SelectMenuItemButton,
  SelectWrapper,
} from './select.style'
import { SelectSelected } from './selected'

export function Select<T>({
  options,
  simpleControl = false,
  leading: Leading,
  placeholder,
  renderItem,
  renderValue,
  disabled,
  portalId,
}: SelectProps<T>) {
  const focusRef = useRef(null)

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect(options)

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      shift({ padding: 5 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          })
        },
      }),
    ],
  })

  return (
    <SelectWrapper ref={focusRef}>
      <div ref={refs.setReference}>
        <SelectControl
          {...getToggleButtonProps({ disabled })}
          disabled={disabled}
          simpleControl={simpleControl}
        >
          {!!Leading && Leading}
          <SelectControlValue>
            {selectedItem &&
              (renderValue ? (
                renderValue(selectedItem)
              ) : (
                <SelectSelected
                  selectedItem={selectedItem}
                  itemToString={options.itemToString}
                />
              ))}
            {!selectedItem && placeholder && (
              <SelectControlValuePlaceholder>
                {placeholder}
              </SelectControlValuePlaceholder>
            )}
          </SelectControlValue>
          <SelectControlIndicator isOpen={isOpen}>
            <Icon icon="lucide-chevron-down" size="xs" />
          </SelectControlIndicator>
        </SelectControl>
      </div>

      <ul ref={getMenuProps().ref} />
      {/* Fix z-index problem by portal to #dialog-portal if exists */}
      {isOpen && (
        <FloatingPortal id={portalId}>
          <div
            tw="relative z-[9999]"
            style={floatingStyles}
            ref={refs.setFloating}
          >
            <SelectMenu {...getMenuProps()} isOpen={isOpen}>
              {options.items.map((item) => (
                <SelectMenuItem key={key(item)}>
                  <SelectMenuItemButton
                    type="button"
                    {...getItemProps({ item })}
                  >
                    {renderItem ? (
                      renderItem(item, isEqual(item, selectedItem))
                    ) : (
                      <SelectItem
                        item={item as SelectItemDefaultType}
                        isSelected={isEqual(item, selectedItem)}
                        itemToString={options.itemToString}
                      />
                    )}
                  </SelectMenuItemButton>
                </SelectMenuItem>
              ))}
            </SelectMenu>
          </div>
        </FloatingPortal>
      )}
    </SelectWrapper>
  )
}
