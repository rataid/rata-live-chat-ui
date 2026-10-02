import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type DialogHeadingProps = {
  inline?: boolean
}

export const DialogHeadingMain = styled.div.attrs<DialogHeadingProps>(({ inline = false }) => ({ className: [inline && tw`flex items-center justify-between`].filter(Boolean).join(' ') }))<DialogHeadingProps>``

export const DialogHeadingWrapper = styled.div.attrs({ className: tw`sticky top-0 pt-4 xl:pt-8 pb-6 z-30 bg-white` })``

export const DialogHeadingTitle = styled.div.attrs({ className: tw`text-2xl text-gray-900 font-semibold tracking-tight` })``

export const DialogHeadingBody = styled.div.attrs<DialogHeadingProps>(({ inline = false }) => ({ className: [!inline && tw`pt-2`, tw`text-sm text-gray-500`].filter(Boolean).join(' ') }))<DialogHeadingProps>``
