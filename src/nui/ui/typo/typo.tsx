import tw, { styled } from 'twin.macro'

import { TypoProps } from './types'
import { colorMap, fontWeightMap, sizeMap } from './typo.style'

export const Typo = styled.div<TypoProps>(
  ({ fontWeight = 'normal', size = 'sm', color = 'gray-700', nowrap }) => [
    fontWeight && fontWeightMap[fontWeight],
    size && sizeMap[size],
    color && colorMap[color],
    nowrap && tw`whitespace-nowrap`,
  ]
)
