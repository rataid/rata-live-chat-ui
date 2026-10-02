import styled, { css } from 'styled-components'

import { useTree } from '../hooks'
import { TreeChildrenProps } from '../types'

export const TreeChildrenWrapper = styled.ul<TreeChildrenProps>(
  ({ isRoot }) => {
    const { gap } = useTree()

    return [
      css`
        position: relative;
        list-style: none;
        padding: 0px 0 0 36px;

        & > li:first-child {
          margin-top: 0;
          padding-top: 24px;

          &::before {
            top: ${gap}px;
          }
        }

        & > li:last-child {
          padding-bottom: 0;
        }

        & > li:last-child::after {
          height: 49px;
        }
      `,
    ]
  }
)
