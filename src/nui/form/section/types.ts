export type FormSectionProps = {
  caption?: string | React.ReactNode
  more?: React.ReactNode
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  spacingHead?: string
} & React.PropsWithChildren

export type FormSectionMainProps = Pick<FormSectionProps, 'gap'>

export type FormSectionHeaderProps = Pick<FormSectionProps, 'spacingHead'>
