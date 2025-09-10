import tw, { css, styled } from 'twin.macro'

import { ColumnWrapperProps } from './types'

export const ColumnWrapper = styled.div<ColumnWrapperProps>(({ spacing }) => [
  tw`flex justify-between gap-4`,
  spacing &&
    css`
      gap: ${spacing};
    `,
])
