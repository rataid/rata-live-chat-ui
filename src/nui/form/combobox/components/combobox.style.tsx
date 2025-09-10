import tw, { styled } from 'twin.macro'

export const ComboboxWrapper = tw.div`relative`

type ComboboxControlProps = {
  hasSelected: boolean
}

type ComboboxControlEdgeProps = {
  isFocused: boolean
  disabled?: boolean
  viewOnly?: boolean
}

export const ComboboxControlEdge = styled.div(
  ({ isFocused, disabled, viewOnly }: ComboboxControlEdgeProps) => {
    return [
      tw`relative flex items-center pr-1 h-fit min-h-[2.5rem] text-sm text-gray-500 rounded-lg border cursor-pointer outline-none focus:(border-primary-400)`,
      viewOnly && tw`!bg-white`,
      disabled ? tw`bg-gray-50 hover:!border-gray-200` : tw`bg-white`,
      isFocused
        ? tw`border-primary-400`
        : tw`border-gray-200 hover:border-gray-300`,
    ]
  }
)

export const ComboboxControl = styled.div(
  ({ hasSelected }: ComboboxControlProps) => [
    tw`w-full h-full flex items-center justify-between gap-x-1`,
    hasSelected && tw`hidden`,
  ]
)

export const ComboboxControlInput = styled.input(() => {
  return [
    tw`ml-3 flex-1 w-full h-full outline-none cursor-pointer !bg-transparent disabled:( cursor-not-allowed) focus:(outline-none)`,
  ]
})

type ComboboxControlIndicatorProps = {
  isOpen: boolean
}

export const ComboboxControlIndicator = styled.button(
  ({ isOpen }: ComboboxControlIndicatorProps) => [
    tw`mr-2`,
    isOpen && tw`transition ease-in rotate-180`,
  ]
)

export const ComboboxSelectedContainer = tw.div`w-full flex items-center justify-between gap-x-2`

export const ComboboxSelectedContainerClose = tw.button`outline-none hover:(text-gray-900 rounded-sm) focus:(text-primary-400)`

type ComboboxMenuProps = {
  isOpen: boolean
}

export const ComboboxMenu = styled.ul(({ isOpen }: ComboboxMenuProps) => [
  tw`my-3 flex flex-col bg-white border border-gray-100 rounded-lg overflow-y-auto mx-4 lg:mx-0 max-h-72`,
  !isOpen && tw`hidden`,
])

export const ComboboxMenuItem = tw.li`w-full`

export const ComboboxMenuItemButton = tw.button`w-full text-sm`

export const ComboboxMenuInfo = tw.button`py-2 px-3 leading-10 text-xs text-gray-500`
