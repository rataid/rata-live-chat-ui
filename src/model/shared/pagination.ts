interface MetaPagination {
  currentPage: number
  itemsPerPage: number
  sortBy: string
  totalItems: number
  totalPages: number
}

export interface FetchResult<T> {
  status?: string
  data?: T[]
  meta?: MetaPagination
  error?: string
}

// Cursor pagination from the backend: { nodes, pageInfo, totalCount, ... },
// same as crboard's BasePaginated + nodes
export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export type Paginated<T> = {
  nodes: T[]
  pageInfo: PageInfo
  totalCount: number
  totalPages: number
}
