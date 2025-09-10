import tw, { styled } from 'twin.macro'

import { RadioProps } from './types'

export const RadioWrapper = tw.div`inline-flex relative h-fit items-center gap-2`

export const RadioControl = tw.div`relative flex gap-x-2 items-center justify-center`

export const RadioInput = styled.input<RadioProps>(
  ({ scale = 'sm', variant = 'primary' }) => {
    const scalesMap = {
      xs: tw`h-3 w-3`,
      sm: tw`h-4 w-4`,
      md: tw`h-5 w-5`,
      lg: tw`h-6 w-6`,
      xl: tw`h-7 w-7`,
    }

    const variantMap = {
      primary: tw`checked:border-primary-600 focus:(border-primary-600)`,
      danger: tw`checked:border-danger-600 focus:(border-danger-600)`,
      success: tw`checked:border-success-600 focus:(border-success-600)`,
      warning: tw`checked:border-warning-600 focus:(border-warning-600)`,
      gray: tw`checked:border-gray-600 focus:(border-gray-600)`,
    }

    return [
      tw`appearance-none rounded-full border transition-colors hover:border-gray-400 border-gray-300 disabled:border-gray-300 cursor-pointer focus:(outline outline-0) disabled:cursor-not-allowed`,
      scalesMap[scale],
      variantMap[variant],
    ]
  }
)

export const RadioCheck = styled.div<RadioProps>(
  ({ scale = 'sm', variant = 'primary' }) => {
    const scaleMap = {
      xs: tw`h-1 w-1`,
      sm: tw`h-1.5 w-1.5 bottom-[0.3125rem]`,
      md: tw`h-2 w-2`,
      lg: tw`h-2.5 w-2.5`,
      xl: tw`h-3 w-3`,
    }

    const variantMap = {
      primary: tw`bg-primary-600`,
      danger: tw`bg-danger-600`,
      success: tw`bg-success-600`,
      warning: tw`bg-warning-600`,
      gray: tw`bg-gray-600`,
    }

    return [
      tw`pointer-events-none absolute left-1/2 -translate-x-1/2 scale-0 transform rounded-full duration-200 ease-in-out peer-checked:scale-100`,
      scaleMap[scale],
      variantMap[variant],
    ]
  }
)
type RadioLabelProps = {
  disabled?: boolean
}

export const RadioLabel = styled.label<RadioLabelProps>(({ disabled }) => [
  disabled ? tw`cursor-not-allowed` : tw`cursor-pointer`,
  tw`absolute inset-0`,
])

type RadioMainProps = {
  disabled?: boolean
}

export const RadioMain = styled.div<RadioMainProps>(({ disabled }) => [
  disabled
    ? tw`cursor-not-allowed text-gray-300`
    : tw`cursor-pointer text-gray-700`,
  tw`text-sm font-medium w-full`,
])
