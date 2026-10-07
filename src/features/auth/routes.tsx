import { RouteObject } from 'react-router-dom'

import { authLogoutAction } from './auth/pages/logout.route'
import forgotPasswordRoutes from './forgot-password/routes'
import loginRoutes from './login/routes'
import registerRoutes from './register/routes'
import resetPasswordRoutes from './reset-password/routes'
import verifyEmailRoutes from './verify-email/routes'

const authRoutes: RouteObject[] = [
  ...loginRoutes,
  ...registerRoutes,
  ...forgotPasswordRoutes,
  ...resetPasswordRoutes,
  ...verifyEmailRoutes,
  {
    path: 'logout',
    action: authLogoutAction,
  },
]

export default authRoutes
