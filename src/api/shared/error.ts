import { isAxiosError } from 'axios'

import { ApiResponse } from '@/model/shared/query'

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong, please try again'
) {
  if (isAxiosError<ApiResponse>(error)) {
    return error.response?.data?.message || fallback
  }

  return fallback
}
