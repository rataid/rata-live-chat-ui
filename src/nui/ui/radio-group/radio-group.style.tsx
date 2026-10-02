import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { RadioGroupProps } from './types'

const flexMap = {
  row: tw`flex flex-row h-10 leading-10 items-center gap-6`,
  column: tw`flex flex-col gap-4`,
}
export const RadioGroupWrapper = styled.div.attrs<Pick<RadioGroupProps, 'flow'>>(({ flow }) => ({ className: [flow && flexMap[flow]].filter(Boolean).join(' ') }))<Pick<RadioGroupProps, 'flow'>>``

export const RadioGroupTitle = styled.div.attrs({ className: tw`text-sm font-semibold text-gray-900` })``
