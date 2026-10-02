import styled, { css } from 'styled-components'

import { DEFAULT_HEIGHT } from '../config'
import { useTree } from '../hooks'
import { TreeNodeProps } from '../types'

export const TreeNodeWrapper = styled.li<TreeNodeProps>(
  ({ height = DEFAULT_HEIGHT }) => {
    const { gap } = useTree()

    return [
      css`
        --clt-line-color: rgb(158 119 237 / 1);

        position: relative;
        padding: ${gap / 2}px 0;

        &::before,
        &::after {
          content: '';
          position: absolute;
          left: -18px;
          margin-top: ${height / 2 - gap / 2}px;
        }

        &::before {
          border-top: 1px solid var(--clt-line-color);
          top: ${gap / 2}px;
          width: 18px;
          height: 3px;
          background: var(--nui-color-neutral-300);
        }

        &::after {
          border-left: 1px solid var(--clt-line-color);
          height: 100%;
          width: 3px;
          background: var(--nui-color-neutral-300);
          top: -${height / 2 - 12}px;
        }
      `,
    ]
  }
)
