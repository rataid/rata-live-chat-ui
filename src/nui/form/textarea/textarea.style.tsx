import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'

export const TextareaWrapper = styled.div.attrs({
  className: tw`w-full flex flex-col gap-[6px]`,
})``

type TextareaMainProps = {
  isDanger?: boolean
}

export const TextareaMain = styled.div<TextareaMainProps>`
  > textarea {
    position: relative;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background-color: var(--nui-color-white);
    border-radius: 0.5rem;
    border: 1px solid var(--nui-color-gray-200);

    &:focus {
      outline: 2px solid var(--nui-color-transparent);
      outline-offset: 2px;
      color: var(--nui-color-gray-900);
      border-color: var(--nui-color-primary-400);
    }

    &:disabled {
      background-color: var(--nui-color-gray-50);
    }
  }

  ${({ isDanger }) =>
    isDanger &&
    css`
      > textarea {
        border-color: var(--nui-color-danger-200);

        &:focus {
          outline: 2px solid var(--nui-color-transparent);
          outline-offset: 2px;
          border-color: var(--nui-color-danger-400);
        }
      }
    `}
`
