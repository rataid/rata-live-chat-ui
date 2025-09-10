import tw, { styled } from 'twin.macro'

import { useTipContext } from '../tip/hooks'
import { TooltipProps } from './types'

export const TooltipWrappers = tw.div`relative h-fit`

const sizes = {
  none: tw``,
  xs: tw`text-xs`,
  sm: tw`text-sm`,
  md: tw`text-base`,
  lg: tw`text-lg`,
}

const roundeds = {
  none: tw``,
  rounded: tw`rounded`,
  md: tw`rounded-md`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
}

const paddings = {
  none: tw`p-0`,
  xs: tw`px-1 py-0.5`,
  sm: tw`px-2 py-1`,
  md: tw`px-4 py-2`,
  lg: tw`px-6 py-3`,
}

type TooltipStyleProps = Pick<
  TooltipProps,
  'variant' | 'size' | 'rounded' | 'padding' | 'isMobile'
>

export const TooltipWrapper = styled.div<TooltipStyleProps>(
  ({
    variant = 'light',
    size = 'sm',
    rounded = 'lg',
    padding = 'sm',
    isMobile,
  }) => {
    const variants = {
      light: tw`bg-white text-gray-600 border-gray-200`,
      dark: tw`bg-gray-900 text-white border-gray-800`,
    }

    return [
      tw`relative inline-block h-fit border text-center`,
      variant && variants[variant],
      size && sizes[size],
      isMobile ? tw`w-screen max-w-3xl rounded-t-2xl` : roundeds[rounded],
      padding && paddings[padding],
    ]
  }
)

export const TooltipContent = styled.div(() => {
  const { placement } = useTipContext()

  const positions = {
    top: tw`-bottom-[0.5625rem] right-1/2 translate-x-[0.5rem] h-3 w-4`,
    'top-start': tw`-bottom-[0.5625rem] left-0 translate-x-4 h-3 w-4`,
    'top-end': tw`-bottom-[0.5625rem] right-0 -translate-x-4 h-3 w-4`,
    right: tw`-translate-y-[0.5rem] top-1/2 left-0 -translate-x-3 h-4 w-3`,
    'right-start': tw`top-0 translate-y-2 left-0 -translate-x-3 h-4 w-3`,
    'right-end': tw`bottom-0 -translate-y-2 left-0 -translate-x-3 h-4 w-3`,
    bottom: tw`-top-[0.5625rem] left-1/2 -translate-x-[0.375rem] h-3 w-4`,
    'bottom-start': tw`-top-[0.5625rem] left-0 translate-x-4 h-3 w-4`,
    'bottom-end': tw`-top-[0.5625rem] right-0 -translate-x-4 h-3 w-4`,
    left: tw`translate-y-[0.5rem] bottom-1/2 right-0 translate-x-[0.5625rem] h-4 w-3`,
    'left-start': tw`top-0 translate-y-2 right-0 translate-x-[0.5625rem] h-4 w-3`,
    'left-end': tw`bottom-0 -translate-y-2 right-0 translate-x-[0.5625rem] h-4 w-3`,
  }

  return [positions[placement], tw`absolute overflow-hidden rounded-sm`]
})

export const TooltipMain = styled.div<TooltipStyleProps>(
  ({ variant = 'light' }) => {
    const { placement } = useTipContext()
    const variants = {
      light: tw`bg-white border-gray-200`,
      dark: tw`bg-gray-900 border-gray-800`,
    }
    const arrows = {
      top: tw`-translate-y-[0.4375rem]`,
      'top-start': tw`-translate-y-[0.4375rem] `,
      'top-end': tw`-translate-y-[0.4375rem] `,
      right: tw`translate-x-[0.4375rem]`,
      'right-start': tw`translate-x-[0.4375rem]`,
      'right-end': tw`translate-x-[0.4375rem]`,
      bottom: tw`translate-y-[0.1875rem]`,
      'bottom-start': tw`translate-y-[0.1875rem]`,
      'bottom-end': tw`translate-y-[0.1875rem]`,
      left: tw`-translate-x-[0.4375rem]`,
      'left-start': tw`-translate-x-[0.4375rem]`,
      'left-end': tw`-translate-x-[0.4375rem]`,
    }

    return [
      placement && arrows[placement],
      variant && variants[variant],
      tw`h-4 w-4 rotate-45 rounded-sm border`,
    ]
  }
)

export const TooltipCaption = tw.div`text-sm font-semibold`
