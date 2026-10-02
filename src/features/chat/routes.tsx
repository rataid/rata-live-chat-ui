import { RouteObject } from 'react-router-dom'

import { routeGuard } from '@/components/auth/helpers'

// @todo: set to false once login works, so /chat requires login again
const BYPASS_AUTH = true

const chatRoutes: RouteObject[] = [
  {
    path: 'chat',
    // Full page without the app sidebar, but still requires login
    loader: (args) => (BYPASS_AUTH ? null : routeGuard(args, undefined)),
    async lazy() {
      const { ChatPage } = await import('./pages/chat')
      return {
        Component: ChatPage,
      }
    },
  },
]

export default chatRoutes
