import { DivPropsWithoutRef } from '@nui/types'

export type FabtipGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type FabtipProps = {
  src?: string
  alt?: string
  gap?: FabtipGap
} & React.PropsWithChildren &
  DivPropsWithoutRef
