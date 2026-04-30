import { useFocusWithin } from 'ahooks'
import { UseSelectProps, UseSelectStateChange } from 'downshift'
import { forwardRef, useRef } from 'react'

import { SimpleSelectOption, SimpleSelectProps } from '../types'
import { Select } from './select'
export const SimpleSelect = <T extends SimpleSelectOption = SimpleSelectOption>(
  props: SimpleSelectProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => {
  const {
    name,
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    items,
    renderItem,
    disabled,
    onSelectedItemChange,
    simpleControl,
    portalId,
    ref: forwardedRef,
    ...restProps
  } = props
  const focusRef = useRef(null)

  useFocusWithin(focusRef, {
    onFocus: () => {
      onFocus?.({} as any)
    },
    onBlur: () => {
      onBlur?.({} as any)
    },
  })

  const handleSelectedItemChange = (
    changes: UseSelectStateChange<T>
  ) => {
    if (onSelectedItemChange) {
      onSelectedItemChange(changes)
    }

    if (onChange) {
      onChange({
        target: { value: changes.selectedItem?.value ?? '' },
      } as any)

      // Must be called after onChange
      // Strange react hook form behavior when using onBlur
      onBlur?.({} as any)
    }
  }
  const options: UseSelectProps<T> = {
    items: items || [],
    selectedItem: items?.find((item) => item?.value === value) ?? null,
    onSelectedItemChange: handleSelectedItemChange,
  }

  return (
    <div ref={focusRef}>
      <input
        ref={forwardedRef}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        type="hidden"
        {...props}
      />
      <div>
        <Select<T>
          renderItem={renderItem}
          simpleControl={simpleControl}
          disabled={disabled}
          options={options}
          portalId={portalId}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
