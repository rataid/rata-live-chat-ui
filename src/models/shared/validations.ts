import { startCase } from 'lodash'
import { LiteralToPrimitive } from 'type-fest'
import { z } from 'zod'

import { DATE_DB, enumValues, formatDate, zu } from '@utils'

// Helper functions
export const allowEmpty = <T extends z.ZodTypeAny>(schema: T) => {
  return schema.or(z.literal('')).transform((v) => (v === '' ? undefined : v))
}

export const allowNull = <T extends z.ZodTypeAny>(schema: T) => {
  return schema
    .or(z.literal(''))
    .transform((v) => (v === '' || v === undefined ? null : v))
}

export const allowZero = <T extends z.ZodTypeAny>(schema: T) => {
  return schema.or(z.coerce.number().default(0))
}

// Use to allow default value for json field
export const allowJsonDefault = <T extends z.ZodTypeAny>(schema: T) => {
  return schema
    .or(z.literal('[]'))
    .or(z.literal('{}'))
    .transform((str): z.infer<ReturnType<typeof zu.json>> => {
      try {
        return JSON.parse(str)
      } catch (e) {
        return str
      }
    })
}

export const exists = <T extends z.ZodTypeAny>(
  schema: T,
  asyncCheck: (args: any) => Promise<boolean>,
  fieldName: string,
  excludes?: Array<string | undefined>
) => {
  return schema.refine(
    async (v) => {
      const isExists = await asyncCheck({ [fieldName]: v, excludes })
      return !isExists
    },
    { message: `${startCase(fieldName)} already exists` }
  )
}

// String rules
// All string rules is required by default. Use allowEmpty() to nullable string fields
export const text = z.string().min(1, { message: 'Required' })

export const voucherCode = z.coerce
  .string()
  .min(3, {
    message: 'Code is required (min. 3 characters length)',
  })
  .max(20, {
    message: 'Max. 20 characters length',
  })
  .refine((value) => !/\s/.test(value), {
    message: 'String must not contain spaces',
  })

// Coerced rules
// Since HTML input is always string type, types other than then string needs to be coerced
// Coerced value cause the input become optional,
// so add more rules to make it required by default
// then, you can use allowEmpty() to make it optional

// Primitive
export const int = z.coerce.number().gt(0, { message: 'Number is required' })

export const nullableInt = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((val) => {
    if (val === '' || val === null || val === undefined) return null // Convert empty values to null
    const num = Number(val)
    return Number.isNaN(num) ? null : Math.trunc(num) // Convert to integer, ensuring `NaN` is handled
  })

export const bool = z.coerce
  .string()
  .regex(/true|false/, { message: 'Must be string true or false' })
  .transform((v) => v === 'true')

// Date
export const date = z.coerce.date().transform((v) => formatDate(v, DATE_DB))

export const daterange = z
  .string()
  .min(10, { message: 'Please select date range' })
  .transform((v) => {
    if (v === '') return null

    return JSON.parse(v)
  })

// Number
export const amount = z.coerce
  .number()
  .gt(0, { message: 'Please input the amount' })

export const bankAccountNumber = z.coerce
  .string()
  .min(5, { message: 'Please input the number' })

// Yes/No
export const yesno = z.coerce
  .number({ required_error: 'Please choose' })
  .min(0)
  .max(1)
export const yesnomay = z.coerce
  .number({ required_error: 'Please choose' })
  .min(0)
  .max(2)

// Scalar
export const id = z.string().min(1, { message: 'Select first' })
export const clientId = z.string()
export const clientSecret = z.string()
export const OrganizationId = z.string()

export const ids = z.string().min(1, { message: 'Select first' })

// JSON
export const json = zu.stringToJSON()

// Field rules with custom message
export const title = z
  .string()
  .min(3, { message: 'Title is required (min. 3 characters length)' })

export const label = z
  .string()
  .min(3, { message: 'Lable is required (min. 3 characters length)' })

export const sip = z
  .string()
  .min(3, { message: 'SIP is required (min. 3 characters length)' })

export const slug = z
  .string()
  .min(1, { message: 'Slug is required (min. 3 characters length)' })
  .min(5, { message: 'Too short' })

export const abbr = z
  .string()
  .min(3, {
    message: 'Abbreviation is required (min. 3 characters length )',
  })
  .max(10, {
    message: 'Max. 12 characters length )',
  })

export const name = z
  .string()
  .min(3, { message: 'Name is required (min. 3 characters length)' })

export const alias = z
  .string()
  .min(3, { message: 'Name is required (min. 3 characters length)' })
  .max(100, {
    message: 'Max. 100 characters length',
  })
  .refine((value) => !/\s/.test(value), {
    message: 'String must not contain spaces',
  })

