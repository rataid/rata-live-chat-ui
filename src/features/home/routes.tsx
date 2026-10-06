import { RouteObject, redirect } from 'react-router-dom'

import { DEFAULT_BRAND } from '@/constants/brand'

const homeRoutes: RouteObject[] = [
  {
    path: 'home',
    async lazy() {
      const { HomeLayout } = await import('./layout')
      return {
        Component: HomeLayout,
      }
    },
    children: [
      {
        index: true,
        loader: () => redirect(`/home/${DEFAULT_BRAND}`),
      },
      {
        path: 'rata',
        async lazy() {
          const { HomeRataPage } = await import('./pages/rata')
          return { Component: HomeRataPage }
        },
      },
      {
        path: 'tanam',
        async lazy() {
          const { HomeTanamPage } = await import('./pages/tanam')
          return { Component: HomeTanamPage }
        },
      },
      {
        path: 'vinir',
        async lazy() {
          const { HomeVinirPage } = await import('./pages/vinir')
          return { Component: HomeVinirPage }
        },
      },
    ],
  },
]

export default homeRoutes
