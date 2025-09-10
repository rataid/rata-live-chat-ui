export type SpacingSection = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type MarginSection = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type SectionProps = {
  spacing?: SpacingSection
  caption?: string | React.ReactNode
  more?: React.ReactNode
  margin?: MarginSection
} & React.PropsWithChildren
