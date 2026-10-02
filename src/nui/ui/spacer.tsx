import styled from 'styled-components'
import { tw, TwStyle } from '@nui/utils/tw'

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const spaces: Record<SpacerSize, TwStyle> = {
  xs: tw`h-2`,
  sm: tw`h-4`,
  md: tw`h-6`,
  lg: tw`h-8`,
  xl: tw`h-12`,
}

export type SpacerProps = {
  size?: SpacerSize
}

const Spacer = styled.div.attrs<SpacerProps>(({ size = 'md' }: SpacerProps) => ({ className: [tw`flex justify-center items-center w-full`, spaces[size]].filter(Boolean).join(' ') }))<SpacerProps>``

export default Spacer
