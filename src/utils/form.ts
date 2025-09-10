import { Control, FieldValues } from 'react-hook-form'
import { ZodObject } from 'zod'

export const fieldNames = (schema: ZodObject<any>) => {
  return Object.keys(schema.shape)
}

export const controlFieldnames = (control: Control<FieldValues, any>) => {
  // eslint-disable-next-line no-underscore-dangle
  return Object.keys(control._fields)
}
