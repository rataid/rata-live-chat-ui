import tw, { css, styled } from 'twin.macro'

import { InputInternalProps } from '../types'

const sizeMap = {
  md: tw`h-10`,
  lg: tw`h-16`,
}

const leadingMap = {
  md: tw`text-sm leading-10`,
  lg: tw`text-lg leading-[64px]`,
}

const paddingMap = {
  md: tw`pl-[0.875rem] pr-[0.75rem]`,
  lg: tw`pl-[16px] pr-[18px]`,
}

export const InputWrapper = styled.div<InputInternalProps>(
  ({ isFocused, sizeInput = 'md' }) => [
    tw`w-full flex items-center justify-between rounded-lg border divide-x duration-300 ease-in-out overflow-hidden`,
    isFocused
      ? tw`border-primary-400 divide-primary-400 text-gray-900`
      : tw`border-gray-200 divide-gray-200 text-gray-500 hover:(border-gray-300 divide-gray-300 text-gray-900)`,
    sizeMap[sizeInput],
    leadingMap[sizeInput],
  ]
)

export const InputMain = styled.div<InputInternalProps>(
  ({ leadingIcon, trailingIcon }) => [
    tw`relative flex-1 flex items-center`,
    css`
  input {
    ${tw`w-full border-none outline-none disabled:(bg-gray-50 border-gray-200 cursor-not-allowed) [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
    ${leadingIcon ? tw`pl-0` : tw`pl-3`}
    ${trailingIcon ? tw`pr-0` : tw`pr-3`}
  `,
  ]
)

export const InputAddOn = styled.div<InputInternalProps>(
  ({ sizeInput = 'md' }) => [
    tw`w-fit text-gray-900 flex h-full items-center gap-1`,
    paddingMap[sizeInput],
  ]
)

export const InputTrailOn = styled.div<InputInternalProps>(
  ({ sizeInput = 'md' }) => [
    tw`w-fit text-gray-900 flex h-full items-center gap-1`,
    paddingMap[sizeInput],
  ]
)

export const InputIcon = styled.div<InputInternalProps>(
  ({ isFocused, danger, disable, sizeInput = 'md' }) => [
    tw`px-2 h-10 flex items-center justify-center text-gray-400`,
    danger && tw`text-danger-400`,
    isFocused && danger && tw`text-danger-500`,
    disable && tw`bg-gray-50/50`,
    sizeMap[sizeInput],
  ]
)

export const InputStepperWrapper = tw.div`absolute right-2 top-1/2 -translate-y-3`

export const InputStepperArrow = tw.button`w-4 h-3 flex items-center justify-center text-gray-300 hover:(text-gray-900 rounded-sm) outline-none focus:(text-primary-400)`
