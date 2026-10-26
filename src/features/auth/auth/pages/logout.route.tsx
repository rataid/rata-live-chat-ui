import { redirect } from 'react-router-dom'

import { removeToken } from '@/components/auth'
import { endSession } from '@/libs/session'
import { disconnectSockets } from '@libs/socket-client'

export async function authLogoutAction() {
  removeToken()
  disconnectSockets()
  await endSession().catch(() => undefined)

  return redirect('/login')
}
