import ChartDanger from '@/assets/svg/chart-danger'
import ChartSuccess from '@/assets/svg/chart-success'
import Box from '@nui/ui/box'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import Item from '@nui/ui/item'
import Typo from '@nui/ui/typo'

import {
  MetricItemHeader,
  MetricItemMain,
  MetricItemPercent,
  MetricItemTotal,
  MetricItemWrapper,
} from './metric-item.style'

type MetricItemProps = {
  title?: string
  onClick?: () => void
  total?: number
  percent?: number
  chartUp?: boolean
}

export default function MetricItem({
  title,
  onClick,
  total,
  percent = 0,
  chartUp = false,
}: MetricItemProps) {
  return (
    <Item>
      <Box flow="column" padding="lg">
        <MetricItemHeader>
          <Typo size="md" fontWeight="medium" color="gray-900">
            {title}
          </Typo>
          <Button
            className="-mr-3.5"
            noPadding
            variant="linkGray"
            onClick={onClick}
            icon="lucide-more-vertical"
          />
        </MetricItemHeader>
        <MetricItemWrapper>
          <MetricItemTotal>
            <Typo size="3xl" fontWeight="semibold" color="gray-900">
              {total}
            </Typo>
            {chartUp ? <ChartSuccess /> : <ChartDanger />}
          </MetricItemTotal>
          <MetricItemMain>
            <MetricItemPercent chartUp={chartUp}>
              <Icon
                stroke="lg"
                icon={chartUp ? 'lucide-arrow-up' : 'lucide-arrow-down'}
              />
              <Typo
                fontWeight="medium"
                color={chartUp ? 'success-700' : 'danger-700'}
              >
                {percent}%
              </Typo>
            </MetricItemPercent>
            <Typo fontWeight="medium" color="gray-500">
              vs last month
            </Typo>
          </MetricItemMain>
        </MetricItemWrapper>
      </Box>
    </Item>
  )
}
