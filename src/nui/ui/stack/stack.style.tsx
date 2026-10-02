import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { StackWrapperProps } from './types'

const alignMap = {
  none: tw``,
  center: tw`items-center`,
  start: tw`items-start`,
  end: tw`items-end`,
}

const justifyMap = {
  between: tw`justify-between`,
  center: tw`justify-center`,
  start: tw`justify-start`,
  end: tw`justify-end`,
}

export const StackWrapper = styled.div.attrs<StackWrapperProps>(({ flow, spacing, fit, width, align, justify }) => ({ className: [tw`flex`, fit ? tw`w-fit` : tw`w-full`, align && alignMap[align], justify && justifyMap[justify]].filter(Boolean).join(' ') }))<StackWrapperProps>`
  ${({ flow }) => flow === 'row'
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;

          > .nui-item {
            width: 100%;
          }
        `}
  ${({ spacing }) => spacing &&
      css`
        gap: ${spacing};
      `}
  ${({ width }) => width &&
      css`
        width: ${width}px;
      `}
`
