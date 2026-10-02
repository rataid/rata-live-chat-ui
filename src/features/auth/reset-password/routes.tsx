import { RouteObject } from 'react-router-dom'

import { authLoginLoader } from '../login/pages/login.route'
import {
  authResetPasswordAction,
  authResetPasswordLoader,
} from './pages/reset-password.route'

const resetPasswordRoutes: RouteObject[] = [
  {
    path: 'reset-password',
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
        loader: async (args) =>
          (await authLoginLoader(args)) ?? authResetPasswordLoader(args),
        action: authResetPasswordAction,
        async lazy() {
          const { AuthResetPasswordPage } = await import(
            './pages/reset-password'
          )
          return {
            Component: AuthResetPasswordPage,
          }
        },
      },
    ],
  },
]

export default resetPasswordRoutes
