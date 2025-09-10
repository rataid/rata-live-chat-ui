import { DivPropsWithoutRef } from '@nui/types'

export type FeaturedIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FeaturedIconRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type FeaturedIconVariant =
  | 'primary'
  | 'primaryDark'
  | 'gray'
  | 'grayDark'
  | 'danger'
  | 'dangerDark'
  | 'warning'
  | 'warningDark'
  | 'success'
  | 'successDark'

export type FeaturedIconProps = {
  size?: FeaturedIconSize
  variant?: FeaturedIconVariant
  rounded?: FeaturedIconRounded
  outline?: boolean
  icon: React.ReactNode | string
} & DivPropsWithoutRef

export type FeaturedIconMainProps = Pick<
  FeaturedIconProps,
  'size' | 'variant' | 'rounded' | 'outline'
>
