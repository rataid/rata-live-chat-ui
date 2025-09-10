import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { useMemo, useRef, useState } from 'react'
import tw from 'twin.macro'

import { Input } from '@nui/form'
import Icon from '@nui/ui/icon'
import { key } from '@utils'

import {
  MultipleComboboxItemDefaultType,
  MultipleComboboxProps,
} from '../types'
import MultipleComboboxItem from './item'
import {
  MultipleComboboxControlIndicator,
  MultipleComboboxMenu,
  MultipleComboboxMenuInfo,
  MultipleComboboxMenuItem,
  MultipleComboboxMenuItemButton,
  MultipleComboboxPlaceholder,
  MultipleComboboxSelectedMain,
  MultipleComboboxSelectedWrapper,
  MultipleComboboxWrapper,
} from './multiple-combobox.style'
import { MultipleComboboxSelected } from './selected'

export function MultipleCombobox<T>({
  options: { selectedItems: optSelected, ...opt },
  renderItem,
  renderSelected,
  placeholder = '',
  portalId,
}: MultipleComboboxProps<T>) {
  const [inputValue, setInputValue] = useState('')

  const [selectedItems, setSelectedItems] = useState(
    opt?.defaultSelectedItems || []
  )
  const controlInputRef = useRef<HTMLInputElement>(null)

  const filterItems = useMemo(() => {
    const lowerCasedInputValue = inputValue.toLowerCase()

    return optSelected?.filter(function filterBook(item) {
      const filterItem = item as MultipleComboboxItemDefaultType
      return (
        !selectedItems?.includes(item) &&
        (filterItem.label.toLowerCase().includes(lowerCasedInputValue) ||
          filterItem.value.toLowerCase().includes(lowerCasedInputValue))
      )
    })
  }, [selectedItems, inputValue, optSelected])

  const {
    getSelectedItemProps,
    addSelectedItem,
    getDropdownProps,
    removeSelectedItem,
  } = useMultipleSelection({
    selectedItems,
    onSelectedItemsChange: (change) => {
      opt.onSelectedItemsChange?.(change)
    },
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems || [])
          break
        default:
          break
      }
    },
  })

  const items = filterItems || []

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    items,
    selectedItem: null,
    inputValue,
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        addSelectedItem(selectedItem)
      }
    },
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          }
        default:
          return changes
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem && selectedItems) {
            setSelectedItems([...selectedItems, newSelectedItem])
            setInputValue('')
          }
          break

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue as string)
          break
        default:
          break
      }
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

  return (
    <MultipleComboboxWrapper>
      <div ref={refs.setReference} className="group">
        {selectedItems?.length === 0 && (
          <MultipleComboboxPlaceholder {...getToggleButtonProps()}>
            {placeholder}
          </MultipleComboboxPlaceholder>
        )}
        <MultipleComboboxSelectedWrapper>
          <MultipleComboboxSelectedMain>
            {selectedItems?.map((selectedItemForRender, index) => (
              <MultipleComboboxSelected
                key={key(selectedItemForRender)}
                selectedItem={selectedItemForRender}
                itemToString={opt.itemToString}
                renderSelected={renderSelected}
                removeSelectedItem={removeSelectedItem}
                {...getSelectedItemProps({
                  selectedItem: selectedItemForRender,
                  index,
                })}
              />
            ))}
          </MultipleComboboxSelectedMain>
          <MultipleComboboxControlIndicator
            type="button"
            {...getToggleButtonProps()}
            isOpen={isOpen}
          >
            <Icon icon="lucide-chevron-down" size="xs" />
          </MultipleComboboxControlIndicator>
        </MultipleComboboxSelectedWrapper>
        <div tw="w-full relative bg-white p-0">
          <div css={[isOpen ? tw`block mt-1 sticky py-1` : tw`hidden`]}>
            <Input
              {...getInputProps(
                getDropdownProps({
                  ref: controlInputRef,
                  placeholder: 'search...',
                  preventKeyAction: isOpen,
                })
              )}
            />
          </div>
        </div>
        <ul ref={getMenuProps().ref} />
        {isOpen && (
          <FloatingPortal id={portalId}>
            <div
              tw="relative z-[9999]"
              style={floatingStyles}
              ref={refs.setFloating}
            >
              {selectedItems && (
                <MultipleComboboxMenu {...getMenuProps()} isOpen={isOpen}>
                  {items.length ? (
                    items.map((item, index) => (
                      <MultipleComboboxMenuItem
                        key={key(item)}
                        {...getItemProps({
                          item,
                          index,
                        })}
                      >
                        <MultipleComboboxMenuItemButton>
                          {!renderItem && (
                            <MultipleComboboxItem
                              item={item as MultipleComboboxItemDefaultType}
                              itemToString={opt.itemToString}
                            />
                          )}
                        </MultipleComboboxMenuItemButton>
                      </MultipleComboboxMenuItem>
                    ))
                  ) : (
                    <MultipleComboboxMenuInfo>
                      No results found
                    </MultipleComboboxMenuInfo>
                  )}
                </MultipleComboboxMenu>
              )}
            </div>
          </FloatingPortal>
        )}
      </div>
    </MultipleComboboxWrapper>
  )
}
