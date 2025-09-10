import { useLocation } from 'react-router-dom'

import UserNav from '@features/user/nav'

export default function AppMobileSubMenu() {
  const location = useLocation()

  const pathnameParts = location.pathname.split('/')

  const extractedPart = pathnameParts[1]

  switch (extractedPart) {
    case 'user':
      return <UserNav />
    default:
      return null
  }
}
