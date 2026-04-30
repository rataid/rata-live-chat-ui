import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: 'ready',
    async lazy() {
      const { ReadyPage } = await import('./pages/ready')
      return {
        Component: ReadyPage,
      }
    },
  },
]

export default routes
