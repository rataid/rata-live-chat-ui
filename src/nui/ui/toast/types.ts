export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  type?: ToastType
  title: React.ReactNode
  message?: React.ReactNode
}
