import { Maybe } from '@gql/graphql'

export type ContactInfoSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ContactInfoProps = {
  src?: string
  alt?: string
  name?: string
  address?: React.ReactNode
  phone?: string
  type?: 'person' | 'building'
  size?: ContactInfoSize
  nameSemibold?: boolean
  email?: string
  isDoctorRecommendedForAds?: Maybe<boolean>
} & React.PropsWithChildren
