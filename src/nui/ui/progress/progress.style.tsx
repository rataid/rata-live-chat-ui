import { keyframes } from 'styled-components'
import tw, { css, styled } from 'twin.macro'

import { ProgressProps } from './types'

export const ProgressWrapper = tw.div`flex-1 flex flex-col gap-y-2`

export const ProgressBar = tw.div`h-1 w-full bg-gray-100 rounded-full`

export const ProgressInfo = tw.div`h-4 flex items-center justify-between`

export const ProgressLabel = tw.div`flex-1 pb-1 line-clamp-1`

export const ProgressStatus = tw.div`w-fit text-sm text-gray-700 font-medium`

export const ProgressLoader = styled.button<Pick<ProgressProps, 'value'>>(
  ({ value }) => {
    return [
      tw`bg-primary-700 h-full overflow-hidden rounded-full ease-in-out duration-200`,
      value
        ? css`
            display: block;
            width: ${value}%;
          `
        : css`
            display: hidden;
          `,
    ]
  }
)

const progressAnimationLoader = keyframes`
0% {
    transform: translateX(-100%);
    opacity: 50;
}
100% {
    transform: translateX(1000%);
    opacity: 100;
}
`

export const ProgressAnimation = styled.div(() => [
  tw`bg-primary-400/20  w-full h-full rounded-full ease-linear`,
  css`
    animation-name: ${progressAnimationLoader};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  `,
])
