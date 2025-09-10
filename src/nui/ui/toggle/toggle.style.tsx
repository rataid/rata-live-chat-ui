import tw, { styled } from 'twin.macro'

import { ToggleStyleProps } from './types'

export const ToggleWrapper = tw.div`inline-flex items-center min-w-fit gap-2`

export const ToggleContent = tw.div`w-fit h-fit flex justify-center items-center`

export const ToggleLabel = tw.button`text-sm mr-6 font-medium cursor-default text-gray-700 disabled:(text-gray-400 cursor-not-allowed)`

export const ToggleAction = styled.button<ToggleStyleProps>(
  ({ variant, pressed, scale: size }) => {
    const sizes = {
      sm: tw`h-5 w-9`,
      md: tw`h-6 w-11`,
    }

    const variants = pressed
      ? {
          light: tw`!bg-primary-200`,
          dark: tw`!bg-primary-700`,
        }
      : {
          light: tw`!bg-primary-50 hover:bg-primary-100`,
          dark: tw`!bg-gray-100 hover:bg-gray-200`,
        }

    return [
      tw`inline-flex items-center rounded-full p-1 duration-300 ease-in-out focus:(outline-none border border-primary-400) disabled:(bg-gray-100 cursor-not-allowed)`,
      size && sizes[size],
      variant && variants[variant],
    ]
  }
)

export const ToggleMain = styled.div<ToggleStyleProps>(({ pressed, scale }) => {
  const sizes = pressed
    ? {
        sm: tw`h-4 w-4 translate-x-[0.84rem]`,
        md: tw`h-5 w-5 translate-x-[1.0625rem]`,
      }
    : {
        sm: tw`h-4 w-4 -translate-x-[1px]`,
        md: tw`h-5 w-5 -translate-x-[1px]`,
      }

  return [
    tw`rounded-full bg-white shadow duration-300 ease-in-out disabled:bg-gray-50`,
    scale && sizes[scale],
  ]
})
