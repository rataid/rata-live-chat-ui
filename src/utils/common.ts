import { parsePhoneNumber } from 'awesome-phonenumber'
import { intervalToDuration, parse } from 'date-fns'
import {
  assign,
  camelCase,
  capitalize,
  each,
  every,
  has,
  isEmpty,
  isNil,
  kebabCase,
  lowerCase,
  mapValues,
  padStart,
  startCase,
  upperFirst,
} from 'lodash'
import isSlugify from 'slugify'

import notify from '@nui/hooks/use-notif'

export const key = (obj: unknown) => {
  return Symbol(JSON.stringify(obj)).toString()
}

export const titleCase = (str?: string | null) => {
  if (!str) return ''

  return startCase(lowerCase(str))
}

export const pascalCase = (str: string) => {
  return startCase(camelCase(str)).replace(/ /g, '')
}

export const slugify = (str?: string) => {
  return kebabCase(str)
}

export const snakeCase = (text: string) => {
  return text.toLowerCase().trim().replace(/\s+/g, '_')
}

// Get enum value from slug string
// Example: slugEnum(YourEnum, 'your-slug')
// Returns: YourEnum.YourSlug
export const slugEnum = <T>(enumName: T, str?: string) => {
  if (!str) return undefined

  const enumKey = upperFirst(camelCase(str)) as keyof T
  return enumName[enumKey]
}

export const enumKey = <T>(enumName: T, str?: number) => {
  if (!str) return undefined

  const enumMappings: { [key: number]: string } = {}
  const enums = enumName as keyof T

  Object.entries(enums).forEach(([el, val]) => {
    enumMappings[val] = el
  })

  return enumMappings[str]
}

// Format number
export const formatNumber = (num: number) => {
  return num.toLocaleString('id-ID')
}

export const throwError = (code: number, message?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw new Response(message, {
    status: code,
  })
}

/* Convert number to sort string format */
export const prettyNumber = (number: number, digits = 1) => {
  const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  let decimal

  // eslint-disable-next-line no-plusplus
  for (let i = units.length - 1; i >= 0; i--) {
    decimal = 1000 ** (i + 1)

    if (number <= -decimal || number >= decimal) {
      return +(number / decimal).toFixed(digits) + units[i]
    }
  }

  return number
}

// Format currency, default to IDR
export const currency = (num?: number, amountOnly = true) => {
  if (num === null || num === undefined) {
    return 0
  }

  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }

  if (!amountOnly) {
    assign(options, { style: 'currency', currency: 'IDR' })
  }

  return num?.toLocaleString('id-ID', options)
}

export function randomString(length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export function jsonStringify(obj: any) {
  return JSON.stringify(obj, null, 2)
}

/**
 * Parse a localized number to a float.
 * @param {string} stringNumber - the localized number
 * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 */
export function parseLocaleNumber(stringNumber: string, locale = 'id-ID') {
  const thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, '')
  const decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, '')

  return parseFloat(
    stringNumber
      .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
      .replace(new RegExp(`\\${decimalSeparator}`), '.')
  )
}

// Clean nullable value from GraphQL result
// to meet react input value/defaultValue requirement
export function formValues<T extends object | null | undefined>(values: T): T {
  return mapValues(values, (v) => (isNil(v) ? '' : v)) as T
}

export const formValue = (v: any) => {
  return isNil(v) ? '' : v
}

// Parse data from schema parse result
// Replace value with parsed JSON if key exists
export const parseData = <T>(obj: any, ...keys: string[]) => {
  keys.forEach((k) => {
    if (!has(obj, k)) throw new Error('Wrong object keys!')

    obj[k] = JSON.parse(obj[k])
  })

  return obj as T
}

// Leading zero for number
export const leadingZero = (num: number, length = 2) => {
  return num.toString().padStart(length, '0')
}

// Pretty phone/mobile number
export const prettyPhone = (
  mobile?: string,
  format?:
    | 'input'
    | 'international'
    | 'national'
    | 'e164'
    | 'rfc3966'
    | 'significant'
) => {
  if (!mobile) return ''
  if (!mobile.startsWith('+')) {
    // eslint-disable-next-line no-param-reassign
    mobile = `+${mobile}`
  }

  const parseNumber = parsePhoneNumber(mobile)

  if (!parseNumber?.number?.[format || 'national']) {
    return mobile
  }

  return parseNumber?.number?.[format || 'national']
}

