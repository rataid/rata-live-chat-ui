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
