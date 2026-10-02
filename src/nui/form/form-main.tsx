import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export type FormMainProps = {
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const gapMap = {
  none: tw`gap-0`,
  xs: tw`gap-1`,
  sm: tw`gap-2`,
  md: tw`gap-4`,
  lg: tw`gap-6`,
  xl: tw`gap-8`,
  '2xl': tw`gap-10`,
}

export const FormMain = styled.div.attrs<FormMainProps>(({ gap = 'md' }) => ({ className: [tw`w-full flex flex-col`, gapMap[gap]].filter(Boolean).join(' ') }))<FormMainProps>``
