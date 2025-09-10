import { useFocusWithin } from 'ahooks'
import { forwardRef, useEffect, useRef, useState } from 'react'

import {
  ToggleAction,
  ToggleContent,
  ToggleLabel,
  ToggleMain,
  ToggleWrapper,
} from './toggle.style'
import { ToggleProps } from './types'

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    id = 'active',
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    disable = false,
    variant = 'dark',
    scale = 'sm',
    children,
  },
  forwardedRef
) {
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

  const toggle = () => {
    const newInputValue = inputValue === 'true' ? 'false' : 'true'

    setInputValue(newInputValue)
    onChange?.({
      target: { value: newInputValue },
    } as any)
  }

  useEffect(() => {
    setInputValue(strValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strValue])

  return (
    <ToggleWrapper ref={focusRef}>
      <input
        id={id}
        name={name}
        ref={forwardedRef}
        value={inputValue}
        onChange={() => {}}
        type="text"
        hidden
      />
      <ToggleContent>
        <ToggleAction
          type="button"
          disabled={disable}
          onClick={toggle}
          variant={variant}
          scale={scale}
          pressed={inputValue === 'true'}
        >
          <ToggleMain scale={scale} pressed={inputValue === 'true'} />
        </ToggleAction>
      </ToggleContent>
      {children && (
        <ToggleLabel type="button" disabled={disable} onClick={toggle}>
          {children}
        </ToggleLabel>
      )}
    </ToggleWrapper>
  )
})
