import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const ComboboxWrapper = styled.div.attrs({ className: tw`relative` })``

type ComboboxControlProps = {
  hasSelected: boolean
}

type ComboboxControlEdgeProps = {
  isFocused: boolean
  disabled?: boolean
  viewOnly?: boolean
}

export const ComboboxControlEdge = styled.div.attrs<ComboboxControlEdgeProps>(({ isFocused, disabled, viewOnly }: ComboboxControlEdgeProps) =>  {
    return { className: [tw`relative flex items-center pr-1 h-fit min-h-[2.5rem] text-sm text-gray-500 rounded-lg border cursor-pointer outline-none focus:border-primary-400`, viewOnly && tw`!bg-white`, disabled ? tw`bg-gray-50 hover:!border-gray-200` : tw`bg-white`, isFocused
        ? tw`border-primary-400`
        : tw`border-gray-200 hover:border-gray-300`].filter(Boolean).join(' ') }
  })<ComboboxControlEdgeProps>``

export const ComboboxControl = styled.div.attrs<ComboboxControlProps>(({ hasSelected }: ComboboxControlProps) => ({ className: [tw`w-full h-full flex items-center justify-between gap-x-1`, hasSelected && tw`hidden`].filter(Boolean).join(' ') }))<ComboboxControlProps>``

export const ComboboxControlInput = styled.input.attrs(() =>  {
  return { className: [tw`ml-3 flex-1 w-full h-full outline-none cursor-pointer !bg-transparent disabled:cursor-not-allowed focus:outline-none`].filter(Boolean).join(' ') }
})``

type ComboboxControlIndicatorProps = {
  isOpen: boolean
}

export const ComboboxControlIndicator = styled.button.attrs<ComboboxControlIndicatorProps>(({ isOpen }: ComboboxControlIndicatorProps) => ({ className: [tw`mr-2`, isOpen && tw`transition ease-in rotate-180`].filter(Boolean).join(' ') }))<ComboboxControlIndicatorProps>``

export const ComboboxSelectedContainer = styled.div.attrs({ className: tw`w-full flex items-center justify-between gap-x-2` })``

export const ComboboxSelectedContainerClose = styled.button.attrs({ className: tw`outline-none hover:text-gray-900 hover:rounded-sm focus:text-primary-400` })``

type ComboboxMenuProps = {
  isOpen: boolean
}

export const ComboboxMenu = styled.ul.attrs<ComboboxMenuProps>(({ isOpen }: ComboboxMenuProps) => ({ className: [tw`my-3 flex flex-col bg-white border border-gray-100 rounded-lg overflow-y-auto mx-4 lg:mx-0 max-h-72`, !isOpen && tw`hidden`].filter(Boolean).join(' ') }))<ComboboxMenuProps>``

export const ComboboxMenuItem = styled.li.attrs({ className: tw`w-full` })``

export const ComboboxMenuItemButton = styled.button.attrs({ className: tw`w-full text-sm` })``

export const ComboboxMenuInfo = styled.button.attrs({ className: tw`py-2 px-3 leading-10 text-xs text-gray-500` })``
