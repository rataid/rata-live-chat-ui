import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { RadioButtonGroupActionProps } from './types'

export const RadioButtonGroupAction = styled.div.attrs<RadioButtonGroupActionProps>(({ isActive }) => ({ className: [isActive && tw`bg-primary-50`, !isActive && tw`bg-white`, tw`border-r border-gray-200 relative last:border-none flex items-center flex-col`].filter(Boolean).join(' ') }))<RadioButtonGroupActionProps>`
  ${({ isActive }) => css`
      button {
        ${isActive &&
        css`
          color: var(--nui-color-primary-900);
          font-weight: 600;
        `}
        div {
          ${!isActive &&
          css`
            color: var(--nui-color-gray-700);
            font-weight: 500;
          `}
        }
      }
    `}
`

export const RadioButtonGroupActionOverlay = styled.label.attrs({ className: tw`absolute inset-0 cursor-pointer` })``
