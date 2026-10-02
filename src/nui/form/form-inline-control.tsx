import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type FormInlineControlProps = {
  error?: boolean
}

export const FormInlineControl = styled.div.attrs<FormInlineControlProps>(({ error }) => ({ className: [tw`rounded-lg border border-dashed border-red-500`, !error ? tw`border-gray-200` : tw`border-red-500`].filter(Boolean).join(' ') }))<FormInlineControlProps>``
