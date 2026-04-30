import { FormControlBase } from './base'
import { FormControlProvider } from './provider'
import { FormControlProps } from './types'

// Helper function to extract error message from different error types
function extractErrorMessage(
  error: FormControlProps['error']
): { message?: string; type?: string } | null {
  if (!error) return null

  // Handle normal field errors
  if (
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return {
      message: error.message,
      type:
        'type' in error && typeof error.type === 'string'
          ? error.type
          : 'validate',
    }
  }

  // Handle array root errors
  if (typeof error === 'object' && 'message' in error) {
    const message = error.message
    if (typeof message === 'string') {
      return {
        message: message,
        type: 'validate',
      }
    }
  }

  return null
}

export function FormControl({
  error = null,
  required = false,
  optional = false,
  children,
}: FormControlProps) {
  const processedError = extractErrorMessage(error)

  return (
    <FormControlProvider>
      <FormControlBase
        error={processedError}
        required={required}
        optional={optional}
      >
        {children}
      </FormControlBase>
    </FormControlProvider>
  )
}
