import { RouteObject } from 'react-router-dom'

const livechatRoutes: RouteObject[] = [
  {
    path: 'livechat',
    async lazy() {
      const { LiveChatPage } = await import('./pages/livechat')
      return {
        Component: LiveChatPage,
      }
    },
  },
]

export default livechatRoutes
