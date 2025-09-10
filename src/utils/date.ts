import {
  differenceInDays,
  differenceInHours,
  format,
  isValid,
  parse,
  parseISO,
} from 'date-fns'
import { format as formatTz, utcToZonedTime } from 'date-fns-tz'
import { enUS } from 'date-fns/locale'

// Date format for display
export const DATE_DISPLAY = 'dd/MM/y'

export const DATE_WORD = 'dd MMMM y'

export const DATETIME_DISPLAY = 'dd/MM/y HH:mm'

export const DATE_DB = 'yyyy-MM-dd'

export const DATETIME_DB = 'yyyy-MM-dd HH:mm'

export const DATE_LOCALE = enUS

// eslint-disable-next-line quotes
export const DATETIME_ISO = "yyyy-MM-dd'T'HH:mm:ssXXX"

// Get today date
export const today = () => {
  return new Date()
}

// Get yesterday date
export const yesterday = () => {
  const date = today()
  date.setDate(date.getDate() - 1)
  return date
}

// Get tomorrow date
export const tomorrow = () => {
  const date = today()
  date.setDate(date.getDate() + 1)
  return date
}

// Format string date to date only with zero timezone
export const formatDateOnly = (strDate: string) => {
  if (!strDate) return ''
  return `${strDate}T00:00:00.000Z`
}

// Format date to string based on DATE_FORMAT
export const formatDatetime = (date?: Date, datetimeFormat = DATE_DISPLAY) => {
  if (!date) return ''

  const parsedIso = parseISO(date.toISOString())
  const formated = format(parsedIso, datetimeFormat)

  return formated
}

// Parse javascript date to date only without timezone
export const formatDate = (date?: Date, dateFormat = DATE_DISPLAY) => {
  if (!date) return ''

  const dateToIso = date.toISOString()
  const parsedIso = parseISO(dateToIso)
  const formated = `${format(parsedIso, dateFormat)}`

  return formated
}

// Format date to date only ISO string
// Timezone is set to 00:00:00.000Z
export const formatDateISO = (date?: Date) => {
  if (!date) return ''

  const dateToIso = date.toISOString()
  const parsedIso = parseISO(dateToIso)
  const formated = `${format(parsedIso, 'yyyy-MM-dd')}T00:00:00.000Z`

  return formated
}

// Parse javascript date to date only without timezone
// Return date object with timezone set to 00:00:00.000Z
export const parseDate = (date: Date | string) => {
  let toParsedDate = null
  if (typeof date === 'string') {
    toParsedDate = new Date(date)
  } else {
    toParsedDate = date
  }

  if (isValid(toParsedDate)) {
    const dateToIso = formatDate(toParsedDate)

    const parsedIso = parse(dateToIso, DATE_DISPLAY, today())

    return parsedIso
  }

  return undefined
}

// Parse date from string based on DATE_FORMAT
// Default format is DATE_DISPLAY
// Main purpose is to parse date from input with DATE_DISPLAY format
export const parseDatetime = (
  strDate: string,
  datetimeFormat = DATE_DISPLAY
) => {
  const parsedDate = parse(strDate, datetimeFormat, today())

  return parsedDate
}

// Check if the date is valid
// dddd/MM/yyyy or dd-MM-yyyy
export const isValidDisplayDate = (strDate: string) => {
  const pattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/g
  return pattern.test(strDate)
}

// Get date list n days before today and n days after today
// Format date to date only without timezone
export const dateSlideItems = (centerDate: Date, dayNums: number) => {
  const dateList = []
  for (let i = dayNums; i >= 1; i -= 1) {
    const date = new Date(centerDate)
    date.setDate(date.getDate() - i)
    dateList.push(date)
  }
  dateList.push(centerDate)

  for (let i = 1; i <= dayNums; i += 1) {
    const date = new Date(centerDate)
    date.setDate(date.getDate() + i)
    dateList.push(date)
  }

  // format date to date only without timezone
  dateList.forEach((date, index) => {
    dateList[index] = parseDate(date)
  })

  return dateList
}

// Get day name from date
export const dayname = (date: Date, formatDay = 'EEEE') => {
  const dayName = format(date, formatDay, { locale: DATE_LOCALE })
  return dayName
}

