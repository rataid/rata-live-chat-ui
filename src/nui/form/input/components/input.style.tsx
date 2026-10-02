import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

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

export const InputWrapper = styled.div.attrs<InputInternalProps>(
  ({ isFocused, sizeInput = 'md' }) => ({
    className: [
      tw`w-full flex items-center justify-between rounded-lg border divide-x duration-300 ease-in-out overflow-hidden`,
      isFocused
        ? tw`border-primary-400 divide-primary-400 text-gray-900`
        : tw`border-gray-200 divide-gray-200 text-gray-500 hover:border-gray-300 hover:divide-gray-300 hover:text-gray-900`,
      sizeMap[sizeInput],
      leadingMap[sizeInput],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<InputInternalProps>``

export const InputMain = styled.div.attrs<InputInternalProps>(() => ({
  className: tw`relative flex-1 flex items-center`,
}))<InputInternalProps>`
  input {
    width: 100%;
    border: none;
    outline: 2px solid var(--nui-color-transparent);
    outline-offset: 2px;
    appearance: textfield;
    padding-left: ${({ leadingIcon }) => (leadingIcon ? 0 : '0.75rem')};
    padding-right: ${({ trailingIcon }) => (trailingIcon ? 0 : '0.75rem')};

    &:disabled {
      background-color: var(--nui-color-gray-50);
      border-color: var(--nui-color-gray-200);
      cursor: not-allowed;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
`

export const InputAddOn = styled.div.attrs<InputInternalProps>(
  ({ sizeInput = 'md' }) => ({
    className: [
      tw`w-fit text-gray-900 flex h-full items-center gap-1`,
      paddingMap[sizeInput],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<InputInternalProps>``

export const InputTrailOn = styled.div.attrs<InputInternalProps>(
  ({ sizeInput = 'md' }) => ({
    className: [
      tw`w-fit text-gray-900 flex h-full items-center gap-1`,
      paddingMap[sizeInput],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<InputInternalProps>``

export const InputIcon = styled.div.attrs<InputInternalProps>(
  ({ isFocused, danger, disable, sizeInput = 'md' }) => ({
    className: [
      tw`px-2 h-10 flex items-center justify-center text-gray-400`,
      danger && tw`text-danger-400`,
      isFocused && danger && tw`text-danger-500`,
      disable && tw`bg-gray-50/50`,
      sizeMap[sizeInput],
    ]
      .filter(Boolean)
      .join(' '),
  })
)<InputInternalProps>``

export const InputStepperWrapper = styled.div.attrs({
  className: tw`absolute right-2 top-1/2 -translate-y-3`,
})``

export const InputStepperArrow = styled.button.attrs({
  className: tw`w-4 h-3 flex items-center justify-center text-gray-300 hover:text-gray-900 hover:rounded-sm outline-none focus:text-primary-400`,
})``
