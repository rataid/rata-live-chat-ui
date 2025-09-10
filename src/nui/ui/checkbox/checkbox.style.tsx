import tw, { TwStyle, styled } from 'twin.macro'

import { CheckboxIconProps, CheckboxMainProps, CheckboxRounded } from './types'

export const CheckboxWrapper = tw.div`relative inline-flex items-center justify-start min-w-fit gap-4 cursor-pointer`

export const CheckboxContainer = tw.div`relative flex items-center`

export const CheckboxLabel = tw.label`text-sm mr-6 font-medium text-gray-700 cursor-pointer`

const checkboxSizes: Record<string, TwStyle> = {
  sm: tw`h-4 w-4`,
  md: tw`h-5 w-5`,
}

export const CheckboxMain = styled.input<CheckboxMainProps>(
  ({ scale = 'md', rounded = 'md' }) => {
    const roundedCheckbox: Record<CheckboxRounded, TwStyle> = {
      none: tw`text-primary-600 checked:(bg-primary-50 border-primary-600) disabled:(text-gray-200 border-gray-200 cursor-not-allowed bg-gray-100 checked:(border-primary-600 bg-primary-50))`,
      sm: tw`text-primary-600 rounded-[4px] checked:(bg-primary-50 border-primary-600) disabled:(text-gray-200 border-gray-200 cursor-not-allowed bg-gray-100 checked:(border-primary-600 bg-primary-50))`,
      md: tw`text-primary-600 rounded-md checked:(bg-primary-50 border-primary-600) disabled:(text-gray-200 border-gray-200 cursor-not-allowed bg-gray-100 checked:(border-primary-600 bg-primary-50))`,
      full: tw`text-white rounded-full checked:(bg-primary-50 border-primary-600) disabled:(text-gray-200 bg-gray-200 cursor-not-allowed border-gray-100 checked:(border-primary-600 bg-primary-50))`,
    }

    return [
      tw`hover:(border-primary-600 bg-primary-50) cursor-pointer appearance-none border border-gray-200 focus:(border-primary-300 outline outline-none)`,
      scale && checkboxSizes[scale],
      rounded && roundedCheckbox[rounded],
    ]
  }
)

export const CheckboxIcon = styled.div<CheckboxIconProps>(
  ({ rounded = 'md' }) => {
    const roundedCheckbox: Record<CheckboxRounded, TwStyle> = {
      none: tw`text-primary-600`,
      sm: tw`text-primary-600`,
      md: tw`text-primary-600`,
      full: tw`text-white`,
    }

    return [
      tw`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 scale-0 transform justify-center duration-200 ease-in-out peer-checked:scale-100 pointer-events-none`,
      rounded && roundedCheckbox[rounded],
    ]
  }
)
