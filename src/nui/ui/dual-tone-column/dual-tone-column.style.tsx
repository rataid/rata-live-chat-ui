import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

// todo single
export const DualToneColumSingle = styled.div.attrs({ className: tw`flex items-center gap-x-4 w-full rounded-lg overflow-hidden` })``

export const DualToneColumWrapper = styled.div.attrs({ className: tw`w-full grid sm:grid-cols-2 place-items-start gap-8 rounded-lg` })``

type DualToneColumMainProps = {
  fit?: boolean
  noBackground?: boolean
}

export const DualToneColumMain = styled.div.attrs<DualToneColumMainProps>(({ fit, noBackground }) => ({ className: [noBackground ? tw`h-full` : tw`bg-gray-50 p-4`, fit ? tw`w-fit place-self-end` : tw`w-full`, tw`flex flex-col gap-6 rounded-lg`].filter(Boolean).join(' ') }))<DualToneColumMainProps>``
