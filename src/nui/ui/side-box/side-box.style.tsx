import tw, { styled } from 'twin.macro'

import { SideBoxProps } from './types'

export const SideBoxContainer = tw.section`w-full flex flex-col gap-y-4 text-sm`

type SideBoxHeaderProps = Pick<SideBoxProps, 'inlineHeader'>

export const SideBoxHeader = styled.header<SideBoxHeaderProps>(
  ({ inlineHeader }) => [
    inlineHeader
      ? tw`flex items-center gap-y-2 justify-between`
      : tw`flex flex-col gap-y-0.5`,
  ]
)

export const SideBoxMain = tw.main``
