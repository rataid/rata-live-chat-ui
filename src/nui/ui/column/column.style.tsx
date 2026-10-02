import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ColumnWrapperProps } from './types'

export const ColumnWrapper = styled.div.attrs<ColumnWrapperProps>(({ spacing }) => ({ className: [tw`flex justify-between gap-4`].filter(Boolean).join(' ') }))<ColumnWrapperProps>`
  ${({ spacing }) => spacing &&
    css`
      gap: ${spacing};
    `}
`
