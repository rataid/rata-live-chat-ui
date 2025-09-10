type CheckIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type CheckIconVariants = 'primary' | 'gray' | 'success'

export type CheckIconProps = {
  size?: CheckIconSize
  variant?: CheckIconVariants
  icon?: React.ReactNode
}

export type CheckIconWrapperProps = Pick<CheckIconProps, 'size' | 'variant'>
