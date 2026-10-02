import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { EntryProps } from './types'

export const EntryWrapper = styled.div.attrs({
  className: tw`table-row text-left`,
})``

type EntryNameProps = Pick<EntryProps, 'fontWeight'>

const fontWeightMap = {
  normal: tw`font-normal`,
  medium: tw`font-medium`,
  semibold: tw`font-semibold text-gray-700`,
  bold: tw`font-bold text-gray-900`,
}

export const EntryName = styled.div.attrs<EntryNameProps>(
  ({ fontWeight = 'normal' }) => {
    return {
      className: [
        fontWeightMap[fontWeight],
        tw`table-cell w-1 whitespace-nowrap text-start`,
      ]
        .filter(Boolean)
        .join(' '),
    }
  }
)<EntryNameProps>``

export const EntryValue = styled.div.attrs({
  className: tw`table-cell whitespace-pre-line`,
})``
