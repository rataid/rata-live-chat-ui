import { RouteObject } from 'react-router-dom'

const notFoundRoutes: RouteObject[] = [
  {
    // Catch-all: keep it last among the routes
    path: '*',
    async lazy() {
      const { NotFoundPage } = await import('./not-found')
      return {
        Component: NotFoundPage,
      }
    },
  },
]

export default notFoundRoutes
