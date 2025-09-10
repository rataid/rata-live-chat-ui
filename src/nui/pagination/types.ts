import { TableProps } from '@nui/table'
import { GridCols } from '@nui/ui/grid'

// Store
export type PaginationProps = {
  initArgs?: any
}

export type PaginationState = {
  name?: string
  args?: any
  arrArgs: any[]
  filter: any
  currentPage: number
  searchQuery: string
  perPage: number
  selectedRows: any[]
  selectedId: string
  isSelectedAll: boolean
  data: any
  isLoading: boolean
  isFetching: boolean
} & PaginationProps

export type PaginationAction = {
  setName: (name: string) => void
  setInitArgs: (args: any) => void
  setInitState: (state: any) => void
  reset: (args: any) => void
  setArgs: (args: any) => void
  rebuildArgs: () => void
  setFilter: (fn: any) => void
  setCurrentPage: (currentPage: number) => void
  setPerPage: (perPage: number) => void
  setSearchQuery: (searchQuery: string) => void
  prev: () => void
  next: () => void
  toggleSelect: (row: any) => void
  selected: (row: any) => void
  selectAll: () => void
  isSelected: (id: any) => boolean
  clearSelections: () => void
  setData: (data: any) => void
  setIsLoading: (isLoading: boolean) => void
  setIsFetching: (isFetching: boolean) => void
}

// Provider
export type PaginationProviderProps = React.PropsWithChildren<PaginationProps>

// Components
export type PaginationFooterProps = {
  perPages?: number[]
  hideSelected?: boolean
}

// Paginated Table
export type PaginationPerPageOption = {
  value: number
  label: string
}

export type PaginationHeaderProps = {
  title?: React.ReactNode
  more?: React.ReactNode
  selected?: React.ReactNode
  placeholder?: string
  summary?: React.ReactNode
}

export type PaginationHeaderWithoutSearchProps = {
  title?: React.ReactNode
  selected?: React.ReactNode
}

// Paginated view component
export type PaginatedProps = {
  name?: string
  query: any
  args?: any
  filter?: any
  title?: React.ReactNode
  more?: React.ReactNode
  selected?: JSX.Element
  hideSelected?: boolean
  perPages?: number[]
  placeholder?: string
  showPagination?: boolean
} & React.PropsWithChildren

// Paginated table component
export type PaginatedTableDataProps = {
  columns?: TableProps<any>['columns']
  disabled?: (row: any) => boolean
  disabledViewRow?: (row: any) => boolean
  rowLink?: (row: any) => string
  onRowClick?: (row: any) => void
}

export type PaginatedTableProps = PaginatedProps & PaginatedTableDataProps

export type PaginatedTableSelectedProps = {
  hideDelete?: boolean
} & React.PropsWithChildren

// Paginated card component

export type PaginatedCardDataProps = {
  cols?: GridCols
  renderItem: (item: any, isSelected?: boolean) => React.ReactNode
  itemLink?: (item: any) => string
  onItemClick?: (item: any) => void
}

export type PaginatedCardProps = PaginatedProps & PaginatedCardDataProps

export type PaginatedCardItemProps = React.PropsWithChildren
