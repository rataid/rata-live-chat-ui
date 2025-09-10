import tw, { styled } from 'twin.macro'

import { SelectItemProps } from '../types'

export const SelectItemWrapper = styled.div<
  Pick<SelectItemProps, 'isSelected'>
>(({ isSelected }) => [
  tw`px-3 h-10 leading-10 flex items-center justify-between gap-x-2 hover:(text-gray-900 font-semibold)`,
  isSelected && tw`text-gray-900 font-medium bg-gray-50`,
])

export const SelectItemLabel = tw.div`flex-1 text-left`

export const SelectItemSymbol = tw.div`w-5 h-5 inline-flex items-center text-primary-600`
