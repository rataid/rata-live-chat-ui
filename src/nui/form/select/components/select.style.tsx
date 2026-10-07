import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const SelectWrapper = styled.div.attrs({
  className: tw`relative`,
})``

type SelectControlProps = {
  simpleControl: boolean
  disabled?: boolean
}

export const SelectControl = styled.div.attrs<SelectControlProps>(
  ({ disabled, simpleControl }) => ({
    className: [
      disabled &&
        tw`!cursor-not-allowed !bg-gray-50 hover:!bg-gray-50 hover:!border-gray-200 !text-gray-500`,
      simpleControl
        ? tw`relative first:pl-2.5 flex items-center justify-between gap-x-1 w-full bg-white text-sm font-semibold text-gray-900 cursor-pointer focus:outline-none focus:text-gray-900`
        : tw`relative h-10 px-3 flex items-center justify-between gap-x-2 w-full bg-white text-sm text-gray-500 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 focus:outline-none focus:text-gray-900 focus:border-primary-400`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<SelectControlProps>``

export const SelectControlValue = styled.div.attrs({
  className: tw`flex-1 w-full h-full`,
})``

export const SelectControlValuePlaceholder = styled.div.attrs({
  className: tw`text-left h-10 leading-10 text-gray-400`,
})``

type SelectControlIndicatorProps = {
  isOpen: boolean
}

export const SelectControlIndicator = styled.div.attrs<SelectControlIndicatorProps>(
  ({ isOpen }: SelectControlIndicatorProps) => ({
    className: [isOpen && tw`transition ease-in rotate-180`]
      .filter(Boolean)
      .join(' '),
  })
)<SelectControlIndicatorProps>``

type SelectMenuProps = {
  isOpen: boolean
}

export const SelectMenu = styled.ul.attrs<SelectMenuProps>(
  ({ isOpen }: SelectMenuProps) => ({
    className: [
      tw`w-full bg-white border border-gray-100 rounded-lg overflow-hidden`,
      !isOpen && tw`hidden`,
      tw`max-h-96 overflow-scroll`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<SelectMenuProps>``

export const SelectMenuItem = styled.li.attrs({ className: tw`` })``

export const SelectMenuItemButton = styled.button.attrs({
  className: tw`w-full text-sm`,
})``
