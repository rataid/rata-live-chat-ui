import tw, { css, styled } from 'twin.macro'

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

export const StackWrapper = styled.div<StackWrapperProps>(
  ({ flow, spacing, fit, width, align, justify }) => [
    tw`flex`,
    flow === 'row'
      ? tw`flex-row`
      : [
          tw`flex-col`,
          css`
            > .nui-item {
              width: 100%;
            }
          `,
        ],

    spacing &&
      css`
        gap: ${spacing};
      `,
    width
      ? css`
          width: ${width}px;
        `
      : tw`w-full`,
    fit ? tw`w-fit` : tw`w-full`,
    align && alignMap[align],
    justify && justifyMap[justify],
  ]
)
