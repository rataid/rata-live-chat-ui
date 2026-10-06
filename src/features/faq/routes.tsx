import { RouteObject } from 'react-router-dom'

import { faqDetailLoader, faqGroupLoader } from './pages/faq.route'

const faqRoutes: RouteObject[] = [
  {
    path: 'faq/:product/group/:groupId',
    loader: faqGroupLoader,
    async lazy() {
      const { FaqGroupPage } = await import('./pages/faq-group')
      return {
        Component: FaqGroupPage,
      }
    },
  },
  {
    path: 'faq/:product/:faqId',
    loader: faqDetailLoader,
    async lazy() {
      const { FaqDetailPage } = await import('./pages/faq-detail')
      return {
        Component: FaqDetailPage,
      }
    },
  },
]

export default faqRoutes
