import tw, { styled } from 'twin.macro'

export const MultipleComboboxWrapper = tw.div`relative`

export const MultipleComboboxPlaceholder = tw.div`absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center rounded-lg p-2 text-sm text-gray-500`

export const MultipleComboboxSelectedWrapper = tw.div`flex justify-between min-h-[40px] bg-white items-center gap-1 border border-gray-200 rounded-lg overflow-hidden group-hover:border-gray-300`

export const MultipleComboboxSelectedMain = tw.div`inline-flex flex-wrap items-center gap-2 p-2`

type MultipleComboboxControlProps = {
  hasSelected: boolean
}

type MultipleComboboxControlEdgeProps = {
  isFocused: boolean
}

export const MultipleComboboxControlEdge = styled.div(
  ({ isFocused }: MultipleComboboxControlEdgeProps) => {
    return [
      tw`relative flex items-center pl-3 pr-1 h-fit min-h-[2.5rem] bg-white text-sm text-gray-500 rounded-lg border cursor-pointer outline-none  focus:(border-primary-400)`,
      isFocused
        ? tw`border-primary-400`
        : tw`border-gray-200 hover:border-gray-300`,
    ]
  }
)

export const MultipleComboboxControl = styled.div(
  ({ hasSelected }: MultipleComboboxControlProps) => [
    tw`h-full flex items-center justify-between gap-x-2 w-full`,
    hasSelected && tw`hidden`,
  ]
)

export const MultipleComboboxControlInput = styled.input(() => {
  return [
    tw`flex-1 h-full outline-none cursor-pointer disabled:(bg-white cursor-not-allowed) focus:(outline-none)`,
  ]
})

type MultipleComboboxControlIndicatorProps = {
  isOpen: boolean
}

export const MultipleComboboxControlIndicator = styled.button(
  ({ isOpen }: MultipleComboboxControlIndicatorProps) => [
    tw`mr-2`,
    isOpen && tw`transition ease-in rotate-180`,
  ]
)

export const MultipleComboboxSelectedContainer = tw.div`w-full flex items-center justify-between gap-x-2`

export const MultipleComboboxSelectedContainerClose = tw.button`outline-none hover:(text-gray-900 rounded-sm) focus:(text-primary-400)`

type MultipleComboboxMenuProps = {
  isOpen: boolean
}

export const MultipleComboboxMenu = styled.ul(
  ({ isOpen }: MultipleComboboxMenuProps) => [
    tw`first:pt-2 flex flex-col bg-white border border-gray-100 rounded-lg overflow-y-scroll max-h-72`,
    !isOpen && tw`hidden`,
  ]
)

export const MultipleComboboxMenuItem = tw.li``

export const MultipleComboboxMenuItemButton = tw.button`w-full text-sm `

export const MultipleComboboxMenuInfo = tw.button`py-2 px-3 leading-10 text-xs text-gray-500`
