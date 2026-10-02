import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react'
import { useClickAway } from 'ahooks'
import { isValid } from 'date-fns'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker'

import { Input } from '@nui/form'
import { DATE_DB, DATE_DISPLAY, formatDate, parseDate, today } from '@utils'

import 'react-day-picker/style.css'
import '../style.css'
import { DaterangePickerProps } from '../types'
import DatePickerIconLeft from './icon-left'
import DatePickerIconRight from './icon-right'

export const DaterangePicker = forwardRef<
  HTMLInputElement,
  DaterangePickerProps
>(function DaterangePicker(
  {
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    trigger = 'input',
    portalId,
    initialRange,
    onSelected,
    children,
    ...props
  },
  forwardedRef
) {
  const [isOpen, setIsOpen] = useState(false)

  const [toggleClickCount, setToggleClickCount] = useState(0)

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
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

  const triggerRef = refs.setReference
  const floatingRef = refs.setFloating

  // Define ref for clickaway hook
  const triggerClickRef = useRef<HTMLInputElement>(null)
  const floatingClickRef = useRef<HTMLInputElement>(null)

  useClickAway(() => {
    setIsOpen(false)
    setToggleClickCount(0)
    onBlur?.({} as any)
  }, [triggerClickRef, floatingClickRef])

  const [displayValue, setDisplayValue] = useState('')

  const [range, setRange] = useState<DateRange | undefined>(initialRange)

  const handleSelectRange: SelectRangeEventHandler = (daterange) => {
    const { from, to } = daterange || {}

    if (from && to) {
      const daterangeDb = {
        from: formatDate(from, DATE_DB),
        to: formatDate(to, DATE_DB),
      }

      setDisplayValue(
        `${formatDate(from, DATE_DISPLAY)} - ${formatDate(to, DATE_DISPLAY)}`
      )

      if (onChange) {
        onChange({ target: { value: JSON.stringify(daterangeDb) } } as any)
      }
    }
    setRange(daterange)

    if (onSelected) {
      onSelected(daterange)
    }
    onBlur?.({} as any)
  }

  useEffect(() => {
    // @todo: validate
    if (value) {
      const rangeValue = JSON.parse((value as string) ?? '')
      const { from, to } = rangeValue

      const fromDate = parseDate(from)
      const toDate = parseDate(to)

      if (isValid(fromDate) && isValid(toDate)) {
        setDisplayValue(
          `${formatDate(fromDate, DATE_DISPLAY)} - ${formatDate(
            toDate,
            DATE_DISPLAY
          )}`
        )

        setRange({ from: fromDate, to: toDate })
      }
    }

    if (initialRange && !value) {
      const { from, to } = initialRange ?? {}

      const fromDate = parseDate(from ?? '')
      const toDate = parseDate(to ?? '')

      if (isValid(fromDate) && isValid(toDate)) {
        setDisplayValue(
          `${formatDate(fromDate, DATE_DISPLAY)} - ${formatDate(
            toDate,
            DATE_DISPLAY
          )}`
        )

        setRange({ from: fromDate, to: toDate })
      }
    }
  }, [initialRange, value])

  return (
    <div>
      <input
        ref={forwardedRef}
        name={name}
        value={value ?? ''}
        onChange={() => {}}
        hidden
      />
      <div ref={triggerClickRef}>
        {trigger === 'input' ? (
          <Input
            ref={triggerRef}
            trailingIcon="lucide:calendar"
            onFocus={() => {
              setIsOpen(true)
            }}
            onBlur={() => {
              setToggleClickCount(0)
              onBlur?.({} as any)
            }}
            onClick={() => {
              setToggleClickCount((count) => count + 1)
              if (toggleClickCount > 0) {
                setIsOpen((open) => !open)
              }
            }}
            value={displayValue ?? ''}
            onChange={() => {}}
            {...props}
          />
        ) : (
          <button
            ref={triggerRef}
            type="button"
            tabIndex={0}
            onClick={() => {
              setToggleClickCount((count) => count + 1)
              setIsOpen((open) => !open)
            }}
          >
            {children}
          </button>
        )}
      </div>

      <FloatingPortal id={portalId}>
        {isOpen && (
          <div style={{ ...floatingStyles, zIndex: 9999 }} ref={floatingRef}>
            <div ref={floatingClickRef} className="w-fit h-fit">
              <DayPicker
                mode="range"
                defaultMonth={today()}
                selected={range}
                onSelect={handleSelectRange}
                components={{
                  PreviousMonthButton: (props) => (
                    <button {...props}>
                      <DatePickerIconLeft />
                    </button>
                  ),
                  NextMonthButton: (props) => (
                    <button {...props}>
                      <DatePickerIconRight />
                    </button>
                  ),
                }}
              />
            </div>
          </div>
        )}
      </FloatingPortal>
    </div>
  )
})
