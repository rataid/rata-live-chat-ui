import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/react'
import { useFocusWithin } from 'ahooks'
import { UseComboboxStateChange, useCombobox } from 'downshift'
import { useEffect, useRef, useState } from 'react'

import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import { key } from '@utils'

import { ComboboxItemDefaultType, ComboboxProps } from '../types'
import {
  ComboboxControl,
  ComboboxControlEdge,
  ComboboxControlIndicator,
  ComboboxControlInput,
  ComboboxMenu,
  ComboboxMenuInfo,
  ComboboxMenuItem,
  ComboboxMenuItemButton,
  ComboboxSelectedContainer,
  ComboboxWrapper,
} from './combobox.style'
import { ComboboxItem } from './item'
import { ComboboxSelected } from './selected'

export function Combobox<T>({
  options: { selectedItem: optSelected, onSelectedItemChange, ...opt },
  leading: Leading,
  renderItem,
  renderSelected,
  placeholder,
  disabled = false,
  onFocus,
  onBlur,
  portalId,
  viewOnly,
}: ComboboxProps<T>) {
  const [selectedItem, setSelectedItem] = useState(optSelected)

  const [isFocused, setIsFocused] = useState(false)

  const focusRef = useRef(null)

  const controlInputRef = useRef<HTMLInputElement>(null)
  const clearSelectRef = useRef<HTMLButtonElement>(null)

  useFocusWithin(focusRef, {
    onFocus: () => {
      setIsFocused(true)
      onFocus?.({} as any)
    },
    onBlur: () => {
      setIsFocused(false)
      onBlur?.({} as any)
    },
  })

  useEffect(() => {
    // if (optSelected) {
    //   setSelectedItem(optSelected)
    // }

    setSelectedItem(optSelected)
  }, [optSelected])

  const handleOnSelectedItemChange = (changes: UseComboboxStateChange<T>) => {
    setSelectedItem(changes.selectedItem)
    onSelectedItemChange?.(changes)

    // Handle focus after selected item changes
    if (clearSelectRef.current) {
      clearSelectRef.current.focus()
    } else if (controlInputRef.current) {
      controlInputRef.current.focus()
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getInputProps,
    setInputValue,
    selectItem,
  } = useCombobox({
    ...opt,
    onSelectedItemChange: (changes) => {
      setInputValue('')
      handleOnSelectedItemChange(changes)
    },
  })

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

  const clearSelected = () => {
    handleOnSelectedItemChange({
      selectedItem: null,
    } as UseComboboxStateChange<T>)
    selectItem(null)
  }

  return (
    <ComboboxWrapper ref={focusRef}>
      <div ref={refs.setReference}>
        <ComboboxControlEdge
          isFocused={isFocused}
          disabled={disabled}
          viewOnly={viewOnly}
        >
          {!!Leading && Leading}
          <ComboboxControl hasSelected={!!selectedItem}>
            <>
              <ComboboxControlInput
                {...getInputProps({
                  ref: controlInputRef,
                  disabled,
                  placeholder,
                  onFocus: () => setIsFocused(true),
                  onBlur: () => setIsFocused(false),
                })}
              />
              <ComboboxControlIndicator
                isOpen={isOpen}
                {...getToggleButtonProps({ type: 'button' })}
              >
                <Icon icon="lucide-chevron-down" size="xs" />
              </ComboboxControlIndicator>
            </>
          </ComboboxControl>
          {selectedItem && (
            <ComboboxSelectedContainer>
              <ComboboxSelected
                selectedItem={selectedItem}
                itemToString={opt.itemToString}
                renderSelected={renderSelected}
              />
              {!disabled && (
                <Button
                  ref={clearSelectRef}
                  type="button"
                  variant="tertiaryGray"
                  onClick={clearSelected}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  icon="lucide:x"
                  size="xs"
                />
              )}
            </ComboboxSelectedContainer>
          )}
        </ComboboxControlEdge>
      </div>

      <ul ref={getMenuProps().ref} />
      {isOpen && (
        <FloatingPortal id={portalId}>
          <div
            className="relative z-[9999]"
            style={floatingStyles}
            ref={refs.setFloating}
          >
            {!selectedItem && (
              <ComboboxMenu {...getMenuProps()} isOpen={isOpen}>
                {opt.items.length ? (
                  opt.items.map((item) => (
                    <ComboboxMenuItem
                      key={key(item)}
                      {...getItemProps({ item })}
                    >
                      <ComboboxMenuItemButton>
                        <ComboboxItem
                          item={item as ComboboxItemDefaultType}
                          itemToString={opt.itemToString}
                          renderItem={renderItem}
                        />
                      </ComboboxMenuItemButton>
                    </ComboboxMenuItem>
                  ))
                ) : (
                  <ComboboxMenuInfo>No results found</ComboboxMenuInfo>
                )}
              </ComboboxMenu>
            )}
          </div>
        </FloatingPortal>
      )}
    </ComboboxWrapper>
  )
}

export default Combobox
