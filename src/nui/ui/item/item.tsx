import tw, { css, styled } from 'twin.macro'

import { ItemProps } from './types'

export const Item = styled.div<ItemProps>(({ basis }) => [
  tw`grow shrink`,
  !basis
    ? tw`basis-0`
    : css`
        flex-basis: ${basis.toString()};
      `,
])

Item.defaultProps = { className: 'nui-item' }
