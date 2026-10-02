import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const MetricItemHeader = styled.div.attrs({ className: tw`flex items-center justify-between pb-6` })``

export const MetricItemWrapper = styled.div.attrs({ className: tw`flex flex-col gap-y-2` })``

export const MetricItemTotal = styled.div.attrs({ className: tw`flex justify-between items-end` })``

export const MetricItemMain = styled.div.attrs({ className: tw`flex gap-x-2` })``

type MetricItemPercentProps = {
  chartUp?: boolean
}

export const MetricItemPercent = styled.div.attrs<MetricItemPercentProps>(({ chartUp }: MetricItemPercentProps) => ({ className: [chartUp ? tw`text-success-500` : tw`text-danger-500`, tw`flex gap-x-1`].filter(Boolean).join(' ') }))<MetricItemPercentProps>``
