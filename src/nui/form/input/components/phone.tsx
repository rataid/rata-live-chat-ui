import { parsePhoneNumber } from 'awesome-phonenumber'
import { forwardRef, useEffect, useState } from 'react'
import { OnValueChange, PatternFormat } from 'react-number-format'

import { phoneNumberFormats } from '@/constants/phone-number-format'
import Icon from '@nui/ui/icon'
import Scrollbar from '@nui/ui/scrollbar'
import Tip, { TipContent, TipTrigger } from '@nui/ui/tip'

import { InputPhoneProps } from '../types'
import { Input } from './input'
import { InputAddOn, InputIcon, InputMain, InputWrapper } from './input.style'

export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  function PatternInput(
    {
      leadingIcon,
      trailingIcon,
      danger = false,
      name,
      value,
      placeholder = '812-####-####',
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef
  ) {
    const [search, setSearch] = useState('')

    const [phoneNumber, setPhoneNumber] = useState(value)

    const [format, setFormat] = useState<any>({
      code: '62',
    })

    const [resetInput, setResetInput] = useState(false)

    const [open, setOpen] = useState(false)

    const [isFocused, setIsFocused] = useState(false)

    const getNumber = parsePhoneNumber(`+${value as string}`)

    const codePhone = format?.code

    const removeCountryCode = (phone?: string) => {
      return phone?.replace(
        new RegExp(`^(${codePhone}${codePhone}|${codePhone})`),
        ''
      )
    }

    const onValueChange: OnValueChange = ({ floatValue }) => {
      setPhoneNumber(floatValue !== undefined ? floatValue.toString() : '')
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      setResetInput(false)
      setOpen(false)
      if (onFocus !== undefined) {
        onFocus(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onChange) {
        onChange({
          target: {
            value: phoneNumber
              ? `${codePhone}${removeCountryCode(phoneNumber?.toString())}`
              : '',
          },
        } as any)
      }
      if (onBlur !== undefined) {
        onBlur(e)
      }
    }

    useEffect(() => {
      if (getNumber.countryCode !== undefined) {
        setFormat({ code: String(getNumber.countryCode) })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (onChange) {
        onChange({
          target: {
            value: phoneNumber
              ? `${codePhone}${removeCountryCode(phoneNumber?.toString())}`
              : '',
          },
        } as any)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumber, onChange])

    const items =
      phoneNumberFormats.filter(
        (item) =>
          !search || item.country.toLowerCase().includes(search.toLowerCase())
      ) ?? []

    return (
      <>
        <input
          ref={forwardedRef}
          name={name}
          value={value}
          onChange={() => {}}
          hidden
          {...props}
        />
        <Tip
          open={open}
          placement="bottom-start"
          onOpenChange={() => setOpen(false)}
        >
          <TipTrigger>
            <InputWrapper isFocused={isFocused}>
              <InputAddOn onClick={() => setOpen(true)}>
                +{codePhone} <Icon size="sm" icon="lucide:chevron-down" />
              </InputAddOn>

              <InputMain leadingIcon={leadingIcon}>
                {!!leadingIcon && (
                  <InputIcon isFocused={isFocused} danger={danger}>
                    <Icon icon={leadingIcon} size="xs" />
                  </InputIcon>
                )}
                <PatternFormat
                  // key={String(isFocused)}
                  value={
                    !resetInput
                      ? removeCountryCode(phoneNumber?.toString())
                      : ''
                  }
                  format="###-####-########"
                  placeholder={placeholder}
                  onValueChange={onValueChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={!format}
                  name={`${name}-pattern`}
                />
                {!!trailingIcon && (
                  <InputIcon isFocused={isFocused} danger={danger}>
                    <Icon icon={trailingIcon} size="xs" />
                  </InputIcon>
                )}
              </InputMain>
            </InputWrapper>
          </TipTrigger>
          <TipContent>
            <div tw="xl:w-[26.875rem] bg-white text-gray-200 border border-gray-200 rounded-lg">
              <div tw="px-4 py-3 border-b border-gray-200">
                <Input
                  leadingIcon="lucide:search"
                  placeholder="Search country"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Scrollbar maxHeight={280} positionTrack="0rem">
                {items.length > 0 ? (
                  items.map((item) => (
                    <button
                      type="button"
                      key={item.country}
                      onClick={() => {
                        setFormat(item)
                        setOpen(false)
                        setSearch('')
                        setResetInput(true)
                      }}
                      tw="py-2.5 px-4 flex w-full hover:bg-gray-50 items-center gap-1 text-sm font-medium"
                    >
                      <div tw="text-gray-700">{item.country}</div>
                      <div tw="text-gray-400">+{item.code}</div>
                    </button>
                  ))
                ) : (
                  <div tw="py-2 px-3 leading-10 text-center text-xs text-gray-500">
                    No results found
                  </div>
                )}
              </Scrollbar>
            </div>
          </TipContent>
        </Tip>
      </>
    )
  }
)
