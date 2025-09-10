import tw, { styled } from 'twin.macro'

export const MetricItemHeader = tw.div`flex items-center justify-between pb-6`

export const MetricItemWrapper = tw.div`flex flex-col gap-y-2`

export const MetricItemTotal = tw.div`flex justify-between items-end`

export const MetricItemMain = tw.div`flex gap-x-2`

type MetricItemPercentProps = {
  chartUp?: boolean
}

export const MetricItemPercent = styled.div(
  ({ chartUp }: MetricItemPercentProps) => [
    chartUp ? tw`text-success-500` : tw`text-danger-500`,
    tw`flex gap-x-1`,
  ]
)
