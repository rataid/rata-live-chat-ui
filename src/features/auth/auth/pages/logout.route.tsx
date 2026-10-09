import { redirect } from 'react-router-dom'

import { removeToken } from '@/components/auth'
import { disconnectSockets } from '@libs/socket-client'

export async function authLogoutAction() {
  removeToken()
  disconnectSockets()

  return redirect('/login')
}
