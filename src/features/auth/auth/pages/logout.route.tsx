import { redirect } from 'react-router-dom'

import { removeToken } from '@/components/auth'

export async function authLogoutAction() {
  removeToken()

  return redirect('/login')
}