export const prettyAge = (date?: string) => {
  if (!date) return ''

  const birthDate = parse(date, 'yyyy-MM-dd', new Date())

  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  })

  const age = `${years}yrs, ${months}mo, ${days}days`

  return age
}

// Filter array based on predicate function
// and return filtered values
// and mutate original array
export const filterpop = (arr: any[], fn: any) => {
  const filteredValues = []
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (fn(arr[i])) {
      filteredValues.push(arr.splice(i, 1)[0])
    }
  }
  return filteredValues
}

// Iterate nested collection
// and apply function to each item
const iterate = (collection: any, fn: any) => {
  each(collection, function nested(model) {
    if (model.children.length > 0) {
      iterate(model.children, fn)
    } else {
      fn(model)
    }
  })
}

// Convert flat array to tree
// Based on path property with dot notation (used in PostgreSQL ltree)
export const toTree = <T extends { path?: any; children?: T[] }>(list: T[]) => {
  const children = function makeChildren(this: any, pathName: string) {
    const x = this[pathName] || (this[pathName] = [])

    return x
  }.bind({})

  list.forEach((item) => {
    if (item.path) {
      children(item.path.replace(/(^|\.)\w+$/g, '')).push({
        ...item,
        children: children(item.path),
      })
    }
  })

  const result = children('')

  iterate(result, (obj: T) => {
    if (obj.children?.length === 0) {
      delete obj.children
    }
  })

  return result
}

// Check if at least one of the element is empty
export const allEmpty = (...args: any[]) => {
  return every(args, isEmpty)
}

// Split arrays into n chunks
export const toNumOfChunks = <T>(arr: T[], n: number) => {
  const result = []
  const chunkSize = Math.ceil(arr.length / n)

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }

  return result
}

export const buildStaffTitle = (staff: any) => {
  if (!staff) return ''

  if (staff?.academicTitle && staff?.academicDegree) {
    return `${staff.academicTitle} ${staff.name} ${staff.academicDegree}`
  }
  if (staff?.academicTitle) {
    return `${staff.academicTitle} ${staff.name}`
  }
  if (staff?.academicDegree) {
    return `${staff.name} ${staff.academicDegree}`
  }
  return staff.name
}

// get Gql error message
export const gqlErrorMessage = (error: any) => {
  const parsedError = JSON.parse(JSON.stringify(error?.message || error))

  let message = 'Internal Server Error'
  let errorCode = 'INTERNAL_SERVER_ERROR'
  let statusCode = 500

  if (parsedError?.response?.errors) {
    const e = parsedError.response.errors[0]
    message = capitalize(e?.originalError?.message || e?.message)
    errorCode = e?.extensions?.code
    statusCode = e?.extensions?.originalError?.statusCode || 500
  } else if (error?.message) {
    message = error.message
  }

  if (typeof message === 'string') {
    const index = message.indexOf('{"')
    if (index > -1) {
      const strObj = message.substring(index, message.length)

      const parsedObj = JSON.parse(strObj)

      if (parsedObj?.response?.errors) {
        const e = parsedObj.response.errors[0]
        message = capitalize(e?.originalError?.message || e?.message)
        errorCode = e?.extensions?.code
        statusCode = e?.extensions?.originalError?.statusCode || 500
      }
    }
  }

  if (message.toLocaleLowerCase().includes('connect econnrefused')) {
    errorCode = 'SERVICE_UNAVAILABLE'
    statusCode = 503
  } else if (message.toLocaleLowerCase().includes('network request failed')) {
    errorCode = 'GATEWAY_TIMEOUT'
    statusCode = 504
  } else if (message.toLocaleLowerCase().includes('auth')) {
    errorCode = 'UNAUTHORIZED'
    statusCode = 401
  }

  return {
    message,
    errorCode,
    statusCode,
  }
}

// fake async function
export const fakeAsync = (timeout = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })
}

// Convert enum to array of keys
export function enumKeys(E: any): string[] {
  return Object.keys(E).filter((k) => Number.isNaN(Number(k)))
}

// Convert enum to array of values
export function enumValues(E: any): string[] | number[] {
  return enumKeys(E).map((k) => E[k as any])
}

