import { redirect } from 'react-router-dom'

import { removeToken } from '@/components/auth'
import { disableWebPush } from '@/features/livechat/push/push-client'
import { endSession } from '@/libs/session'
import { disconnectSockets } from '@libs/socket-client'

export async function authLogoutAction() {
  await disableWebPush().catch(() => undefined)
  removeToken()
  disconnectSockets()
  await endSession().catch(() => undefined)

  return redirect('/login')
}
