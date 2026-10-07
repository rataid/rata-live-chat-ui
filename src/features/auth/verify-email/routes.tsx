import { RouteObject } from 'react-router-dom'

import { authVerifyEmailLoader } from './verify-email.route'

const verifyEmailRoutes: RouteObject[] = [
  {
    path: 'v/:token',
    loader: authVerifyEmailLoader,
  },
]

export default verifyEmailRoutes
