import { BadgeColor } from '@nui/ui/badge'

export const termOfPaymentOptions: {
  value: string
  label: string
  color: BadgeColor
}[] = [
  { value: '7-days', label: '7 days', color: 'gray' },
  { value: '14-days', label: '14 days', color: 'success' },
  { value: '30-days', label: '30 days', color: 'danger' },
  { value: 'cbd', label: 'CBD', color: 'blue' },
  { value: 'caf', label: 'Cash After Finished', color: 'purple' },
  { value: 'dp-installment', label: 'DP & Installment', color: 'orange' },
]

export const stringToTermOfPaymentOption = (value: string) => {
  return termOfPaymentOptions.find(option => option.value === value)
}