import Icon from '../icon'
import { SeparatorMain } from './separator.style'
import { SeparatorProps } from './types'

export function Separator({ children }: SeparatorProps) {
  if (children) return <SeparatorMain>{children}</SeparatorMain>

  return (
    <SeparatorMain>
      <Icon size="xl" icon="tabler:separator" />
      <Icon size="xl" icon="tabler:separator" />
    </SeparatorMain>
  )
}
