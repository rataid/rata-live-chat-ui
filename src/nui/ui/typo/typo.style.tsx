import { tw } from '@nui/utils/tw'

const primaryMap = {
  'primary-300': tw`text-primary-300`,
  'primary-400': tw`text-primary-400`,
  'primary-500': tw`text-primary-500`,
  'primary-600': tw`text-primary-600`,
  'primary-700': tw`text-primary-700`,
  'primary-800': tw`text-primary-800`,
  'primary-900': tw`text-primary-900`,
}

const grayMap = {
  'gray-300': tw`text-gray-300`,
  'gray-400': tw`text-gray-400`,
  'gray-500': tw`text-gray-500`,
  'gray-600': tw`text-gray-600`,
  'gray-700': tw`text-gray-700`,
  'gray-800': tw`text-gray-800`,
  'gray-900': tw`text-gray-900`,
}

const successMap = {
  'success-300': tw`text-success-300`,
  'success-400': tw`text-success-400`,
  'success-500': tw`text-success-500`,
  'success-600': tw`text-success-600`,
  'success-700': tw`text-success-700`,
  'success-800': tw`text-success-800`,
  'success-900': tw`text-success-900`,
}

const warningMap = {
  'warning-300': tw`text-warning-300`,
  'warning-400': tw`text-warning-400`,
  'warning-500': tw`text-warning-500`,
  'warning-600': tw`text-warning-600`,
  'warning-700': tw`text-warning-700`,
  'warning-800': tw`text-warning-800`,
  'warning-900': tw`text-warning-900`,
}

const dangerMap = {
  'danger-300': tw`text-danger-300`,
  'danger-400': tw`text-danger-400`,
  'danger-500': tw`text-danger-500`,
  'danger-600': tw`text-danger-600`,
  'danger-700': tw`text-danger-700`,
  'danger-800': tw`text-danger-800`,
  'danger-900': tw`text-danger-900`,
}

export const colorMap = {
  ...primaryMap,
  ...grayMap,
  ...dangerMap,
  ...successMap,
  ...warningMap,
}

export const fontWeightMap = {
  normal: tw`font-normal`,
  medium: tw`font-medium`,
  semibold: tw`font-semibold`,
  bold: tw`font-bold`,
  extrabold: tw`font-extrabold`,
}

export const sizeMap = {
  '2xs': tw`text-2xs leading-[.875rem]`,
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
  xl: tw`text-xl`,
  '2xl': tw`text-2xl`,
  '3xl': tw`text-3xl`,
}
