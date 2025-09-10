import { PairMain, PairWrapper } from './pair.style'
import { PairProps } from './types'

// Display key value pair in a row with uniform key width
// Use Entry component as item

export function Pair({
  gapX,
  gapY,
  separator,
  fontSize,
  divide,
  children,
}: PairProps) {
  return (
    <PairWrapper
      fontSize={fontSize}
      gapX={gapX}
      gapY={gapY}
      separator={separator}
    >
      <PairMain divide={divide}>{children}</PairMain>
    </PairWrapper>
  )
}
