import tw, { css, styled } from 'twin.macro'

import { useTree } from '../hooks'

export const TreeAltWrapper = styled.div(() => {
  const { nodeHeight, gap } = useTree()

  return [
    tw`relative`,
    css`
      > ul > li:first-child::after {
        margin-top: ${nodeHeight - gap}px;
      }
    `,
  ]
})
