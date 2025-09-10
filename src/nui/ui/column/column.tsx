import { ColumnWrapper } from './column.style'
import { ColumnProps } from './types'

export function Column({ spacing = '3rem', children }: ColumnProps) {
  return <ColumnWrapper spacing={spacing}>{children}</ColumnWrapper>
}
