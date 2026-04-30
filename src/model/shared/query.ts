export type getParams = {
  search?: string
  page?: number
  limit?: number
  isActive?: boolean | undefined
  status?: string
}

export type ApiResponse<T = any> = {
  statusCode?: number
  status: string
  message: string
  data: T
  meta?: {
    currentPage: number
    itemsPerPage: number
    sortBy: string
    totalItems: number
    totalPages: number
  }
}

export interface Meta {
  perPage: number
  currentPage: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  totalPages: number
}
