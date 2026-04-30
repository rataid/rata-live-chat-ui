import { Paginated, PaginatedCardProps } from '@nui/pagination'
import { PAGINATION_CARD_PERPAGES } from '@nui/pagination/config'

import PaginatedCardData from './card-data'

export function PaginatedCard({
  cols,
  query,
  args,
  filter,
  title,
  more,
  selected,
  renderItem,
  itemLink,
  onItemClick,
}: PaginatedCardProps) {
  return (
    <Paginated
      // key={query}
      query={query}
      args={args}
      filter={filter}
      title={title}
      more={more}
      selected={selected}
      perPages={PAGINATION_CARD_PERPAGES}
    >
      <PaginatedCardData {...{ cols, renderItem, itemLink, onItemClick }} />
    </Paginated>
  )
}
