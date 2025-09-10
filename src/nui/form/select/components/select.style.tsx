import tw, { styled } from 'twin.macro'

export const SelectWrapper = tw.div`relative`

type SelectControlProps = {
  simpleControl: boolean
  disabled?: boolean
}

export const SelectControl = styled.div<SelectControlProps>(
  ({ disabled, simpleControl }) => {
    return [
      disabled &&
        tw`!cursor-not-allowed !bg-gray-50 hover:!bg-gray-50 hover:!border-gray-200 !text-gray-500`,
      simpleControl
        ? tw`relative first:pl-2.5 flex items-center justify-between gap-x-1 w-full bg-white text-sm font-semibold text-gray-900 cursor-pointer focus:(outline-none text-gray-900)`
        : tw`relative h-10 px-3 flex items-center justify-between gap-x-2 w-full bg-white text-sm text-gray-500 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 focus:(outline-none text-gray-900) focus:border-primary-400`,
    ]
  }
)

export const SelectControlValue = tw.div`flex-1 w-full h-full`

export const SelectControlValuePlaceholder = tw.div`text-left h-10 leading-10 text-gray-400`

type SelectControlIndicatorProps = {
  isOpen: boolean
}

export const SelectControlIndicator = styled.div(
  ({ isOpen }: SelectControlIndicatorProps) => [
    isOpen && tw`transition ease-in rotate-180`,
  ]
)

type SelectMenuProps = {
  isOpen: boolean
}

export const SelectMenu = styled.ul(({ isOpen }: SelectMenuProps) => [
  tw`w-full bg-white border border-gray-100 rounded-lg overflow-hidden`,
  !isOpen && tw`hidden`,
  tw`max-h-96 overflow-scroll`,
])

export const SelectMenuItem = tw.li``

export const SelectMenuItemButton = tw.button`w-full text-sm`
