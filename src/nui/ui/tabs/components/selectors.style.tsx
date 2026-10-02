import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { VariantTabs } from '../types'

type TabsSelectorsWrapperProps = {
  variant?: VariantTabs
}

const variantMap: Record<VariantTabs, string> = {
  tabs: 'flex flex-row justify-start text-sm font-medium text-gray-600 border-b border-gray-200',
  bar: 'flex items-center overflow-hidden text-sm h-fit w-fit rounded-lg border border-gray-200',
}

export const TabsSelectorsWrapper = styled.div.attrs<TabsSelectorsWrapperProps>(
  ({ variant }) => ({
    className: [
      variant && variantMap[variant],
      tw`overflow-x-auto overflow-y-hidden`,
    ]
      .filter(Boolean)
      .join(' '),
  })
)<TabsSelectorsWrapperProps>``