export const degree = z.string().min(1, { message: 'Title/Degree is required' })

export const shortName = z
  .string()
  .min(2, { message: 'Short name is required (min. 2 characters length)' })
  .max(50, { message: 'Short name is max 50 characters length' })

export const email = z.string().email({ message: 'Please input a valid email' })

// only allow numeric and length must be 16
export const identifierNo = z
  .string()
  .max(16, 'Identifier No is max 16 characters length')

export const residentIdNo = z
  .string()
  .regex(/^\d+$/, 'Must be numeric')
  .length(16)

export const diagnosis = z
  .string()
  .min(3, { message: 'Please input a valid diagnosis' })

export const password = z.string().min(6, {
  message: 'Please input longer password',
})

export const phone = z
  .string()
  .min(8, { message: 'Mobile number is required (min 8 characters length)' })

export const assetId = z.string().min(1)

export const description = text.min(5, {
  message: 'Please input longer text for the description',
})

export const notes = text.min(5, {
  message: 'Please input longer text as notes',
})

export const address = text.min(5, { message: 'Address too short' })

export const additionalInfo = text

export const company = text.min(1, {
  message: 'Please input longer text for the company',
})

export const regionId = z.string().min(10, { message: 'Please select region' })

export const bankId = z.string().min(10, { message: 'Please select bank' })

export const jurnalSellAccountId = z.coerce
  .number()
  .gt(0, { message: 'Please select jurnal sell account' })

export const jurnalDiscountAccountId = z.coerce
  .number()
  .gt(0, { message: 'Please select jurnal discount account' })

export const accountNumber = z
  .string()
  .min(6, { message: 'Please input valid Account Number' })

export const cardNumber = z
  .string()
  .max(4, { message: 'Please input valid last 4 digit Card Number' })

export const paymentAccountType = z
  .string()
  .regex(/bank|digital-payment/, { message: 'Please select type' })

export const digitalPaymentId = z
  .string()
  .min(10, { message: 'Please select payment digital' })

export const thirdPartyId = z
  .string()
  .min(10, { message: 'Please select third party' })

export const groupId = z.string().min(10, { message: 'Please select group' })

export const gender = z
  .string()
  .regex(/MALE|FEMALE|UNIDENTIFIED/, { message: 'Please select gender' })

export const postcode = z
  .string()
  .length(5, { message: 'Postcode length must be 5 characters' })

export const color = z
  .string()
  .length(7, { message: 'Color is not valid' })
  .regex(/^#/, { message: 'Color is not valid' })

export const code = z
  .string()
  .min(2, { message: 'Code is required (min. 2 characters length)' })

export const sku = z.string()

export const barcode = z.string()

export const partnerCode = z
  .string()
  .length(2, { message: 'Must be exactly 2 characters long' })
  .regex(/^[A-Za-z]{2}$/, { message: 'Must be two alphabetic characters only' })

export const invoiceHeaderId = z
  .string()
  .min(10, { message: 'Please select invoice header' })

export const invoiceSignatureId = z
  .string()
  .min(10, { message: 'Please select invoice signature' })

// ID rules
export const customerId = z
  .string()
  .min(1, { message: 'Please select a customer' })

export const categoryId = z
  .string()
  .min(1, { message: 'Please select a category' })

export const brandId = z.string().min(1, { message: 'Please select a brand' })

export const userId = z.string().min(1, { message: 'Please select a user' })

export const orderId = z.coerce
  .string()
  .min(1, { message: 'Please select an order' })

export const refundItems = z.string().min(10, {
  message: 'Please select at least one order item',
})

// Items rules
export const staffItems = z
  .string()
  .min(10, { message: 'Please select at least one staff' })

export const dailySlotItems = z
  .string()
  .min(10, { message: 'Please select assign schedule' })

export const partnerItems = z.coerce
  .string()
  .min(10, { message: 'Please select partner' })

// Helper schema generator
export const enumField = <T>(enumVar: T) => {
  const values = enumValues(enumVar)

  // convert each enum value to string
  const enumValuesString = values.map((v) => String(v))

  // create regex from enum values
  const regex = new RegExp(enumValuesString.join('|'))

  const schema = z.coerce
    .string()
    .min(1, { message: 'Please select one' })
    .regex(regex, {
      message: 'Please select one',
    })

  if (typeof values[values.length - 1] === 'string') {
    return schema.transform(
      (v) => String(v) as LiteralToPrimitive<T[keyof typeof enumVar]>
    )
  }

  return schema.transform(
    (v) => Number(v) as LiteralToPrimitive<T[keyof typeof enumVar]>
  )
}
