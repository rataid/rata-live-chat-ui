export type getParams = {
  search?: string
  page?: number
  limit?: number
  isActive?: boolean | undefined
  status?: string
}

// Same as the backend BaseResponseDto
export type ApiResponse<T = any> = {
  success: boolean
  statusCode?: number
  data?: T
  message?: string
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