export function readNumber(value: number): string {
  const mathValue = Math.abs(value)
  let simpanNilaiBagi = 0
  const huruf = [
    '',
    'Satu',
    'Dua',
    'Tiga',
    'Empat',
    'Lima',
    'Enam',
    'Tujuh',
    'Delapan',
    'Sembilan',
    'Sepuluh',
    'Sebelas',
  ]
  let temp = ''

  if (mathValue < 12) {
    temp = ` ${huruf[mathValue]}`
  } else if (mathValue < 20) {
    temp = `${readNumber(mathValue - 10)} Belas`
  } else if (mathValue < 100) {
    simpanNilaiBagi = Math.floor(mathValue / 10)
    temp = `${readNumber(simpanNilaiBagi)} Puluh${readNumber(mathValue % 10)}`
  } else if (mathValue < 200) {
    temp = ` Seratus${readNumber(mathValue - 100)}`
  } else if (mathValue < 1000) {
    simpanNilaiBagi = Math.floor(mathValue / 100)
    temp = `${readNumber(simpanNilaiBagi)} Ratus${readNumber(mathValue % 100)}`
  } else if (mathValue < 2000) {
    temp = ` Seribu${readNumber(mathValue - 1000)}`
  } else if (mathValue < 1000000) {
    simpanNilaiBagi = Math.floor(mathValue / 1000)
    temp = `${readNumber(simpanNilaiBagi)} Ribu${readNumber(mathValue % 1000)}`
  } else if (mathValue < 1000000000) {
    simpanNilaiBagi = Math.floor(mathValue / 1000000)
    temp = `${readNumber(simpanNilaiBagi)} Juta${readNumber(
      mathValue % 1000000
    )}`
  } else if (mathValue < 1000000000000) {
    simpanNilaiBagi = Math.floor(mathValue / 1000000000)
    temp = `${readNumber(simpanNilaiBagi)} Miliar${readNumber(
      mathValue % 1000000000
    )}`
  } else if (mathValue < 1000000000000000) {
    simpanNilaiBagi = Math.floor(mathValue / 1000000000000)
    temp = `${readNumber(mathValue / 1000000000000)} Triliun${readNumber(
      mathValue % 1000000000000
    )}`
  }

  return temp
}

export const makeSlug = (str?: string, obj?: any): string => {
  if (!str) return ''

  const value = isSlugify(
    str,
    assign(
      {
        replacement: '-',
        lower: true,
        remove: /[*+~.()//'"!:@#]/g,
      },
      obj
    )
  )
  return value
}

export const stripBracketTag = (str?: string, tag = 'system') => {
  if (!str) return ''

  const newRegex = new RegExp(`\\[${tag}\\]({.*?})\\[\\/${tag}\\]`)

  return str.replace(newRegex, '')
}

export const parseBracketTag = (str?: string, tag = 'system') => {
  if (!str) return ''

  const newRegex = new RegExp(`\\[${tag}\\]({.*?})\\[\\/${tag}\\]`)

  const match = str.match(newRegex)
  const jsonString = match?.[1].replace(/'/g, '"')
  const obj = JSON.parse(jsonString ?? '{}')

  return obj
}

export const formatBytes = (bytes?: number, decimals = 2) => {
  if (!bytes) return '0 Kb'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export const prettyPrice = (number: number, locale = 'en'): string => {
  if (number === 0) return ''

  const formatter = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  })
  return formatter.format(number)
}

export const removeVowel = (str?: string): string => {
  if (!str) return ''

  const vowels = /^[aeiouAEIOU]+/
  const match = str.match(vowels)

  const firstPart = match ? match[0] : ''
  const restOfString = str.slice(firstPart.length)

  // Menghapus vokal dari sisa string
  const result = restOfString.replace(/[aeiouAEIOU]/g, '')

  // Mengembalikan vokal awal + sisa string tanpa vokal
  return firstPart + result
}

export const checkStatusEnumExists = (
  permissionNames: string[],
  permissionStatusMaps: { [key: string]: string }
) => {
  if (
    !permissionNames.every((k) => Object.keys(permissionStatusMaps).includes(k))
  ) {
    throwError(404)
  }
}

export const padNumberStart = (num?: number, length = 2, char = '0') => {
  return padStart(String(num ?? 0), length, char)
}

export const notifySuccess = (message: string) =>
  notify({
    title: 'Success',
    message,
    type: 'success',
  })

export const maskEmail = (email?: string | null) => {
  if (!email) return ''

  const [local, domain] = email.split('@')

  if (!local || !domain) return email

  const last = local.length > 1 ? local.at(-1) : ''

  return `${local[0]}***${last}@${domain}`
}

// 6285712341234 -> +6285***234
export const maskPhone = (phone?: string | null) => {
  if (!phone) return ''

  const digits = phone.replace(/\D/g, '')

  if (digits.length < 8) return `+${digits}`

  return `+${digits.slice(0, 4)}***${digits.slice(-3)}`
}
