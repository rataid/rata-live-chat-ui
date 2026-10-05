import { RouteObject } from 'react-router-dom'

import { authLoginLoader } from '../login/pages/login.route'
import { authRegisterAction } from './pages/register.route'
import {
  authVerifyOtpAction,
  authVerifyOtpLoader,
} from './pages/verify-otp.route'

const registerRoutes: RouteObject[] = [
  {
    path: 'register',
    async lazy() {
      const { Layout } = await import('../layout')
      return {
        Component: Layout,
      }
    },
    children: [
      {
        index: true,
        // Redirect to dashboard when already logged in
        loader: authLoginLoader,
        action: authRegisterAction,
        async lazy() {
          const { AuthRegisterPage } = await import('./pages/register')
          return {
            Component: AuthRegisterPage,
          }
        },
      },
      {
        path: 'verify-otp',
        loader: async (args) =>
          (await authLoginLoader(args)) ?? authVerifyOtpLoader(args),
        action: authVerifyOtpAction,
        async lazy() {
          const { AuthVerifyOtpPage } = await import('./pages/verify-otp')
          return {
            Component: AuthVerifyOtpPage,
          }
        },
      },
    ],
  },
]

export default registerRoutes
