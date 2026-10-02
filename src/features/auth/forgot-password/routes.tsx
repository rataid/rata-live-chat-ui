import { RouteObject } from 'react-router-dom'

import { authLoginLoader } from '../login/pages/login.route'
import { authForgotPasswordAction } from './pages/forgot-password.route'

const forgotPasswordRoutes: RouteObject[] = [
  {
    path: 'forgot-password',
    async lazy() {
      const { Layout } = await import('../login/layout')
      return {
        Component: Layout,
      }
    },
    children: [
      {
        index: true,
        // Redirect to dashboard when already logged in
        loader: authLoginLoader,
        action: authForgotPasswordAction,
        async lazy() {
          const { AuthForgotPasswordPage } = await import(
            './pages/forgot-password'
          )
          return {
            Component: AuthForgotPasswordPage,
          }
        },
      },
    ],
  },
]

export default forgotPasswordRoutes
