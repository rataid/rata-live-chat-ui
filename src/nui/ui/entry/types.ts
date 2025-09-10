export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export type EntryProps = {
  name: React.ReactNode | string
  fontWeight?: FontWeight
} & React.PropsWithChildren
