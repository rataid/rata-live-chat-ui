import { useFocusWithin } from 'ahooks'
import { UseSelectProps, UseSelectStateChange } from 'downshift'
import { forwardRef, useRef } from 'react'

import { SimpleSelectOption, SimpleSelectProps } from '../types'
import { Select } from './select'

export const SimpleSelect = forwardRef<HTMLInputElement, SimpleSelectProps>(
  function SimpleSelect(
    {
      name,
      value,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      items,
      disabled,
      onSelectedItemChange,
      simpleControl,
      portalId,
      ...props
    },
    forwardedRef
  ) {
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
      changes: UseSelectStateChange<SimpleSelectOption>
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
    const options: UseSelectProps<SimpleSelectOption> = {
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
          <Select
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
)
