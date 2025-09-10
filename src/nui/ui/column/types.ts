export type ColumnProps = {
  spacing?: string
} & React.PropsWithChildren

export type ColumnWrapperProps = Pick<ColumnProps, 'spacing'>
