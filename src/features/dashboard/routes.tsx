import { RouteObject } from 'react-router-dom'

const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    async lazy() {
      const { DashboardPage } = await import('./pages/dashboard')
      return { Component: DashboardPage }
    },
    handle: {
      crumb: () => ['Overview'],
    },
  },
]

export default dashboardRoutes
