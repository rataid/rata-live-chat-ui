// Mobile first grid columns
export type GridCols = {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

export type GridProps = {
  cols?: GridCols
  gap?: number
} & React.PropsWithChildren
