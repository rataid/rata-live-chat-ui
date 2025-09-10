import tw, { css, styled } from 'twin.macro'

import { FabtipGap } from './types'

export const FabtipWrapper = tw.div`relative bg-white rounded-sm text-sm`

export const FabtipAvatar = styled.div(() => [
  tw`absolute w-16 h-16 -top-[2.625rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full overflow-hidden`,
  css`
    img {
      ${tw`w-full h-full object-cover`}
    }
  `,
])

type FabtipMainProps = {
  gap?: FabtipGap
}

const gapMap = {
  none: tw`gap-y-0`,
  xs: tw`gap-y-1`,
  sm: tw`gap-y-2`,
  md: tw`gap-y-4`,
  lg: tw`gap-y-6`,
  xl: tw`gap-y-8`,
  '2xl': tw`gap-y-10`,
}

export const FabtipMain = styled.div<FabtipMainProps>(({ gap = 'lg' }) => [
  gapMap[gap],
  tw`px-4 pt-9 pb-5 min-w-[20rem] flex flex-col items-center justify-center text-center`,
])
