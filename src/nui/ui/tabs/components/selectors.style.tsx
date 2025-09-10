import tw, { styled } from 'twin.macro'

import { VariantTabs } from '../types'

type TabsSelectorsWrapperProps = {
  variant?: VariantTabs
}

const variantMap = {
  tabs: tw`flex flex-row justify-start text-sm font-medium text-gray-600 border-b border-gray-200`,
  bar: tw`flex items-center overflow-hidden text-sm h-fit w-fit rounded-lg border border-gray-200`,
}

export const TabsSelectorsWrapper = styled.div<TabsSelectorsWrapperProps>(
  ({ variant }) => [
    variant && variantMap[variant],
    tw`overflow-x-auto overflow-y-hidden`,
  ]
)
