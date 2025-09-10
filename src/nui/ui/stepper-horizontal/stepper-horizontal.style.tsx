import tw, { styled } from 'twin.macro'

import { StepperHorizontalStyleProps } from './types'

export const variantMap = {
  default: tw`border-gray-200 bg-white`,
  current: tw`border-primary-400 bg-primary-200 text-white`,
  done: tw`border-primary-600 bg-primary-600 text-white`,
}

export const sizeMap = {
  default: tw`font-medium text-gray-500`,
  current: tw`font-medium text-gray-900`,
  done: tw`font-semibold text-gray-900`,
}

export const StepperHorizontalWrapper = tw.div`flex items-center gap-6`

export const StepperHorizontalContent = tw.button`relative focus:(outline-none)`

export const StepperHorizontalMain = styled.div<StepperHorizontalStyleProps>(
  ({ step = 'default' }) => {
    return [
      step && sizeMap[step],
      tw`relative flex items-center justify-center gap-2 bg-white text-sm`,
    ]
  }
)

export const StepperHorizontalStatus = styled.div<StepperHorizontalStyleProps>(
  ({ step = 'default' }) => {
    return [
      step && variantMap[step],
      tw`inline-flex h-5 w-5 items-center justify-center rounded-full border`,
    ]
  }
)

export const StepperHorizontalLine = styled.div<
  Pick<StepperHorizontalStyleProps, 'active'>
>(({ active }) => [
  active ? tw`bg-primary-400` : tw`bg-gray-200`,
  tw`absolute h-[1.5px] w-full -translate-x-4 top-1/2 rounded-full`,
])
