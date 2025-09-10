import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LayoutUiNotifWrapper } from './notif.style'

export default function LayoutUiNotif() {
  return (
    <LayoutUiNotifWrapper>
      <ToastContainer />
    </LayoutUiNotifWrapper>
  )
}
