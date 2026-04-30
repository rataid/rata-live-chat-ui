import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: 'live',
    async lazy() {
      const { LivePage } = await import('./pages/live')
      return {
        Component: LivePage,
      }
    },
  },
]

export default routes
