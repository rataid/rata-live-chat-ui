import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ItemProps } from './types'

export const Item = styled.div.attrs<ItemProps>(({ basis }) => ({ className: [tw`grow shrink`].filter(Boolean).join(' ') }))<ItemProps>`
  ${({ basis }) => (!basis
    ? css`
        flex-basis: 0;
      `
    : css`
        flex-basis: ${basis.toString()};
      `)}
`

Item.defaultProps = { className: 'nui-item' }
