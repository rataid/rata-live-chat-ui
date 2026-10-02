import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import { cn } from '@utils/cn'
import { isValid } from 'date-fns'
import { ChangeEvent, forwardRef, useEffect, useState } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import { shallow } from 'zustand/shallow'

import { Input, useFormControl } from '@nui/form'
import {
  DATE_DB,
  formatDate,
  formatDatetime,
  isValidDisplayDate,
  parseDate,
  parseDatetime,
} from '@utils'

import '../style.css'
import { DatePickerProps } from '../types'
import DatePickerIconLeft from './icon-left'
import DatePickerIconRight from './icon-right'
import DateSelect from './select'

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(
    {
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      trigger = 'input',
      showError = true,
      portalId,
      disabledDays,
      children,
      ...props
    },
    forwardedRef
  ) {
    const [isOpen, setIsOpen] = useState(false)
    const defaultClassNames = getDefaultClassNames()

    const [setError] = useFormControl((s) => [s.setError], shallow)

    const { refs, floatingStyles, context } = useFloating({
      placement: 'bottom-start',
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(5),
        flip({ padding: 10 }),
        size({
          apply({ elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
            })
          },
        }),
      ],
    })

    const dismiss = useDismiss(context, {
      outsidePressEvent: 'mousedown',
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss])

    const triggerRef = refs.setReference
    const floatingRef = refs.setFloating

    const [inputValue, setInputValue] = useState('')

    const [displayValue, setDisplayValue] = useState('')

    const [selected, setSelected] = useState<Date>()

    const handleDisplayChange = (e: ChangeEvent<HTMLInputElement>) => {
      setIsOpen(false)

      const date = parseDatetime(e.currentTarget.value)

      if (isValid(date)) {
        setSelected(date)
        if (onChange) {
          onChange({ target: { value: date.toISOString() } } as any)
          setInputValue(date.toISOString())
        }
      } else {
        setSelected(undefined)
        if (onChange) {
          onChange({ target: { value: e.currentTarget.value } } as any)
          setInputValue('')
        }
      }
      setDisplayValue(e.currentTarget.value)
    }

    const handleDateSelect = (date?: Date) => {
      if (date) {
        const dateOnly = parseDate(date)
        setSelected(dateOnly)
        setDisplayValue(formatDatetime(dateOnly))
        if (onChange) {
          const dbDate = formatDate(dateOnly, DATE_DB)
          onChange({ target: { value: dbDate } } as any)
          setInputValue(dbDate)
        }
        setIsOpen(false)
      }
    }

    useEffect(() => {
      const initialDate = parseDate(value as string)
      if (isValid(initialDate)) {
        setInputValue(formatDate(initialDate, DATE_DB))
        setSelected(initialDate)
        setDisplayValue(formatDatetime(initialDate))
      } else {
        setInputValue('')
        setDisplayValue('')
        setSelected(undefined)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    useEffect(() => {
      // Trigger warning if date is invalid format
      // This error only shows warning, not validation error
      if (setError && showError) {
        if (!isValidDisplayDate(displayValue)) {
          setError({
            message: 'Invalid date format (dd/mm/yyyy)',
          })
        } else {
          setError(null)
        }
      }
    }, [displayValue, showError, setError])

    return (
      <div>
        <input
          ref={forwardedRef}
          name={name}
          value={inputValue}
          onChange={() => {}}
          hidden
        />
        <div>
          {trigger === 'input' ? (
            <Input
              ref={triggerRef}
              trailingIcon="lucide:calendar"
              onFocus={() => {
                setIsOpen(true)
              }}
              onBlur={() => onBlur?.({} as any)}
              value={displayValue}
              onChange={handleDisplayChange}
              {...props}
              {...getReferenceProps()}
            />
          ) : (
            <button
              ref={triggerRef}
              type="button"
              tabIndex={0}
              onClick={() => {
                setIsOpen((open) => !open)
              }}
              {...getReferenceProps()}
            >
              {children}
            </button>
          )}
        </div>

        <FloatingPortal id={portalId}>
          {isOpen && (
            <div
              className="relative"
              style={{ ...floatingStyles, zIndex: 9999 }}
              ref={floatingRef}
              {...getFloatingProps()}
            >
              <div className="w-fit h-fit">
                <DayPicker
                  captionLayout="dropdown"
                  mode="single"
                  disabled={disabledDays}
                  fromYear={Number(new Date().getFullYear()) - 100}
                  toYear={Number(new Date().getFullYear()) + 5}
                  selected={selected}
                  defaultMonth={selected}
                  onSelect={handleDateSelect}
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
                    Dropdown: DateSelect,
                  }}
                  className={cn(
                    'group/calendar bg-background p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
                    String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                    String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`
                  )}
                  classNames={{
                    today: cn(
                      'bg-primary-300 text-primary-foreground rounded-md data-[selected=true]:rounded-sm',
                      defaultClassNames.today
                    ),
                    selected: cn(defaultClassNames.selected, '!text-xs'),
                  }}
                />
              </div>
            </div>
          )}
        </FloatingPortal>
      </div>
    )
  }
)
