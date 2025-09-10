import { NavLink, RouteObject } from 'react-router-dom'

import ErrorBoundary from '@/error-boundary'

import { profileAction, profileLoader } from './pages/profile.route'

const profileRoutes: RouteObject[] = [
  {
    path: 'profile',
    async lazy() {
      const { Layout } = await import('./layout')
      return { Component: Layout }
    },
    errorElement: <ErrorBoundary />,
    handle: {
      crumb: () => <NavLink to="/profile">Profile</NavLink>,
    },
    children: [
      {
        index: true,
        loader: profileLoader,
        action: profileAction,
        async lazy() {
          const { ProfilePage } = await import('./pages/profile')
          return { Component: ProfilePage }
        },
      },
    ],
  },
]

export default profileRoutes
