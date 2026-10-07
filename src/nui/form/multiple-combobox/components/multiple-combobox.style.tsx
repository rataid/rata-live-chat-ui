import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const MultipleComboboxWrapper = styled.div.attrs({ className: tw`relative` })``

export const MultipleComboboxPlaceholder = styled.div.attrs({ className: tw`absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center rounded-lg p-2 text-sm text-gray-500` })``

export const MultipleComboboxSelectedWrapper = styled.div.attrs({ className: tw`flex justify-between min-h-[40px] bg-white items-center gap-1 border border-gray-200 rounded-lg overflow-hidden group-hover:border-gray-300` })``

export const MultipleComboboxSelectedMain = styled.div.attrs({ className: tw`inline-flex flex-wrap items-center gap-2 p-2` })``

type MultipleComboboxControlProps = {
  hasSelected: boolean
}

type MultipleComboboxControlEdgeProps = {
  isFocused: boolean
}

export const MultipleComboboxControlEdge = styled.div.attrs<MultipleComboboxControlEdgeProps>(({ isFocused }: MultipleComboboxControlEdgeProps) =>  {
    return { className: [tw`relative flex items-center pl-3 pr-1 h-fit min-h-[2.5rem] bg-white text-sm text-gray-500 rounded-lg border cursor-pointer outline-none  focus:border-primary-400`, isFocused
        ? tw`border-primary-400`
        : tw`border-gray-200 hover:border-gray-300`].filter(Boolean).join(' ') }
  })<MultipleComboboxControlEdgeProps>``

export const MultipleComboboxControl = styled.div.attrs<MultipleComboboxControlProps>(({ hasSelected }: MultipleComboboxControlProps) => ({ className: [tw`h-full flex items-center justify-between gap-x-2 w-full`, hasSelected && tw`hidden`].filter(Boolean).join(' ') }))<MultipleComboboxControlProps>``

export const MultipleComboboxControlInput = styled.input.attrs(() =>  {
  return { className: [tw`flex-1 h-full outline-none cursor-pointer disabled:bg-white disabled:cursor-not-allowed focus:outline-none`].filter(Boolean).join(' ') }
})``

type MultipleComboboxControlIndicatorProps = {
  isOpen: boolean
}

export const MultipleComboboxControlIndicator = styled.button.attrs<MultipleComboboxControlIndicatorProps>(({ isOpen }: MultipleComboboxControlIndicatorProps) => ({ className: [tw`mr-2`, isOpen && tw`transition ease-in rotate-180`].filter(Boolean).join(' ') }))<MultipleComboboxControlIndicatorProps>``

export const MultipleComboboxSelectedContainer = styled.div.attrs({ className: tw`w-full flex items-center justify-between gap-x-2` })``

export const MultipleComboboxSelectedContainerClose = styled.button.attrs({ className: tw`outline-none hover:text-gray-900 hover:rounded-sm focus:text-primary-400` })``

type MultipleComboboxMenuProps = {
  isOpen: boolean
}

export const MultipleComboboxMenu = styled.ul.attrs<MultipleComboboxMenuProps>(({ isOpen }: MultipleComboboxMenuProps) => ({ className: [tw`first:pt-2 flex flex-col bg-white border border-gray-100 rounded-lg overflow-y-scroll max-h-72`, !isOpen && tw`hidden`].filter(Boolean).join(' ') }))<MultipleComboboxMenuProps>``

export const MultipleComboboxMenuItem = styled.li.attrs({ className: tw`` })``

export const MultipleComboboxMenuItemButton = styled.button.attrs({ className: tw`w-full text-sm ` })``

export const MultipleComboboxMenuInfo = styled.button.attrs({ className: tw`py-2 px-3 leading-10 text-xs text-gray-500` })``
