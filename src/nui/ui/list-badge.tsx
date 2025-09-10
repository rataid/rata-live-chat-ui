import Badge, { BadgeColor } from './badge'
import { ListBadgeProps } from './list-badge.type'

export default function ListBadge({ items, children }: ListBadgeProps) {
  const index = items.findIndex((item) => item === children)

  const colorMap = [
    'gray',
    'primary',
    'indigo',
    'orange',
    'pink',
    'purple',
    'rose',
    'blue',
  ]

  return <Badge color={colorMap[index] as BadgeColor}>{children}</Badge>
}
