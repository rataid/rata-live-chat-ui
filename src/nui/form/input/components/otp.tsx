import { forwardRef, useRef } from 'react'

import { InputOtpProps } from '../types'
import { InputOtpBox, InputOtpWrapper } from './input.style'

export const InputOtp = forwardRef<HTMLInputElement, InputOtpProps>(
  function InputOtp(
    {
      length = 6,
      name,
      value = '',
      danger = false,
      disabled,
      autoFocus,
      onChange,
      onBlur,
    },
    forwardedRef
  ) {
    const boxRefs = useRef<Array<HTMLInputElement | null>>([])

    const digits = Array.from({ length }, (_, i) => value[i] ?? '')

    const focusBox = (index: number) => {
      const box = boxRefs.current[Math.max(0, Math.min(index, length - 1))]
      box?.focus()
      box?.select()
    }

    // Write `input` starting at `index`, used for typing, paste and SMS autofill
    const fill = (index: number, input: string) => {
      const chars = input.replace(/\D/g, '').slice(0, length - index)

      if (!chars) return

      const next = [...digits]
      chars.split('').forEach((char, i) => {
        next[index + i] = char
      })

      onChange?.(next.join(''))
      focusBox(index + chars.length)
    }

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        const next = [...digits]

        if (next[index]) {
          next[index] = ''
        } else if (index > 0) {
          next[index - 1] = ''
          focusBox(index - 1)
        }

        onChange?.(next.join(''))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        focusBox(index - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        focusBox(index + 1)
      }
    }

    return (
      <>
        <input ref={forwardedRef} name={name} value={value} readOnly hidden />
        <InputOtpWrapper
          style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
        >
          {digits.map((digit, index) => (
            <InputOtpBox
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ref={(el) => {
                boxRefs.current[index] = el
              }}
              danger={danger}
              value={digit}
              disabled={disabled}
              inputMode="numeric"
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocus && index === 0}
              aria-label={`OTP digit ${index + 1}`}
              onFocus={(e) => e.target.select()}
              onChange={(e) => fill(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => {
                e.preventDefault()
                fill(index, e.clipboardData.getData('text'))
              }}
              onBlur={onBlur}
            />
          ))}
        </InputOtpWrapper>
      </>
    )
  }
)
