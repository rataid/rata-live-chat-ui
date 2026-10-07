import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { SideBoxProps } from './types'

export const SideBoxContainer = styled.section.attrs({ className: tw`w-full flex flex-col gap-y-4 text-sm` })``

type SideBoxHeaderProps = Pick<SideBoxProps, 'inlineHeader'>

export const SideBoxHeader = styled.header.attrs<SideBoxHeaderProps>(({ inlineHeader }) => ({ className: [inlineHeader
      ? tw`flex items-center gap-y-2 justify-between`
      : tw`flex flex-col gap-y-0.5`].filter(Boolean).join(' ') }))<SideBoxHeaderProps>``

export const SideBoxMain = styled.main.attrs({ className: tw`` })``
