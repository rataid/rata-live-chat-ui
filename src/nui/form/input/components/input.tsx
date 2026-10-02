import { useFocusWithin } from 'ahooks'
import {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'

import { InputProps } from '../types'
import {
  InputAddOn,
  InputIcon,
  InputMain,
  InputStepperArrow,
  InputStepperWrapper,
  InputTrailOn,
  InputWrapper,
} from './input.style'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    addOn,
    trailOn,
    leadingIcon,
    trailingIcon,
    sizeInput,
    disabled,
    danger,
    value,
    type,
    isUppercase,
    onChange,
    onFocus,
    onBlur,
    ...props
  },
  forwardedRef
) {
  const internalRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement | null>

  // Hidden input can be accessed by ref from internal and parent component
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => internalRef.current
  )

  const [inputValue, setInputValue] = useState('')

  const [isFocused, setIsFocused] = useState(false)

  const [password, setPassword] = useState(true)

  const increment = () => {
    if (onChange && !disabled) {
      internalRef.current?.focus()
      onChange({ target: { value: +inputValue + 1 } } as any)
    }
  }

  const decrement = () => {
    if (onChange && !disabled) {
      internalRef.current?.focus()
      onChange({ target: { value: +inputValue - 1 } } as any)
    }
  }

  const focusRef = useRef(null)

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
    if (value !== undefined)
      setInputValue(
        isUppercase ? value.toString().toUpperCase() : value.toString()
      )
  }, [isUppercase, value])

  return (
    <InputWrapper sizeInput={sizeInput} ref={focusRef} isFocused={isFocused}>
      {!!addOn && <InputAddOn sizeInput={sizeInput}>{addOn}</InputAddOn>}
      <InputMain leadingIcon={leadingIcon} isFocused={isFocused}>
        {!!leadingIcon && (
          <InputIcon danger={danger} disable={disabled}>
            <Icon icon={leadingIcon} size="xs" />
          </InputIcon>
        )}
        <input
          ref={internalRef}
          disabled={disabled}
          value={isUppercase ? value?.toString().toUpperCase() : value ?? ''}
          onChange={onChange}
          type={password ? type : 'text'}
          {...props}
        />
        {!!trailingIcon && type !== 'number' && type !== 'password' && (
          <InputIcon danger={danger} isFocused={isFocused}>
            <Icon icon={trailingIcon} size="xs" />
          </InputIcon>
        )}
        {(type === 'password' || type === 'text') && (
          <Button
            onClick={() => setPassword((e) => !e)}
            icon={
              <Icon
                icon={password ? 'lucide-eye' : 'lucide-eye-off'}
                size="xs"
              />
            }
            variant="tertiaryGray"
            size="xs"
            className="mr-1"
          />
        )}
        {type === 'number' && (
          <InputStepperWrapper>
            <InputStepperArrow type="button" onClick={increment}>
              <Icon icon="lucide-chevron-up" size="xs" />
            </InputStepperArrow>
            <InputStepperArrow type="button" onClick={decrement}>
              <Icon icon="lucide-chevron-down" size="xs" />
            </InputStepperArrow>
          </InputStepperWrapper>
        )}
      </InputMain>
      {!!trailOn && (
        <InputTrailOn sizeInput={sizeInput}>{trailOn}</InputTrailOn>
      )}
    </InputWrapper>
  )
})
