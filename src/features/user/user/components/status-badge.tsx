import Badge, { BadgeSize } from '@nui/ui/badge'

type UserStatusBadgeProps = {
  isActive: boolean
  size?: BadgeSize
}

export default function UserStatusBadge({
  isActive,
  size = 'sm',
}: UserStatusBadgeProps) {
  const color = isActive ? 'success' : 'danger'

  const title = isActive ? 'Active' : 'Inactive'

  return (
    <Badge size={size} color={color}>
      {title}
    </Badge>
  )
}
