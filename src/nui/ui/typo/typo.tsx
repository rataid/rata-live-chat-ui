import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { TypoProps } from './types'
import { colorMap, fontWeightMap, sizeMap } from './typo.style'

export const Typo = styled.div.attrs<TypoProps>(({ fontWeight = 'normal', size = 'sm', color = 'gray-700', nowrap }) => ({ className: [fontWeight && fontWeightMap[fontWeight], size && sizeMap[size], color && colorMap[color], nowrap && tw`whitespace-nowrap`].filter(Boolean).join(' ') }))<TypoProps>``
