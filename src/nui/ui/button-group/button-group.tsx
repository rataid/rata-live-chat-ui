import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type ButtonGroupProps = {
  fit?: boolean
}

export const ButtonGroup = styled.div.attrs<ButtonGroupProps>(({ fit }) => ({ className: [!fit ? tw`sm:w-fit w-full` : tw`w-fit`, tw`flex items-center overflow-auto h-fit rounded-lg border border-gray-200`].filter(Boolean).join(' ') }))<ButtonGroupProps>``
