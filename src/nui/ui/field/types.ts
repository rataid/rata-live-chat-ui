import { DivPropsWithoutRef } from '@nui/types'

export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export type FieldsGap = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FieldsSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FieldProps = {
  inline?: boolean
  label?: React.ReactNode | string
  icon?: React.ReactNode | string
  fontWeight?: FontWeight
  enableMarkdown?: boolean
  fit?: boolean
} & DivPropsWithoutRef

export type FieldsProps = {
  inline?: boolean
  gap?: FieldsGap
  size?: FieldsSize
  fit?: boolean
}
