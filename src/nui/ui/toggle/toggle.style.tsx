import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ToggleStyleProps } from './types'

export const ToggleWrapper = styled.div.attrs({ className: tw`inline-flex items-center min-w-fit gap-2` })``

export const ToggleContent = styled.div.attrs({ className: tw`w-fit h-fit flex justify-center items-center` })``

export const ToggleLabel = styled.button.attrs({ className: tw`text-sm mr-6 font-medium cursor-default text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed` })``

export const ToggleAction = styled.button.attrs<ToggleStyleProps>(({ variant, pressed, scale: size }) =>  {
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

    return { className: [tw`inline-flex items-center rounded-full p-1 duration-300 ease-in-out focus:outline-none focus:border focus:border-primary-400 disabled:bg-gray-100 disabled:cursor-not-allowed`, size && sizes[size], variant && variants[variant]].filter(Boolean).join(' ') }
  })<ToggleStyleProps>``

export const ToggleMain = styled.div.attrs<ToggleStyleProps>(({ pressed, scale }) =>  {
  const sizes = pressed
    ? {
        sm: tw`h-4 w-4 translate-x-[0.84rem]`,
        md: tw`h-5 w-5 translate-x-[1.0625rem]`,
      }
    : {
        sm: tw`h-4 w-4 -translate-x-[1px]`,
        md: tw`h-5 w-5 -translate-x-[1px]`,
      }

  return { className: [tw`rounded-full bg-white shadow duration-300 ease-in-out disabled:bg-gray-50`, scale && sizes[scale]].filter(Boolean).join(' ') }
})<ToggleStyleProps>``
