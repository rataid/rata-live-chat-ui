import { QueryClientProvider } from '@tanstack/react-query'
import { configResponsive } from 'ahooks'
import { assign } from 'lodash'
import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'

import {
  buildFromUrl,
  getToken,
  parseToken,
  removeToken,
  routeGuard,
} from '@/components/auth/helpers'
import { queryClient } from '@libs/query-client'
import { AppLayout } from '@nui/layouts'

import authRoutes from '@features/auth/routes'
import dashboardRoutes from '@features/dashboard/routes'
import liveRoutes from '@features/live/routes'
import readyRoutes from '@features/ready/routes'
import userRoutes from '@features/user/routes'

// import { meQuery } from '@models/user/user'
import AppSidebarNavBottom from './components/app/sidebar/nav-bottom'
import AppSidebarNavTop from './components/app/sidebar/nav-top'
import AppSidebarProfile from './components/app/sidebar/profile'
import { ProtectedLayout } from './components/auth'
import ErrorBoundary from './error-boundary'

configResponsive({
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1023,
  xl: 1278,
})

export async function appLoader({ request }: LoaderFunctionArgs) {
  const token = getToken()
  const decodedToken = parseToken(token)

  if (!decodedToken) {
    return redirect(buildFromUrl('/login', request.url))
  }

  try {
    // const q = meQuery({})
    // const userData = await queryClient.fetchQuery(q)

    // assign(decodedToken, {
    //   username: userData?.email,
    //   fullname: userData?.name,
    //   avatar: null,
    // })
    assign(decodedToken, {
      username: 'test@rata.id',
      fullname: 'testing',
      avatar: null,
    })
  } catch (error: any) {
    if ([401, 403].includes(error?.status)) {
      removeToken()
      return redirect(buildFromUrl('/login', request.url))
    }
  }

  return {
    userData: decodedToken,
  }
}

const router = createBrowserRouter([
  ...authRoutes,

  {
    path: '/',
    loader: (args) => routeGuard(args, appLoader),
    element: (
      <ProtectedLayout>
        <AppLayout
          navTop={<AppSidebarNavTop />}
          navBottom={<AppSidebarNavBottom />}
          profile={<AppSidebarProfile />}
        />
      </ProtectedLayout>
    ),

    errorElement: <ErrorBoundary />,
    children: [...dashboardRoutes, ...userRoutes],
  },
  ...readyRoutes,
  ...liveRoutes,
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app font-sans bg-gray-50 xl:bg-none">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  )
}
