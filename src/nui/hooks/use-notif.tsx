import { TypeOptions, toast } from 'react-toastify'

import Notif from '@nui/ui/notif'

export type NotifyProps = {
  message: string
  type?: TypeOptions
  title?: string
  icon?: string | boolean
}

const icons = {
  default: 'lucide-info',
  info: 'lucide-info',
  success: 'lucide-check-circle',
  warning: 'lucide-alert-circle',
  error: 'lucide-alert-triangle',
}

export default function notify({ message, type = 'info', title }: NotifyProps) {
  toast(
    <Notif message={message} type={type} title={title} icon={icons[type]} />,
    {
      type,
      icon: false,
    }
  )
}

export const notifyError = (message: string, title = 'Error') => {
  notify({ title, message, type: 'error' })
}

export const CreateSuccess: NotifyProps = {
  title: 'Create success',
  message: 'Record has been successfuly created',
  type: 'success',
}

export const CreateFailed: NotifyProps = {
  title: 'Create failed!',
  message: 'Failed to create record',
  type: 'error',
}

export const UpdateSuccess: NotifyProps = {
  title: 'Update success',
  message: 'Record has been successfuly updated',
  type: 'success',
}

export const UpdateFailed: NotifyProps = {
  title: 'Update failed!',
  message: 'Failed to update record',
  type: 'error',
}

export const DeleteSuccess: NotifyProps = {
  title: 'Delete success',
  message: 'Record has been successfuly deleted',
  type: 'success',
}

export const DeleteFailed: NotifyProps = {
  title: 'Delete failed!',
  message: 'Failed to update record',
  type: 'error',
}

export const UploadFailed: NotifyProps = {
  title: 'Upload failed!',
  message: 'Failed to upload record.',
  type: 'error',
}

export const QrCodeFailed: NotifyProps = {
  title: 'Item not found',
  message: 'Enter the correct QR code or scan again.',
  type: 'error',
}
