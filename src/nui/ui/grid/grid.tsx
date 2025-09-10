import { GridWrapper } from './grid.style'
import { GridProps } from './types'

export function Grid({ cols, gap = 6, children }: GridProps) {
  return (
    <GridWrapper cols={cols} gap={gap}>
      {children}
    </GridWrapper>
  )
}
