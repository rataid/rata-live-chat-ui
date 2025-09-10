import { RouteObject } from 'react-router-dom'

import { authLoginAction, authLoginLoader } from './pages/login.route'

const loginRoutes: RouteObject[] = [
  {
    path: 'login',
    async lazy() {
      const { Layout } = await import('./layout')
      return {
        Component: Layout,
      }
    },
    children: [
      {
        index: true,
        loader: authLoginLoader,
        action: authLoginAction,
        async lazy() {
          const { AuthLoginPage } = await import('./pages/login')
          return {
            Component: AuthLoginPage,
          }
        },
      },
    ],
  },
]

export default loginRoutes
