import { Brand } from '@/constants/brand'
import { getTips } from '@/data/tips'
import Icon from '@nui/ui/icon'

import {
  TipsCard,
  TipsColumn,
  TipsColumnLabel,
  TipsColumns,
  TipsDescription,
  TipsItem,
  TipsList,
  TipsNote,
  TipsTitle,
} from './home.style'

export function BrandTips({ brand }: { brand: Brand }) {
  const tips = getTips(brand)

  if (!tips) return null

  return (
    <TipsCard>
      <div>
        <TipsTitle>{tips.title}</TipsTitle>
        <TipsDescription>{tips.description}</TipsDescription>
      </div>
      <TipsColumns>
        <TipsColumn>
          <TipsColumnLabel $tone="do">{tips.dos.label}</TipsColumnLabel>
          <TipsList>
            {tips.dos.items.map((item) => (
              <TipsItem key={item}>
                <Icon
                  icon="lucide-check"
                  size="xs"
                  className="mt-0.5 shrink-0 text-success-600"
                />
                {item}
              </TipsItem>
            ))}
          </TipsList>
        </TipsColumn>
        <TipsColumn>
          <TipsColumnLabel $tone="dont">{tips.donts.label}</TipsColumnLabel>
          <TipsList>
            {tips.donts.items.map((item) => (
              <TipsItem key={item}>
                <Icon
                  icon="lucide-x"
                  size="xs"
                  className="mt-0.5 shrink-0 text-danger-600"
                />
                {item}
              </TipsItem>
            ))}
          </TipsList>
        </TipsColumn>
      </TipsColumns>
      {tips.note && <TipsNote>{tips.note}</TipsNote>}
    </TipsCard>
  )
}
