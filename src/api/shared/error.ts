import { isAxiosError } from 'axios'

import { ApiResponse } from '@/model/shared/query'
import { showToast } from '@nui/ui/toast'

// Error bodies may carry a machine-readable code, e.g. OTP_SEND_FAILED
type ApiErrorResponse = ApiResponse & { code?: string }

// Shown by showApiErrorToast for any 5xx instead of the backend's message
export const SERVER_ERROR_MESSAGE =
  'Terjadi kesalahan pada sistem, coba lagi beberapa saat kemudian.'

// The error response body; T adds endpoint-specific fields,
// e.g. getApiError<{ retryAfterSeconds?: number }>(error)
export function getApiError<T = object>(error: unknown) {
  if (isAxiosError<ApiErrorResponse & T>(error)) {
    return error.response?.data
  }

  return undefined
}

export function getApiErrorMessage(
  error: unknown,
  fallback = SERVER_ERROR_MESSAGE
) {
  return getApiError(error)?.message || fallback
}

export function getApiErrorCode(error: unknown) {
  return getApiError(error)?.code
}

// Error toast for a failed API call: the backend's message, or a general
// message for 5xx
export function showApiErrorToast(
  error: unknown,
  { title, fallback }: { title: string; fallback?: string }
) {
  const isServerError =
    isAxiosError(error) && (error.response?.status ?? 0) >= 500

  showToast({
    type: 'error',
    title,
    message: isServerError
      ? SERVER_ERROR_MESSAGE
      : getApiErrorMessage(error, fallback),
  })
}
