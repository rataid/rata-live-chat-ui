import { useFocusWithin } from 'ahooks'
import { forwardRef, useRef, useState } from 'react'
import { uid } from 'uid'

import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import { makeSlug } from '@utils'

import { InputSlugProps } from '../types'
import { InputAddOn, InputMain, InputWrapper } from './input.style'

export const InputSlug = forwardRef<HTMLInputElement, InputSlugProps>(
  function InputSlug(
    {
      addOn = '/',
      leadingIcon,
      trailingIcon = 'lucide:link',
      danger = false,
      sizeInput,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      valueSlug,
      isError,
      ...props
    },
    forwardedRef
  ) {
    const [isFocused, setIsFocused] = useState(false)

    const [isCopyed, setIsCopyed] = useState(false)

    const focusRef = useRef(null)

    useFocusWithin(focusRef, {
      onFocus: () => {
        onFocus?.({} as any)
        setIsFocused(true)
      },
      onBlur: () => {
        onBlur?.({} as any)
        setIsFocused(false)
      },
    })

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (onFocus !== undefined) {
        onFocus(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onBlur !== undefined) {
        onBlur(e)
      }
    }

    const slug = makeSlug(valueSlug)

    const isValue = () => {
      if (slug !== value) {
        return valueSlug ?? String(value)
      }
      if (!isError) {
        return valueSlug ?? String(value)
      }
      return `${valueSlug ?? String(value)} ${uid(2)}`
    }

    const newSlug = makeSlug(isValue())

    const onClick = () => {
      if (onChange) {
        onChange({ target: { value: newSlug } } as any)
        setIsCopyed(true)
        setTimeout(() => {
          setIsCopyed(false)
        }, 500)
      }
    }

    return (
      <>
        <input
          ref={forwardedRef}
          name={name}
          value={value}
          onChange={onChange}
          hidden
          {...props}
        />
        <InputWrapper sizeInput={sizeInput} isFocused={isFocused}>
          {!!addOn && <InputAddOn sizeInput={sizeInput}>{addOn}</InputAddOn>}
          <InputMain leadingIcon={leadingIcon}>
            {!!leadingIcon && (
              <Button
                ref={focusRef}
                className="ml-1"
                icon={
                  <Icon
                    icon={!isCopyed ? leadingIcon : 'lucide-check'}
                    size="xs"
                  />
                }
                variant={!isCopyed ? 'linkGray' : 'link'}
                size="xs"
                onClick={onClick}
                danger={danger}
              />
            )}
            <input
              ref={forwardedRef}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
            {!!trailingIcon && (
              <Button
                ref={focusRef}
                className="mr-1"
                icon={
                  <Icon
                    icon={!isCopyed ? trailingIcon : 'lucide-check'}
                    size="xs"
                  />
                }
                variant={!isCopyed ? 'linkGray' : 'link'}
                size="xs"
                onClick={onClick}
                danger={danger}
              />
            )}
          </InputMain>
        </InputWrapper>
      </>
    )
  }
)