// Get date and month name from date
export const dateMonth = (date: Date, formatDateMonth = 'dd MMMM') => {
  const dateMonthName = format(date, formatDateMonth, { locale: DATE_LOCALE })
  return dateMonthName
}

// Add or subtract date
export const addDate = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

// Generate half hour list
export const halfHourList = (): number[] => {
  const list: number[] = []
  for (let i = 0; i <= 47; i += 1) {
    list.push(i)
  }
  return list
}

// Earliest and latest displayed operation half hour
// Defined and hardcoded as 09.00 - 22.00
export const isOperationalHour = (slotHour?: number) => {
  if (!slotHour) return false

  return slotHour >= 16 && slotHour <= 44
}

// Split half hours list into 3 chunks
// 1st chunk: 0 - 26
// 2nd chunk: 26 - 35
// 2nd chunk: 36 - 47
export const splitHalfHoursNum = (
  list: number[],
  hideNonOperational = true
) => {
  const firstChunk = list.slice(0, 26)
  const secondChunk = list.slice(26, 36)
  const thirdChunk = list.slice(36, 47)

  if (hideNonOperational) {
    const firstChunkFiltered = firstChunk.filter((halfHourNum) =>
      isOperationalHour(halfHourNum)
    )

    const secondChunkFiltered = secondChunk.filter((halfHourNum) =>
      isOperationalHour(halfHourNum)
    )

    const thirdChunkFiltered = thirdChunk.filter((halfHourNum) =>
      isOperationalHour(halfHourNum)
    )

    return [firstChunkFiltered, secondChunkFiltered, thirdChunkFiltered]
  }

  return [firstChunk, secondChunk, thirdChunk]
}

// Convert half hour sequence from 0 to 47 into readable time format
// 0 -> 00:00
// 1 -> 00:30
// 2 -> 01:00
// ...
export const halfHourToTime = (halfHour: number) => {
  const hour = Math.floor(halfHour / 2)
  const minute = halfHour % 2 === 0 ? '00' : '30'

  return `${hour.toString().padStart(2, '0')}.${minute}`
}

export const prettierDays = (days: number): string => {
  if (days < 0) return ''

  const years = Math.floor(days / 365)
  const remainingDaysAfterYears = days % 365

  const months = Math.floor(remainingDaysAfterYears / 30) // Approximate months
  const remainingDaysAfterMonths = remainingDaysAfterYears % 30

  const weeks = Math.floor(remainingDaysAfterMonths / 7)
  const remainingDays = remainingDaysAfterMonths % 7

  let result = ''

  if (years > 0) {
    result += `${years} ${years === 1 ? 'year' : 'years'}`
  }

  if (months > 0) {
    if (result) result += ' '
    result += `${months} ${months === 1 ? 'month' : 'months'}`
  }

  if (weeks > 0) {
    if (result) result += ' '
    result += `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`
  }

  if (remainingDays > 0 || result === '') {
    if (result) result += ' '
    result += `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`
  }

  return result
}

export const formatTimeDifference = (date?: string) => {
  if (!date) return {}

  const generatedDate = parseISO(date)
  const currentDate = new Date()

  const diffDays = differenceInDays(generatedDate, currentDate)
  const diffHours = differenceInHours(generatedDate, currentDate) % 24

  const afterDiffDays = differenceInDays(currentDate, generatedDate)
  const afterDiffHours = differenceInHours(currentDate, generatedDate) % 24

  const formatDiff = (days: number, hours: number) => {
    let result = days > 0 ? prettierDays(days) : ''
    if (hours > 0) {
      result += `${result ? ' ' : ''}${hours} hour${hours === 1 ? '' : 's'}`
    }
    return result
  }

  return {
    timeAgo: formatDiff(diffDays, diffHours),
    afterTimeAgo: formatDiff(afterDiffDays, afterDiffHours),
  }
}

export const setTimeInTimeZone = (
  timeZone: string,
  date?: Date,
  newHour?: string,
  newMinute?: string
) => {
  if (!date) return ''

  const newHourStr = newHour ?? '00'
  const newMinuteStr = newMinute ?? '00'
  const zonedDate = utcToZonedTime(date, timeZone)
  zonedDate.setHours(parseInt(newHourStr, 10))
  zonedDate.setMinutes(parseInt(newMinuteStr, 10))

  return formatTz(zonedDate, DATETIME_ISO, {
    timeZone,
  })
}
