import { QueryClientProvider } from '@tanstack/react-query'
import { configResponsive } from 'ahooks'
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'

import {
  getToken,
  getUserName,
  parseToken,
  routeGuard,
} from '@/components/auth/helpers'
import { queryClient } from '@libs/query-client'
import LayoutUiNotif from '@nui/layouts/ui/notif'
import { DialogProvider } from '@nui/ui/dialog'

import authRoutes from '@features/auth/routes'
import faqRoutes from '@features/faq/routes'
import homeRoutes from '@features/home/routes'
import livechatRoutes from '@features/livechat/routes'

import { PortalLayout } from './components/portal-layout'
import ErrorBoundary from './error-boundary'

configResponsive({
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1023,
  xl: 1278,
})

// User from the login token, put in the auth store by PortalLayout
export async function portalLoader() {
  const decodedToken = parseToken(getToken())

  if (!decodedToken) return { userData: null }

  // The token has no name; it is kept in localStorage at login
  return {
    userData: { ...decodedToken, fullname: getUserName() ?? '' },
  }
}

const router = createBrowserRouter([
  {
    // Pathless root route: global providers that need the router context
    element: (
      <DialogProvider>
        <Outlet />
      </DialogProvider>
    ),
    children: [
      ...authRoutes,

      {
        // Patient pages after login: fixed header layout
        loader: (args) => routeGuard(args, portalLoader),
        element: <PortalLayout />,
        errorElement: <ErrorBoundary />,
        children: [...homeRoutes, ...faqRoutes, ...livechatRoutes],
      },

      {
        path: '/',
        loader: () => redirect('/home'),
      },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app bg-gray-50 font-sans xl:bg-none">
        <RouterProvider router={router} />
        <LayoutUiNotif />
      </div>
    </QueryClientProvider>
  )
}
