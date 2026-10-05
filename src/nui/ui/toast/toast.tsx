import { ToastOptions, toast } from 'react-toastify'

import Icon from '@nui/ui/icon'

import {
  ToastIcon,
  ToastMain,
  ToastMessage,
  ToastTitle,
  ToastWrapper,
} from './toast.style'
import { ToastProps } from './types'

const icons = {
  success: 'lucide-check-circle',
  error: 'lucide-x-circle',
  warning: 'lucide-alert-circle',
  info: 'lucide-info',
}

export function Toast({ type = 'success', title, message }: ToastProps) {
  return (
    <ToastWrapper>
      <ToastIcon $type={type}>
        <Icon icon={icons[type]} size="sm" />
      </ToastIcon>
      <ToastMain>
        <ToastTitle $type={type}>{title}</ToastTitle>
        {message && <ToastMessage $type={type}>{message}</ToastMessage>}
      </ToastMain>
    </ToastWrapper>
  )
}

// Rendered by the global <LayoutUiNotif /> in _app.tsx
export function showToast(
  { type = 'success', ...props }: ToastProps,
  options?: ToastOptions
) {
  toast(<Toast type={type} {...props} />, {
    type,
    icon: false,
    hideProgressBar: true,
    closeButton: false,
    ...options,
  })
}
