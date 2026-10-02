import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ButtonProps, ButtonSize } from './types'

type ButtonWrapperProps = Pick<
  ButtonProps,
  'size' | 'variant' | 'rounded' | 'danger' | 'warning' | 'noPadding' | 'wider'
>

export const ButtonWrapper = styled.button.attrs<ButtonWrapperProps>(({ size, variant, rounded, danger, warning, noPadding, wider }) =>  {
    const sizes = {
      xs: tw`px-[0.875rem] min-w-[2rem] h-[2rem] leading-[2rem] gap-x-2 text-xs`,
      sm: tw`px-[0.875rem] min-w-[2.25rem] h-[2.25rem] leading-[2.25rem] gap-x-2 text-sm`,
      md: tw`px-[1rem] min-w-[2.5rem] h-[2.5rem] leading-[2.5rem] gap-x-2 text-sm`,
      lg: tw`px-[1.125rem] min-w-[2.75rem] h-[2.75rem] leading-[2.75rem] gap-x-2 text-base`,
      xl: tw`px-[1.25rem] min-w-[3rem] h-[3rem] leading-[3rem] gap-x-2 text-base`,
      '2xl': tw`px-[1.75rem] min-w-[3.75rem] h-[3.75rem] leading-[3.75rem] gap-x-3 text-lg`,
    }

    const colorPrimary = {
      link: tw`text-primary-700 hover:text-primary-800 focus:text-primary-700 disabled:text-gray-300`,
      linkGray: tw`text-gray-700 hover:text-gray-800 focus:text-gray-800 disabled:text-gray-300`,
      primary: tw`!bg-primary-600 text-white hover:!bg-primary-700 focus:!bg-primary-600 disabled:!bg-primary-200`,
      secondary: tw`!bg-primary-50 text-primary-700 hover:!bg-primary-100 focus:!bg-primary-50 disabled:!bg-primary-25 disabled:text-primary-300`,
      secondaryGray: tw`!bg-white text-gray-700 ring-1 ring-gray-200 hover:!bg-gray-50 hover:ring-gray-300 hover:text-gray-800 focus:!bg-white focus:ring-gray-400 focus:text-gray-700 disabled:ring-gray-200 disabled:text-gray-300`,
      tertiary: tw`text-primary-700 hover:!bg-primary-50  disabled:text-gray-300`,
      tertiaryGray: tw`text-gray-500 hover:text-gray-600 hover:!bg-gray-50 disabled:text-gray-300`,
    }
    const colorDanger = {
      link: tw`text-danger-700 hover:text-danger-800 disabled:text-danger-300`,
      linkGray: tw`text-danger-700 hover:text-danger-800 disabled:text-danger-300`,
      primary: tw`!bg-danger-600 text-white hover:!bg-danger-700 disabled:!bg-danger-200 `,
      secondary: tw`!bg-danger-50 text-danger-700 hover:!bg-danger-100 disabled:!bg-danger-25 disabled:text-danger-300`,
      secondaryGray: tw`!bg-white text-danger-700 ring-1 ring-danger-300 hover:!bg-danger-50 hover:text-danger-800 focus:ring-danger-400 disabled:ring-danger-200 disabled:text-danger-300`,
      tertiary: tw`text-danger-700 hover:!bg-danger-50 disabled:text-danger-300`,
      tertiaryGray: tw`text-danger-700 hover:text-danger-800 hover:!bg-danger-50 disabled:text-danger-300`,
    }

    const colorWarning = {
      link: tw`text-warning-700 hover:text-warning-800 disabled:text-warning-300`,
      linkGray: tw`text-warning-700 hover:text-warning-800 disabled:text-warning-300`,
      primary: tw`!bg-warning-400 text-white hover:!bg-warning-500 disabled:!bg-warning-200 `,
      secondary: tw`!bg-warning-50 text-warning-700 hover:!bg-warning-100 disabled:!bg-warning-25 disabled:text-warning-300`,
      secondaryGray: tw`!bg-white text-warning-700 ring-1 ring-warning-300 hover:!bg-warning-50 hover:text-warning-800 focus:ring-warning-400 disabled:ring-warning-200 disabled:text-warning-300`,
      tertiary: tw`text-warning-700 hover:!bg-warning-50 disabled:text-warning-300`,
      tertiaryGray: tw`text-warning-700 hover:text-warning-800 hover:!bg-warning-50 disabled:text-warning-300`,
    }

    const isWarning = warning ? colorWarning : colorPrimary
    const isDanger = danger ? colorDanger : isWarning

    const roundeds = {
      none: tw`rounded-none`,
      sm: tw`rounded-sm`,
      md: tw`rounded-md`,
      lg: tw`rounded-lg`,
      xl: tw`rounded-xl`,
      full: tw`rounded-full`,
    }

    return { className: [tw`inline-flex items-center justify-center overflow-hidden whitespace-nowrap outline outline-transparent cursor-pointer focus:outline focus:outline-0 focus:outline-transparent`, size && sizes[size], noPadding && tw`!px-0`, variant && isDanger[variant], rounded && roundeds[rounded], wider === 'full' ? tw`w-full` : tw`w-fit`].filter(Boolean).join(' ') }
  })<ButtonWrapperProps>``

export const LinkWrapper = styled(ButtonWrapper).attrs({ as: 'a' })

type ButtonIconProps = {
  size: ButtonSize
}

export const ButtonIcon = styled.div.attrs<ButtonIconProps>(({ size }: ButtonIconProps) => ({ className: [tw`flex items-center justify-center`, size === '2xl' ? tw`w-6 h-6` : tw`w-5 h-5`].filter(Boolean).join(' ') }))<ButtonIconProps>``

type ButtonLabelProps = Pick<ButtonProps, 'wider' | 'fontWeight'>

export const ButtonLabel = styled.div.attrs<ButtonLabelProps>(({ wider, fontWeight }: ButtonLabelProps) =>  {
    const widers = {
      none: tw`px-0`,
      sm: tw`px-3`,
      md: tw`px-6`,
      lg: tw`px-9`,
      xl: tw`px-12`,
      full: tw`px-4`,
    }

    const fontWeightMap = {
      normal: tw`font-normal`,
      medium: tw`font-medium`,
      semibold: tw`font-semibold`,
      bold: tw`font-bold`,
    }

    return { className: [tw`flex items-center justify-center gap-x-2`, wider && widers[wider], fontWeight && fontWeightMap[fontWeight]].filter(Boolean).join(' ') }
  })<ButtonLabelProps>``
