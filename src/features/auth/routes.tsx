import { RouteObject } from 'react-router-dom'

import { authLogoutAction } from './auth/pages/logout.route'
import loginRoutes from './login/routes'

const authRoutes: RouteObject[] = [
  ...loginRoutes,
  {
    path: 'logout',
    action: authLogoutAction,
  },
]

export default authRoutes
