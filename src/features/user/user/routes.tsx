import { RouteObject } from 'react-router-dom'

import { routeGuard } from '@/components/auth/helpers'

import { userCreateAction } from './pages/create.route'
import { userEditAction, userEditLoader } from './pages/edit.route'
import { userListAction, userListLoader } from './pages/list'

const userRoutes: RouteObject[] = [
  {
    path: ':user-list?',
    loader: (args) => routeGuard(args, userListLoader, ['user.user.list']),
    action: (args) =>
      routeGuard(args, userListAction, ['user.user.delete'], 'some'),
    async lazy() {
      const { UserListPage } = await import('./pages/list')
      return {
        Component: UserListPage,
      }
    },
    children: [
      {
        path: ':id/detail',
        loader: (args) => routeGuard(args, userEditLoader, ['user.user.list']),
        async lazy() {
          const { UserListDetailPage } = await import('./pages/list/detail')
          return {
            Component: UserListDetailPage,
          }
        },
      },
    ],
  },
  {
    path: 'create',
    loader: (args) => routeGuard(args, undefined, ['user.user.create']),
    action: (args) => routeGuard(args, userCreateAction, ['user.user.create']),
    async lazy() {
      const { UserCreatePage } = await import('./pages/create')
      return {
        Component: UserCreatePage,
      }
    },
    handle: {
      crumb: () => 'Create',
    },
  },
  {
    path: ':id/edit',
    loader: (args) => routeGuard(args, userEditLoader, ['user.user.update']),
    action: (args) => routeGuard(args, userEditAction, ['user.user.update']),
    async lazy() {
      const { UserEditPage } = await import('./pages/edit')
      return {
        Component: UserEditPage,
      }
    },
    handle: {
      crumb: (data: any) => [data.name, 'Edit'],
    },
  },
]

export default userRoutes
