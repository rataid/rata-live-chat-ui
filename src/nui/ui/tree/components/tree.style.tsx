import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

import { useTree } from '../hooks'

export const TreeAltWrapper = styled.div.attrs(() => ({
  className: tw`relative`,
}))`
  ${() => {
    const { nodeHeight, gap } = useTree()

    return css`
      > ul > li:first-child::after {
        margin-top: ${nodeHeight - gap}px;
      }
    `
  }}
`
