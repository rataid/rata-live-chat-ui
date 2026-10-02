import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type CardDataItemProps = {
  isSelected: boolean
}

export const CardDataItem = styled.div.attrs<CardDataItemProps>(({ isSelected }) =>  {
  return { className: [isSelected && tw`bg-gray-50 bg-opacity-50`].filter(Boolean).join(' ') }
})<CardDataItemProps>``

export const CardDataEmpty = styled.div.attrs({ className: tw`border border-gray-200 py-10 text-xs text-center rounded-lg` })``
