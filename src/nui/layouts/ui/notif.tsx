import { useResponsive } from 'ahooks'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LayoutUiNotifWrapper } from './notif.style'

export default function LayoutUiNotif() {
  // `sm` is false below 640px
  const { sm } = useResponsive()

  return (
    <LayoutUiNotifWrapper>
      <ToastContainer
        position={sm ? 'top-right' : 'top-center'}
        autoClose={3000}
      />
    </LayoutUiNotifWrapper>
  )
}
