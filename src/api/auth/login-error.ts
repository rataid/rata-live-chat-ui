import { isAxiosError } from 'axios'

export function getLoginErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return 'Unable to complete login. Please try again.'
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'The login request timed out. Please try again in a moment.'
  }

  if (!error.response) {
    return 'Unable to connect to the login service. Please check your connection and try again.'
  }

  const { status } = error.response

  if (status === 401) {
    return 'The email/phone number or password you entered is incorrect. Please check again.'
  }

  if (status >= 500) {
    return 'The login service is temporarily unavailable. Please try again later.'
  }

  if (status === 400 || status === 422) {
    return 'Please check your email/phone number and password format, then try again.'
  }

  if (status === 403) {
    return 'Login is not allowed for this account. Please contact support.'
  }

  return 'Unable to complete login. Please try again later or contact support.'
}
