import { TypeOptions } from 'react-toastify'

export type NotifProps = {
  message: string
  type: TypeOptions
  title?: string
  icon?: string | boolean
}
