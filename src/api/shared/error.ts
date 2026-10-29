import { isAxiosError } from 'axios'

import { ApiResponse } from '@/model/shared/query'
import { showToast } from '@nui/ui/toast'

type ApiErrorResponse = ApiResponse & { code?: string }

// Shown by handleApiError for any 5xx instead of the backend's message
export const SERVER_ERROR_MESSAGE =
  'Terjadi kesalahan pada sistem, coba lagi beberapa saat kemudian.'

// The response of a failed API call: the body (data) and the HTTP status
function getApiErrorResponse(error: unknown) {
  return isAxiosError<ApiErrorResponse>(error) ? error.response : undefined
}

export function getApiErrorMessage(
  error: unknown,
  fallback = SERVER_ERROR_MESSAGE
) {
  return getApiErrorResponse(error)?.data?.message || fallback
}

type ApiErrorHandlers<R> = {
  title: string
  fallback?: string
  code?: Partial<Record<string, () => R>>
  status?: Partial<Record<number, () => R>>
}

// Handler by code first, then by status; otherwise an error toast with the
// backend's message, or the general message for 5xx. Returns undefined
// then, so the caller returns its default (e.g. `?? { success: false }`)
export function handleApiError<R>(
  error: unknown,
  { title, fallback, code, status }: ApiErrorHandlers<R>
): R | undefined {
  const response = getApiErrorResponse(error)

  const byCode = code?.[response?.data?.code ?? '']
  if (byCode) return byCode()

  const byStatus = status?.[response?.status ?? 0]
  if (byStatus) return byStatus()

  showToast({
    type: 'error',
    title,
    message:
      (response?.status ?? 0) >= 500
        ? SERVER_ERROR_MESSAGE
        : getApiErrorMessage(error, fallback),
  })
  return undefined
}
