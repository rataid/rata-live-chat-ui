import { useResponsive } from 'ahooks'
import { format, isValid } from 'date-fns'
import { UseSelectStateChange } from 'downshift'
import { forwardRef, useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'

import { Input } from '@nui/form'
import Button from '@nui/ui/button'
import Tooltip from '@nui/ui/tooltip'
import {
  DATETIME_DB,
  DATETIME_ISO,
  formatDate,
  formatDatetime,
  padNumberStart,
  parseDate,
  setTimeInTimeZone,
} from '@utils'

import { DatetimePickerProps, TimeSelectProps } from '../types'
import DatetimePickerHourSelect from './datetime-picker/hour-select'
import DatetimePickerMinuteSelect from './datetime-picker/minute-select'
import DatePickerIconLeft from './icon-left'
import DatePickerIconRight from './icon-right'
import DateSelect from './select'

export const DatetimePicker = forwardRef<HTMLInputElement, DatetimePickerProps>(
  function DatetimePicker(
    {
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      trigger = 'input',
      portalId,
      disabledDays,
      timeZone = 'Asia/Jakarta',
      children,
      ...props
    },
    forwardedRef
  ) {
    const { sm } = useResponsive()

    const [isOpen, setIsOpen] = useState(false)

    const [hourValue, setHourValue] = useState<string>('00')

    const [minuteValue, setMinuteValue] = useState<string>('00')

    const [inputValue, setInputValue] = useState('')

    const [displayValue, setDisplayValue] = useState('')

    const [selected, setSelected] = useState<string>()

    const handleDateSelect = (date?: Date) => {
      if (date) {
        const dateTime = setTimeInTimeZone(timeZone, date)
        setSelected(dateTime)
        setHourValue('00')
        setMinuteValue('00')
      }
    }

    const handleHourSelectChange = (
      e: UseSelectStateChange<TimeSelectProps>
    ) => {
      const hour = e.selectedItem?.value

      if (!hour) return

      if (!selected) {
        setHourValue(hour)
        return
      }

      const timeSelected = setTimeInTimeZone(
        timeZone,
        parseDate(selected),
        hour,
        minuteValue
      )

      setSelected(timeSelected)
      setHourValue(hour)
    }

    const handleMinuteSelectChange = (
      e: UseSelectStateChange<TimeSelectProps>
    ) => {
      const minute = e.selectedItem?.value

      if (!minute) return

      if (!selected) {
        setMinuteValue(minute)
        return
      }

      const timeSelected = setTimeInTimeZone(
        timeZone,
        parseDate(selected),
        hourValue,
        minute
      )

      setSelected(timeSelected)
      setMinuteValue(minute)
    }

    const onSubmit = () => {
      if (selected) {
        setInputValue(new Date(selected).toISOString())
        setDisplayValue(formatDatetime(new Date(selected), DATETIME_DB))
        setIsOpen(false)
        if (onChange) {
          onChange({
            target: { value: new Date(selected).toISOString() },
          } as any)
        }
      }
    }

    useEffect(() => {
      const initialDate = value ? new Date(value as string) : null
      if (initialDate && isValid(initialDate)) {
        const formattedDate = format(initialDate, DATETIME_ISO)
        const hour = new Date(formattedDate).getHours()
        const minute = new Date(formattedDate).getMinutes()
        setDisplayValue(formatDate(initialDate, DATETIME_DB))
        setSelected(formattedDate)
        setHourValue(padNumberStart(hour))
        setMinuteValue(padNumberStart(minute))
      } else {
        setInputValue('')
        setDisplayValue('')
        setSelected(undefined)
        setHourValue('00')
        setMinuteValue('00')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div className="shrink-0">
        <input
          ref={forwardedRef}
          name={name}
          value={inputValue ?? ''}
          onChange={() => {}}
          hidden
        />
        <Tooltip
          open={isOpen}
          onOpenChange={setIsOpen}
          isMobile={!sm}
          content={
            <div className="w-fit h-fit mx-auto">
              <div className="py-4 px-5">
                <DayPicker
                  captionLayout="dropdown"
                  classNames={{
                    root: 'rdp-time',
                    months: 'rdp-time-months',
                    caption: 'rdp-time-caption',
                  }}
                  mode="single"
                  disabled={disabledDays}
                  fromYear={Number(new Date().getFullYear()) - 100}
                  toYear={Number(new Date().getFullYear()) + 5}
                  selected={selected ? new Date(selected) : undefined}
                  defaultMonth={selected ? new Date(selected) : undefined}
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
                />
              </div>
              <div className="flex items-center gap-x-2 py-4 px-5 text-start border-t border-gray-200">
                <div className="w-full text-base font-medium">Time</div>
                <div className="flex items-center gap-x-2">
                  <DatetimePickerHourSelect
                    value={hourValue}
                    disabled={!selected}
                    onSelectedItemChange={handleHourSelectChange}
                  />
                  <DatetimePickerMinuteSelect
                    value={minuteValue}
                    disabled={!selected}
                    onSelectedItemChange={handleMinuteSelectChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-3 py-4 px-5">
                <Button
                  size="sm"
                  variant="secondaryGray"
                  wider="full"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  wider="full"
                  disabled={!selected}
                  onClick={onSubmit}
                >
                  Apply
                </Button>
              </div>
            </div>
          }
        >
          <div>
            {trigger === 'input' ? (
              <Input
                trailingIcon="lucide:calendar"
                disabled={isOpen}
                onBlur={() => onBlur?.({} as any)}
                value={displayValue ?? ''}
                onClick={() => setIsOpen(true)}
                onChange={() => {}}
                {...props}
              />
            ) : (
              <button
                type="button"
                tabIndex={0}
                onClick={() => {
                  setIsOpen((open) => !open)
                }}
              >
                {children}
              </button>
            )}
          </div>
        </Tooltip>
      </div>
    )
  }
)
