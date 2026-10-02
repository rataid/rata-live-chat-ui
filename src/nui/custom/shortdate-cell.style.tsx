import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type ShortdateCellProps = { primary?: boolean }

export const ShortdateCellWrapper = styled.div.attrs({ className: tw`flex xl:flex-col xl:items-center xl:justify-center justify-end` })``

export const ShortdateCellContainer = styled.div.attrs<ShortdateCellProps>(({ primary }) => ({ className: [!primary
      ? tw`text-xs xl:text-sm text-gray-500 font-semibold`
      : tw`text-xs xl:text-sm text-primary-600 font-semibold`].filter(Boolean).join(' ') }))<ShortdateCellProps>``

export const ShortdateCellMain = styled.div.attrs<ShortdateCellProps>(({ primary }) => ({ className: [!primary
      ? tw`text-xs font-semibold text-gray-500 xl:text-2xs xl:font-normal xl:text-gray-400 whitespace-nowrap`
      : tw`text-xs font-semibold text-primary-600 xl:text-2xs xl:font-normal xl:text-primary-500 whitespace-nowrap`].filter(Boolean).join(' ') }))<ShortdateCellProps>``
