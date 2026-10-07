import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { SelectItemProps } from '../types'

export const SelectItemWrapper = styled.div.attrs<
  Pick<SelectItemProps, 'isSelected'>
>(({ isSelected }) => ({
  className: [
    tw`px-3 h-10 leading-10 flex items-center justify-between gap-x-2 hover:text-gray-900 hover:font-semibold`,
    isSelected && tw`text-gray-900 font-medium bg-gray-50`,
  ]
    .filter(Boolean)
    .join(' '),
}))<Pick<SelectItemProps, 'isSelected'>>``

export const SelectItemLabel = styled.div.attrs({
  className: tw`flex-1 text-left`,
})``

export const SelectItemSymbol = styled.div.attrs({
  className: tw`w-5 h-5 inline-flex items-center text-primary-600`,
})``
