import tw, { TwStyle, css, styled } from 'twin.macro'

import { GridCols, GridProps } from './types'

const defaultCols: GridCols = {
  sm: 2,
  md: 2,
  lg: 2,
  xl: 3,
  '2xl': 4,
}

const gapMap: Record<number, TwStyle> = {
  0: tw`gap-0`,
  1: tw`gap-1`,
  2: tw`gap-2`,
  3: tw`gap-3`,
  4: tw`gap-4`,
  5: tw`gap-5`,
  6: tw`gap-6`,
  7: tw`gap-7`,
  8: tw`gap-8`,
}

export const GridWrapper = styled.div<GridProps>(
  ({ cols: colsValue, gap = 6 }) => {
    const cols = colsValue ?? defaultCols

    return [
      tw`grid`,
      gapMap[gap],
      css`
        /* Always apply default cols-1 for sm as fallback */
        @media (min-width: 640px) {
          grid-template-columns: repeat(${cols?.sm ?? 1}, minmax(0, 1fr));
        }

        ${cols?.md &&
        `@media (min-width: 768px) {
          grid-template-columns: repeat(${cols?.md}, minmax(0, 1fr));
        }`}

        ${cols?.lg &&
        `@media (min-width: 1024px) {
          grid-template-columns: repeat(${cols?.lg}, minmax(0, 1fr));
        }`}

        ${cols?.xl &&
        `@media (min-width: 1280px) {
          grid-template-columns: repeat(${cols?.xl}, minmax(0, 1fr));
        }`}

        ${cols?.['2xl'] &&
        `@media (min-width: 1536px) {
          grid-template-columns: repeat(${cols?.['2xl']}, minmax(0, 1fr));
        }`}
      `,
    ]
  }
)
