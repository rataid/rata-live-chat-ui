import { NavLink, RouteObject } from 'react-router-dom'

import ErrorBoundary from '@/error-boundary'

import userRoutes from './user/routes'

const routes: RouteObject[] = [
  {
    path: 'user',
    async lazy() {
      const { Layout } = await import('./layout')
      return {
        Component: Layout,
      }
    },
    errorElement: <ErrorBoundary />,
    handle: {
      crumb: () => <NavLink to="/user">User</NavLink>,
    },
    children: [...userRoutes],
  },
]

export default routes
