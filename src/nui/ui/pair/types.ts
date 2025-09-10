export type PairProps = {
  gapX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  gapY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  separator?: string
  divide?: boolean
} & React.PropsWithChildren
