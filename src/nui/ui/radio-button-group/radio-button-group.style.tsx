import tw, { css, styled } from 'twin.macro'

import { RadioButtonGroupActionProps } from './types'

export const RadioButtonGroupAction = styled.div<RadioButtonGroupActionProps>(
  ({ isActive }) => [
    isActive && tw`bg-primary-50`,
    !isActive && tw`bg-white`,
    tw`border-r border-gray-200 relative last:border-none flex items-center flex-col`,
    css`
      button {
        ${isActive && tw`text-primary-900 font-semibold`}
        div {
          ${!isActive && tw`text-gray-700 font-medium`}
        }
      }
    `,
  ]
)

export const RadioButtonGroupActionOverlay = tw.label`absolute inset-0 cursor-pointer`
