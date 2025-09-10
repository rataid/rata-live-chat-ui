import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'

import { PaginatedCardDataProps, usePagination } from '@nui/pagination'
import Grid from '@nui/ui/grid'
import { key } from '@utils'

import { CardDataEmpty, CardDataItem } from './card-data.style'

export default function PaginatedCardData<T extends { id: any }>({
  cols,
  renderItem,
  itemLink,
  onItemClick,
}: PaginatedCardDataProps) {
  const navigate = useNavigate()

  const [data, selectedRows, toggleSelect] = usePagination(
    (s) => [s.data, s.selectedRows, s.toggleSelect],
    shallow
  )

  const items = (data?.nodes ?? []) as T[]

  const handleItemClick = (item: T) => {
    // First check if itemLink is defined, if so, navigate to the link
    if (itemLink) {
      navigate(itemLink(item))
    }
    // If not, check if onItemClick is defined, if so, call it
    else if (onItemClick) {
      onItemClick(item)
    }
    // Otherwise, toggle the item selection
    else {
      toggleSelect(item)
    }
  }
  return items.length > 0 ? (
    <Grid cols={cols}>
      {items.map((item: T) => {
        const isSelected = selectedRows.some(
          (selectedRow) => selectedRow.id === item.id
        )

        return (
          <CardDataItem
            key={key(item.id)}
            role="button"
            tabIndex={0}
            isSelected={isSelected}
            onClick={() => handleItemClick(item)}
            onKeyDown={() => handleItemClick(item)}
          >
            {renderItem(item, isSelected)}
          </CardDataItem>
        )
      })}
    </Grid>
  ) : (
    <CardDataEmpty>No data available</CardDataEmpty>
  )
}
