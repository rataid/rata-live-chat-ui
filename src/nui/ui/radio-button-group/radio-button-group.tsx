import { useFocusWithin } from 'ahooks'
import { random } from 'lodash'
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'

import Button from '@nui/ui/button'

import ButtonGroup from '../button-group'
import {
  RadioButtonGroupAction,
  RadioButtonGroupActionOverlay,
} from './radio-button-group.style'
import { RadioButtonGroupProps } from './types'

// todo props title active and inactive
export const RadioButtonGroup = forwardRef<
  HTMLInputElement,
  RadioButtonGroupProps
>(function RadioButtonGroup(
  {
    name,
    value,
    trueCaption = 'Active',
    falseCaption = 'Inactive',
    onChange,
    onFocus,
    onBlur,
    sizeButton = 'sm',
  },
  forwardedRef
) {
  const randId = random(1, 1000000)

  const strValue = typeof value !== 'undefined' ? String(value) : ''

  const [inputValue, setInputValue] = useState('')

  const focusRef = useRef(null)

  useFocusWithin(focusRef, {
    onFocus: () => {
      onFocus?.({} as any)
    },
    onBlur: () => {
      onBlur?.({} as any)
    },
  })

  useEffect(() => {
    setInputValue(strValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={focusRef}>
      <ButtonGroup fit>
        <input
          id={`radioGroup${randId}`}
          name={name}
          ref={forwardedRef}
          value={inputValue}
          onChange={() => {}}
          hidden
        />
        <RadioButtonGroupAction isActive={inputValue === 'true'}>
          <Button
            variant="tertiary"
            rounded="none"
            size={sizeButton}
            type="button"
          >
            {trueCaption}
            <RadioButtonGroupActionOverlay
              htmlFor={`radioGroup${randId}`}
              onClick={() => {
                setInputValue('true')
                if (onChange) {
                  onChange({
                    target: { value: 'true' },
                  } as ChangeEvent<HTMLInputElement>)
                }
              }}
            />
          </Button>
        </RadioButtonGroupAction>
        <RadioButtonGroupAction isActive={inputValue === 'false'}>
          <Button
            variant="tertiary"
            rounded="none"
            size={sizeButton}
            type="button"
          >
            {falseCaption}
            <RadioButtonGroupActionOverlay
              htmlFor={`radioGroup${randId}`}
              onClick={() => {
                setInputValue('false')
                if (onChange) {
                  onChange({
                    target: { value: 'false' },
                  } as ChangeEvent<HTMLInputElement>)
                }
              }}
            />
          </Button>
        </RadioButtonGroupAction>
      </ButtonGroup>
    </div>
  )
})
