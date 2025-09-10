import tw, { styled } from 'twin.macro'

import { EntryProps } from './types'

export const EntryWrapper = tw.div`table-row text-left`

type EntryNameProps = Pick<EntryProps, 'fontWeight'>

const fontWeightMap = {
  normal: tw`font-normal`,
  medium: tw`font-medium`,
  semibold: tw`font-semibold text-gray-700`,
  bold: tw`font-bold text-gray-900`,
}

export const EntryName = styled.div<EntryNameProps>(
  ({ fontWeight = 'normal' }) => {
    return [
      fontWeightMap[fontWeight],
      tw`table-cell w-1 whitespace-nowrap text-start`,
    ]
  }
)

export const EntryValue = tw.div`table-cell whitespace-pre-line`
